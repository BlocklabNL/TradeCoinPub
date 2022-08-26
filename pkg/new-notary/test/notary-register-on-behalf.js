var Notary = artifacts.require("Notary");

const truffleAssert = require('truffle-assertions');

contract('Notary::onBehalfOfTests', (accounts) => {

    const owner = accounts[0];
    const expiresAt = 1731018222
    const nonce = "0xabababababababababababababababab"

    // Signature stuff below
    //note: on behalf of signature scheme follows this formulation: 
    // msg_hash = hash("\x19Ethereum Signed Message:\n32", hash(notary_address, hash(hash(doc), expiry), nonce))

    // this is hash(doc) part
    const fileHash = "0x36271187a541b9f7e2cf7650e703a2409dfc272d02fbe606c6a643447102db39"
    
    // this is hash(hash(doc), expiry) part
    const fileDataHash = "0xb8ec10db6143f262316cf909cd5547e5ced215b191162031697d9101941ab07e";

    // this is hash(notary_address, hash(hash(doc), expiry), nonce) 
    const assetHash = "0xac014c8b21d3a47cdef71f58ab8bd49cbbc361bf370e8a0a37bdac29526ab3ef";

    beforeEach(async () => {
        this.notary = await Notary.new();
    });

    it('correctly hashes data', async () => {

        //performs hash(doc_hash, expiry)
        let dataHash =  await this.notary.hashDocData(fileHash, expiresAt, {from: owner});
        assert.equal(fileDataHash, dataHash, 'hashes do not match');


        //performs hash(notary_address, doc_data_hash, nonce)
        let fullHashResult = await this.notary.onBehalfOfSignHash(dataHash, nonce)

        //performs hash("\x19Ethereum Signed Message:\n32", full_hash_result)
        let messageHashResult = await this.notary.getEthSignedMessageHash(fullHashResult);
        

        const hashedMessage = await web3.eth.accounts.hashMessage(fullHashResult)
        assert.equal(messageHashResult, hashedMessage, 'on behalf of hashes do not match');
    });


    it('message hashes should equal', async () => {

        //performs hash(doc_hash, expiry)
        let dataHash =  await this.notary.hashDocData(fileHash, expiresAt, {from: owner});
        assert.equal(fileDataHash, dataHash, 'hashes do not match');


        //performs hash(notary_address, doc_data_hash, nonce)
        let fullHashResult = await this.notary.onBehalfOfSignHash(dataHash, nonce)

        //performs hash("\x19Ethereum Signed Message:\n32", full_hash_result)
        let messageHashResult = await this.notary.getEthSignedMessageHash(fullHashResult);
        

        const hashedMessage = await web3.eth.accounts.hashMessage(fullHashResult)

        //generateAssetHash(bytes32 fileHash, uint32 expiresAt, bytes16 nonce)
        const otherHashedMessage = await this.notary.generateAssetHash(fileHash, expiresAt, nonce, {from: owner})


        assert.equal(hashedMessage, otherHashedMessage, 'message hashes do not match');
    });



    it('should revert on behalf of transaction with invalid asset hash', async () => {

        var invalidHash = '0x0000000000000000000000000000000000000000000000000000000000000000';

        // Signatures
        const sig = await web3.eth.sign("Message to sign", owner);

        const r = "0x"+sig.substring(2,66);
        const s = "0x"+sig.substring(66,130);
        const v = "0x"+sig.substring(130,132);

        
        await truffleAssert.reverts(
            this.notary.registerAssetOnBehalf(v, r, s, nonce, invalidHash, expiresAt, owner, {from: owner}),
            "not a valid hash used");
        
    });


    it('should revert on behalf of transaction with invalid expiresAt', async () => {

        var invalidExpires = 1212;

        // Signatures
        const sig = await web3.eth.sign("Message to sign", owner);

        const r = "0x"+sig.substring(2,66);
        const s = "0x"+sig.substring(66,130);
        const v = "0x"+sig.substring(130,132);

        
        await truffleAssert.reverts(
            this.notary.registerAssetOnBehalf(v, r, s, nonce, assetHash, invalidExpires, owner, {from: owner}),
            "expiresAt must be in the future");
    });


    it('should revert transaction with owner and signer not matching', async () => {

        // Address of signer
        let dataHash =  await this.notary.hashDocData(fileHash, expiresAt, {from: owner});
        let fullHashResult = await this.notary.onBehalfOfSignHash(dataHash, nonce)
        

        // Signature
        const sig = await web3.eth.sign(fullHashResult, accounts[3]);


        const r = "0x"+sig.substring(2,66);
        const s = "0x"+sig.substring(66,130);
        const v = "0x"+sig.substring(130,132);

        
        
        await truffleAssert.reverts(
            this.notary.registerAssetOnBehalf(parseInt(v, 16)+27, r, s, nonce, fileHash, expiresAt, accounts[4], {from: owner}),
            "signer of message and recovered owner do not match");

    });

    it('should register asset on behalf of signer', async () => {

        // Address of signer
        let dataHash =  await this.notary.hashDocData(fileHash, expiresAt, {from: owner});
        let fullHashResult = await this.notary.onBehalfOfSignHash(dataHash, nonce)
        

        // Signature
        // Apparently this works, since I assume the sign message 
        // prepends the "\x19Ethereum Signed Message:\n<message length>"  
        const sig = await web3.eth.sign(fullHashResult, accounts[3]);


        const r = "0x"+sig.substring(2,66);
        const s = "0x"+sig.substring(66,130);
        const v = "0x"+sig.substring(130,132);


        let tx = await this.notary.registerAssetOnBehalf(parseInt(v, 16) + 27, r, s, nonce, fileHash, expiresAt, accounts[3], {from: owner})
        assert.equal(tx.receipt.status, 1, 'transaction failed unexpected');

        assert.equal(tx.logs.length, 1, 'expected the AssetRegistered log');
        let log = tx.logs[0]

        assert.equal(log.event, 'AssetRegistered', 'invalid event emitted');
        assert.equal(log.args.hash, fileHash, 'invalid asset hash in AssetRegistered log');
        assert.equal(log.args.owner, accounts[3], 'wrong owner in AssetRegistered log');

    
    });

    // notary address below: 0x75c35C980C0d37ef46DF04d31A140b65503c0eEd
    it('should also register asset on behalf of signer with other signing method', async () => {

        // Address of signer
        let signerAddress = "0x96216849c49358B10257cb55b28eA603c874b05E"
        
        let privateKey = "0xfad9c8855b740a0b7ed4c221dbad0f33a83a49cad6b3fe8d5817ac83d38b6a19";
        


        let dataHash =  await this.notary.hashDocData(fileHash, expiresAt, {from: owner});
        let fullHashResult = await this.notary.onBehalfOfSignHash(dataHash, nonce)
        let messageHashResult = await this.notary.getEthSignedMessageHash(fullHashResult);


        // Signature
        const sig = await web3.eth.accounts.sign(fullHashResult, privateKey)

        assert.equal(messageHashResult, sig.messageHash, "hashes from signature and contract do not match")

        let tx = await this.notary.registerAssetOnBehalf(sig.v, sig.r, sig.s, nonce, fileHash, expiresAt, signerAddress, {from: owner})
        assert.equal(tx.receipt.status, 1, 'transaction failed unexpected');

        assert.equal(tx.logs.length, 1, 'expected the AssetRegistered log');
        let log = tx.logs[0]

        assert.equal(log.event, 'AssetRegistered', 'invalid event emitted');
        assert.equal(log.args.hash, fileHash, 'invalid asset hash in AssetRegistered log');
        assert.equal(log.args.owner, signerAddress, 'wrong owner in AssetRegistered log');

    });

    
});
