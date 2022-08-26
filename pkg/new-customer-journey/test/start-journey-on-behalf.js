const Notary          = artifacts.require("Notary");
const CustomerJourney = artifacts.require("CustomerJourney");
const truffleAssert   = require('truffle-assertions');


function generateRandomHashes(count) {
    var hashes = [];
    for (let i = 0; i < count; i++) {
        hashes.push('0x' + crypto.randomBytes(32).toString('hex'));
    }
    return hashes;
}

contract('CustomerJourney', async (accounts) => {
    const owner = accounts[0];
    const signer = accounts[1];

    const expiresAt = 1731018222

    const docHash = "0x36271187a541b9f7e2cf7650e703a2409dfc272d02fbe606c6a643447102db39";
    const docType = 1;
    const key = "shipment";

    const linkHash = "0x48aa1257a541b9f7e2cf7650e703a2409dfc272d02fbe606c6a643447102db39";
    

    beforeEach(async () => {
        this.notary = await Notary.new();
        this.journey = await CustomerJourney.new(this.notary.address);
        
        await this.journey.RegisterDocument(1, 'unittest document');
        
    });

    it('should start journey on behalf', async () => {

        // registering asset in notary
        let tx = await this.notary.registerAsset(docHash, expiresAt, {from: signer});
        assert.equal(tx.receipt.status, 1, 'transaction failed unexpected');
        
        // Signing documetn by user
        let hashToSign = await this.journey.onBehalfOfHashStart(docHash, docType, key)
        const sig = await web3.eth.sign(hashToSign, signer);

        
        const r = "0x"+sig.substring(2,66);
        const s = "0x"+sig.substring(66,130);
        const v = "0x"+sig.substring(130,132);

        // Starting journey on behalf of user
        tx = await this.journey.StartOnBehalf(parseInt(v, 16) + 27, r, s, docHash, docType, key, signer, {from: owner});
        assert.equal(tx.receipt.status, 1, 'transaction failed unexpected');
        
    });

    it('should link asset on behalf', async () => {

        // Registering parent document
        let tx = await this.notary.registerAsset(docHash, expiresAt, {from: signer});
        assert.equal(tx.receipt.status, 1, 'transaction failed for parent document');
        
        // Registering link document
        tx = await this.notary.registerAsset(linkHash, expiresAt, {from: signer});
        assert.equal(tx.receipt.status, 1, 'transaction failed for link document');

        // starting journey on behalf of user
        let hashToSign = await this.journey.onBehalfOfHashStart(docHash, docType, key)
        let sig = await web3.eth.sign(hashToSign, signer);

        let r = "0x"+sig.substring(2,66);
        let s = "0x"+sig.substring(66,130);
        let v = "0x"+sig.substring(130,132);

        tx = await this.journey.StartOnBehalf(parseInt(v, 16) + 27, r, s, docHash, docType, key, signer, {from: owner});
        assert.equal(tx.receipt.status, 1, 'transaction failed unexpected');


        // linking asset on behalf of user
        hashToSign = await this.journey.onBehalfOfHashLink(docHash, linkHash, docType, key)
        sig = await web3.eth.sign(hashToSign, signer);

        r = "0x"+sig.substring(2,66);
        s = "0x"+sig.substring(66,130);
        v = "0x"+sig.substring(130,132);


        tx = await this.journey.LinkOnBehalf(parseInt(v, 16) + 27, r, s, docHash, linkHash, docType, key, signer, {from: owner});
        assert.equal(tx.receipt.status, 1, 'transaction failed unexpected');


        
    });


});

/*
        const r = "0x"+sig.substring(2,66);
        const s = "0x"+sig.substring(66,130);
        const v = "0x"+sig.substring(130,132);

        tx = await this.journey.StartOnBehalf(parseInt(v, 16) + 27, r, s, docHash, docType, key, signer, {from: owner});
        assert.equal(tx.receipt.status, 1, 'transaction failed unexpected');*/