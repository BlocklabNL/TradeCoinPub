// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;
import "./TradeCoinCompositionContract.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
contract TradeCoinCompositionSales is ReentrancyGuard {
    struct SaleQueue {
        address seller;
        address newOwner;
        uint256 priceInWei;
        bool payInFiat;
        bool isPayed;
    }

    struct Documents {
        bytes32[] docHash;
        bytes32[] docType;
        bytes32 rootHash;
    }

    TradeCoinCompositionContract public tradeCoinComposition;

    uint256 public tradeCoinTokenBalance;
    uint256 public weiBalance;
    
    event InitiateCommercialTxEvent(
        uint256 indexed tokenId,
        address indexed functionCaller,
        address indexed buyer,
        bool payInFiat,
        uint256 priceInWei,
        bool isPayed,
        bytes32[] docHash,
        bytes32[] docType,
        bytes32 rootHash
    );

    event FinishCommercialTxEvent(
        uint256 indexed tokenId,
        address indexed seller, 
        address indexed functionCaller, 
        bytes32[] dochash,
        bytes32[] docType,
        bytes32 rootHash
    );
    
    event CompleteSaleEvent(
        uint256 indexed tokenId,
        address indexed functionCaller,
        bytes32[] dochash,
        bytes32[] docType,
        bytes32 rootHash
    );

    event ReverseSaleEvent(
        uint256 indexed tokenId,
        address indexed functionCaller,
        bytes32[] dochash,
        bytes32[] docType,
        bytes32 rootHash
    );

    event ServicePaymentEvent(
        uint256 indexed tokenId,
        address indexed receiver,
        address indexed sender,
        bytes32 indexedDocHash,
        bytes32[] docHash,
        bytes32[] docType,
        bytes32 rootHash,
        uint256 paymentInWei,
        bool payInFiat
    );

    constructor(address _tradeCoinComposition) {
        tradeCoinComposition = TradeCoinCompositionContract(_tradeCoinComposition);
    }

    mapping(uint256 => SaleQueue) public pendingSales;

    function initiateCommercialTx(
        uint256 _tradeCoinCompositionTokenID,
        uint256 _priceInWei,
        address _newOwner,
        Documents memory _documents,
        bool _payInFiat
    ) external {
        tradeCoinComposition.transferFrom(msg.sender, address(this), _tradeCoinCompositionTokenID);
        pendingSales[_tradeCoinCompositionTokenID] = SaleQueue(
            msg.sender,
            _newOwner,
            _priceInWei,
            _payInFiat,
            _priceInWei == 0
        );
        tradeCoinTokenBalance += 1;
        emit InitiateCommercialTxEvent(
            _tradeCoinCompositionTokenID,
            msg.sender,
            _newOwner,
            _payInFiat,
            _priceInWei,
            _priceInWei == 0,
            _documents.docHash,
            _documents.docType,
            _documents.rootHash
        );
    }

    function finishCommercialTx(
        uint256 _tradeCoinCompositionTokenID,
        Documents memory _documents
    ) external payable {
        if(!pendingSales[_tradeCoinCompositionTokenID].payInFiat){
            require(
                pendingSales[_tradeCoinCompositionTokenID].priceInWei == msg.value,
                "Not the right price"
            );
        }
        address legalOwner = pendingSales[_tradeCoinCompositionTokenID].seller;
        
        pendingSales[_tradeCoinCompositionTokenID].isPayed = true;
        weiBalance += msg.value;
        emit FinishCommercialTxEvent(
            _tradeCoinCompositionTokenID,
            legalOwner,
            msg.sender,
            _documents.docHash,
            _documents.docType,
            _documents.rootHash
        );
        completeSale(_tradeCoinCompositionTokenID, _documents);
    }

    function completeSale(
        uint256 _tradeCoinCompositionTokenID,
        Documents memory _documents
    ) internal nonReentrant {
        require(pendingSales[_tradeCoinCompositionTokenID].isPayed, "Not payed");
        weiBalance -= pendingSales[_tradeCoinCompositionTokenID].priceInWei;
        tradeCoinTokenBalance -= 1;
        tradeCoinComposition.transferFrom(
            address(this),
            pendingSales[_tradeCoinCompositionTokenID].newOwner,
            _tradeCoinCompositionTokenID
        );
        payable(pendingSales[_tradeCoinCompositionTokenID].seller).transfer(
            pendingSales[_tradeCoinCompositionTokenID].priceInWei
        );
        delete pendingSales[_tradeCoinCompositionTokenID];
        emit CompleteSaleEvent(
            _tradeCoinCompositionTokenID,
            msg.sender,
            _documents.docHash,
            _documents.docType,
            _documents.rootHash
        );
    }

    function reverseSale(uint256 _tradeCoinCompositionTokenID, Documents memory _documents) external nonReentrant {
        require(
            pendingSales[_tradeCoinCompositionTokenID].seller == msg.sender ||
                pendingSales[_tradeCoinCompositionTokenID].newOwner == msg.sender,
            "Not the seller or new owner"
        );
        tradeCoinTokenBalance -= 1;
        tradeCoinComposition.transferFrom(
            address(this),
            pendingSales[_tradeCoinCompositionTokenID].seller,
            _tradeCoinCompositionTokenID
        );
        if (
            pendingSales[_tradeCoinCompositionTokenID].isPayed &&
            pendingSales[_tradeCoinCompositionTokenID].priceInWei != 0
        ) {
            weiBalance -= pendingSales[_tradeCoinCompositionTokenID].priceInWei;
            payable(pendingSales[_tradeCoinCompositionTokenID].seller).transfer(
                pendingSales[_tradeCoinCompositionTokenID].priceInWei
            );
        }
        delete pendingSales[_tradeCoinCompositionTokenID];
        emit ReverseSaleEvent(
            _tradeCoinCompositionTokenID,
            msg.sender,
            _documents.docHash,
            _documents.docType,
            _documents.rootHash
        );
    }

    function servicePayment(
        uint256 _tradeCoinCompositionTokenID,
        address _receiver,
        uint256 _paymentInWei,
        bool _payInFiat,
        Documents memory _documents
    ) 
        payable
        external
        nonReentrant
    {
        require(
            _documents.docHash.length == _documents.docType.length && 
                (_documents.docHash.length <= 2 || _documents.docType.length <= 2), 
            "Invalid length"
        );

        // When not paying in Fiat pay but in Eth
        if (!_payInFiat) {
            require(_paymentInWei >= msg.value && _paymentInWei > 0, "Promised to pay in Fiat");
            payable(_receiver).transfer(msg.value);
        }

        emit ServicePaymentEvent(
            _tradeCoinCompositionTokenID,
            _receiver,
            msg.sender,
            _documents.docHash[0],
            _documents.docHash,
            _documents.docType,
            _documents.rootHash,
            _paymentInWei,
            _payInFiat
        );
    }
}