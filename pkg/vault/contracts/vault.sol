//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

contract Vault {
    enum SubscriptionType {UNKNOWN, DEBIT, CREDIT}
    uint public DEBIT_FEE = 1000;
    uint public MIN_DEBIT_DEPOSIT = 64 * 1024 * DEBIT_FEE;
    uint public CREDIT_FEE = 1050;

    struct invoice {
        // total amount
        uint amount;
        // due holds the deadline before the payment must be made.
        // if later there is an additional fee of 10%.
        uint due;
        // holds the root over all assets that are included in this invoice
        bytes32 assetRoot;
        // timestamp when this invoice was created and is booked
        uint bookDate;
    }

    struct subscription {
        // created at block timestamp
        uint created;
        // indicates what kind of subscription this is.
        SubscriptionType typ;
        // fee holds the price to store a byte for one day
        uint fee;
        // current funds (in Wei) for a credit based subscription
        uint balance;
        // holds already claimed funds (in Wei)
        uint claimed;
        // in case of debit subscription create each period an invoice
        uint period;
        // cheque sequence number
        uint chequeSeqNo;
    }

    // raised when the consumer requests a subscription
    event ApplyForSubscription(address consumer, SubscriptionType typ);

    // producer approved subscription application
    event SubscriptionApproved(address consumer);

    // producer rejected subscription application
    event SubscriptionRejected(address consumer);

    // consumer added credit to credit based subscription
    event Deposit(address consumer, uint amount);

    // Raised when a cheque is successfully claimed
    event ChequeClaimed(address consumer, uint chequeSeqNo, uint amount);

    // raised when an invoice is created
    event Invoice(address consumer, uint due, bytes32 assetRoot);

    // raised when an invoice is payed
    event InvoicePayed(address consumer, bytes32 assetRoot, uint256 amount);

    // raised when a new admin account is added to the whitelist
    event AdminAdded(address admin);

    // the one that deployed the contract
    uint public deployedOn;
    address public deployedBy;
    address payable public payoutTo;

    // keeps track of address that are allowed to transact
    mapping(address => bool) public allowed;

    // keeps track of pending requests
    mapping(address => subscription) public pending;

    // keeps track of all active subscription
    mapping(address => subscription) public subscriptions;

    // holds invoices for debit subscriptions
    mapping(address => mapping(bytes32 => invoice)) public invoices;

    mapping(address => invoice) public lastInvoice;

    // beneficiary is the address on which invoices/cheques are payed to
    constructor(address payable beneficiary) public {
        deployedOn = block.number;
        deployedBy = msg.sender;
        payoutTo = beneficiary;

        allowed[msg.sender] = true;
    }

    // callback function that can be used to increase balance for credit subscriptions
    receive() external payable isCreditSubscription(msg.sender) {
        subscriptions[msg.sender].balance += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    // request a new credit based subscription.
    // The given period is in days and must be between 2 and 31 days.
    function applyForCreditSubscription(uint period) external noSubscription {
        require(period >= 2, "period must be at least 2 days");
        require(period <= 31, "period must be at max 31 days");

        pending[msg.sender] = subscription({
            created: now,
            typ : SubscriptionType.CREDIT,
            fee : CREDIT_FEE,
            balance : 0,
            claimed : 0,
            period : period,
            chequeSeqNo : 0
            });

        emit ApplyForSubscription(msg.sender, SubscriptionType.CREDIT);
    }

    // request a new debit based subscription.
    // It requires a minimal deposit of MIN_CREDIT_DEPOSIT wei.
    function applyForDebitSubscription() payable external noSubscription {
        require(msg.value >= MIN_DEBIT_DEPOSIT, "deposit too low");

        pending[msg.sender] = subscription({
            created: now,
            typ : SubscriptionType.DEBIT,
            fee : DEBIT_FEE,
            balance : msg.value,
            claimed : 0,
            period : 0,
            chequeSeqNo : 0
            });

        emit ApplyForSubscription(msg.sender, SubscriptionType.DEBIT);
    }

    // accept subscription application
    function approveSubscription(address consumer) external isAdmin {
        require(pending[consumer].fee > 0, "has no pending subscription request");

        subscriptions[consumer] = pending[consumer];
        delete pending[consumer];

        emit SubscriptionApproved(consumer);
    }

    // reject subscription application
    function rejectSubscription(address consumer) external isAdmin {
        require(pending[consumer].fee > 0, "has no pending subscription request");
        delete pending[consumer];

        emit SubscriptionRejected(consumer);
    }

    // chequeSigningHash calculates the hash that must be signed for cheque's.
    function chequeSigningHash(uint seqNo, uint expires, uint amount) public view returns(bytes32) {
        return keccak256(abi.encode(this, seqNo, expires, amount));
    }

    // returns the address of the entity that signed the amount and beneficiary that
    // are included in the cheque. This hash is derived over the cheque sequence number,
    // amount, beneficiary and this contracts address.
    function chequeSigner(uint seqNo, uint expires, uint amount, uint8 v, bytes32 r, bytes32 s) public view returns (address) {
        bytes32 hash = chequeSigningHash(seqNo, expires, amount);
        return ecrecover(hash, v, r, s);
    }

    // verifyCheque will return the consumer and indication if the given cheque details are valid.
    function verifyCheque(uint seqNo, uint expires, uint amount, uint8 v, bytes32 r, bytes32 s) public view returns (address, bool) {
        address consumer = chequeSigner(seqNo, expires, amount, v, r, s);
        subscription memory sub = subscriptions[consumer];

        bool valid = (sub.typ == SubscriptionType.CREDIT) &&
        (sub.chequeSeqNo < seqNo) &&
        (amount >= sub.claimed) &&
        (sub.balance >= (amount - sub.claimed));

        return (consumer, valid);
    }

    function claimCheque(uint seqNo, uint expires, uint amount, uint8 v, bytes32 r, bytes32 s) external isAdmin {
        (address consumer, bool valid) = verifyCheque(seqNo, expires, amount, v, r, s);

        require(valid, "invalid cheque");

        subscription storage sub = subscriptions[consumer];
        sub.balance -= amount;
        payoutTo.transfer(amount);

        sub.chequeSeqNo = seqNo;
        sub.claimed += amount;

        emit ChequeClaimed(consumer, seqNo, amount);
    }

    // newInvoice creates a new invoice for a debit subscription
    // assetRoot is a hash calculated over all assets that are included in this invoice.
    function newInvoice(address consumer, uint amount, bytes32 assetRoot) external isAdmin isDebitSubscription(consumer) {
        subscription memory sub = subscriptions[consumer];

        // check that this invoice is not created before the last period has passed
        invoice memory lstInv = lastInvoice[consumer];
        require((lstInv.bookDate + (sub.period * 86400)) < block.timestamp, "payment period not yet passed");

        uint due = block.timestamp + 7 days;
        invoice memory inv = invoice(amount, due, assetRoot, block.timestamp);

        invoices[consumer][assetRoot] = inv;
        lastInvoice[consumer] = inv;

        emit Invoice(consumer, due, assetRoot);
    }

    // invoiceAmount returns the amount to pay for the invoice that is identified
    // by the given assetRoot.
    function invoiceAmount(bytes32 assetRoot) public view returns(uint) {
        mapping(bytes32 => invoice) storage myInvoices = invoices[msg.sender];
        invoice memory inv = myInvoices[assetRoot];
        require(inv.amount > 0 , "invoice not found");

        uint256 amount = inv.amount;
        if (inv.due < block.timestamp) { // not payed in time, increase amount by 10%
            amount = amount + (amount / 10);
        }

        return amount;
    }

    // payInvoice pays an invoice on the given account
    function payInvoice(bytes32 assetRoot) external isDebitSubscription(msg.sender) payable {
        uint256 amount = invoiceAmount(assetRoot);
        require(amount == msg.value, "invalid amount");

        // payout :-)
        payoutTo.transfer(amount);

        // delete invoice
        mapping(bytes32 => invoice) storage myInvoices = invoices[msg.sender];
        delete myInvoices[assetRoot];

        emit InvoicePayed(msg.sender, assetRoot, amount);
    }

    function addAdmin(address addr) external isAdmin {
        allowed[addr] = true;
        emit AdminAdded(addr);
    }

    modifier isAdmin() {
        require(allowed[msg.sender], "account no admin");
        _;
    }

    modifier noSubscription() {
        require(pending[msg.sender].fee == 0, "already applied for a subscription");
        require(subscriptions[msg.sender].fee == 0, "already got a subscription");
        _;
    }

    modifier isDebitSubscription(address addr) {
        require(subscriptions[addr].typ == SubscriptionType.DEBIT, "no debit subscription");
        _;
    }

    modifier isCreditSubscription(address addr) {
        require(subscriptions[addr].typ == SubscriptionType.CREDIT, "no credit subscription");
        _;
    }
}
