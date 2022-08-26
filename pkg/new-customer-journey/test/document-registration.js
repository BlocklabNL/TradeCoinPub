const Notary          = artifacts.require("Notary");
const CustomerJourney = artifacts.require("CustomerJourney");
const truffleAssert   = require('truffle-assertions');

contract('CustomerJourney', async (accounts) => {
    const owner = accounts[0];

    beforeEach(async () => {
       this.notary = await Notary.new();
       this.journey = await CustomerJourney.new(this.notary.address);
    });

    it('registers new assets', async () => {

        let docType = 1
        let description = 'my document'

        let tx = await this.journey.RegisterDocument(docType, description);

        assert.equal(tx.receipt.status, 1, 'transaction failed unexpected');

        // check log
        assert.equal(tx.logs.length, 1, 'expected the DocumentTypeRegistered log');
        
        let log = tx.logs[0]
        assert.equal(log.event, 'DocumentTypeRegistered', 'invalid event emitted');
        assert.equal(log.args.docType, docType, 'invalid asset hash in AssetRegistered log');
        assert.equal(log.args.description, description, 'invalid owner in AssetRegistered log');


        // ensure that it exists in the statie
        let docDescription = await this.journey.documents.call(docType);
        let docTypeId = await this.journey.documentDescriptionMapping.call(description);

        assert.equal(docDescription, description, "Expected a differnet description" );
        assert.equal(docType, docTypeId, "Expected a differnet doc type identifier");

    });

    
    it('fails when registering same doc type', async () => {

        let docType = 1
        let description = 'my document'

        let tx = await this.journey.RegisterDocument(docType, description);

        assert.equal(tx.receipt.status, 1, 'transaction failed unexpected');

        // check log
        assert.equal(tx.logs.length, 1, 'expected the DocumentTypeRegistered log');
        
        let log = tx.logs[0]
        assert.equal(log.event, 'DocumentTypeRegistered', 'invalid event emitted');
        assert.equal(log.args.docType, docType, 'invalid asset hash in AssetRegistered log');
        assert.equal(log.args.description, description, 'invalid owner in AssetRegistered log');

        // should fail registration
        await truffleAssert.fails(
            this.journey.RegisterDocument(docType, description),
            truffleAssert.ErrorType.REVERT);

    });

    it('allows to remove an existing docType', async () => {

        let docType = 1
        let description = 'my document'

        let tx = await this.journey.RegisterDocument(docType, description);

        assert.equal(tx.receipt.status, 1, 'transaction failed unexpected');

        // check log
        assert.equal(tx.logs.length, 1, 'expected the DocumentTypeRegistered log');
        
        let log = tx.logs[0]
        assert.equal(log.event, 'DocumentTypeRegistered', 'invalid event emitted');
        assert.equal(log.args.docType, docType, 'invalid asset hash in AssetRegistered log');
        assert.equal(log.args.description, description, 'invalid owner in AssetRegistered log');


        tx = await this.journey.RemoveDocument(docType);

        assert.equal(tx.receipt.status, 1, 'transaction failed unexpected');

        // checking logs
        log = tx.logs[0]
        assert.equal(log.event, 'DocumentTypeDeleted', 'invalid event emitted');
        assert.equal(log.args.docType, docType, 'invalid asset hash in AssetRegistered log');
        assert.equal(log.args.description, description, 'invalid owner in AssetRegistered log');


        // ensure that is removed from the state
        let emptyDescription = await this.journey.documents.call(docType);
        assert.equal(emptyDescription, '', 'unexpected document descripiton');

    });


    it('makes sure 0 doc type still exists after removing some other doctype', async () => {

        let docType1 = 0 //defining the 0 value
        let description1 = 'my document'

        let docType2 = 1 // doc type for 1
        let description2 = 'other'


        // FIRST DOCUMENT TYPE  //
        let tx = await this.journey.RegisterDocument(docType1, description1);
        assert.equal(tx.receipt.status, 1, 'transaction failed unexpected');

        // check log
        assert.equal(tx.logs.length, 1, 'expected the DocumentTypeRegistered log');
        
        let log = tx.logs[0]
        assert.equal(log.event, 'DocumentTypeRegistered', 'invalid event emitted');
        assert.equal(log.args.docType, docType1, 'invalid asset hash in AssetRegistered log');
        assert.equal(log.args.description, description1, 'invalid owner in AssetRegistered log');


        // SECOND DOCUMENT TYPE REGISTERED //
        tx = await this.journey.RegisterDocument(docType2, description2);
        assert.equal(tx.receipt.status, 1, 'transaction failed unexpected');

        // check log
        assert.equal(tx.logs.length, 1, 'expected the DocumentTypeRegistered log');
        
        log = tx.logs[0]
        assert.equal(log.event, 'DocumentTypeRegistered', 'invalid event emitted');
        assert.equal(log.args.docType, docType2, 'invalid asset hash in AssetRegistered log');
        assert.equal(log.args.description, description2, 'invalid owner in AssetRegistered log');


        // REMOVING THE SECOND DOCTYPE //
        tx = await this.journey.RemoveDocument(docType2);

        assert.equal(tx.receipt.status, 1, 'transaction failed unexpected');

        // checking logs
        log = tx.logs[0]
        assert.equal(log.event, 'DocumentTypeDeleted', 'invalid event emitted');
        assert.equal(log.args.docType, docType2, 'invalid asset hash in AssetRegistered log');
        assert.equal(log.args.description, description2, 'invalid owner in AssetRegistered log');


        // ensure that is removed from the state
        let emptyDescription = await this.journey.documents.call(docType2);
        assert.equal(emptyDescription, '', 'unexpected document descripiton');

        //assert 0 value is still defined
        let existingDescription = await this.journey.documents.call(docType1);
        assert.equal(existingDescription, description1, 'unexpected document descripiton');

    });

    it('fails when deleteing unexisting doc type', async () => {

        let docType = 1
        await truffleAssert.fails(
            this.journey.RemoveDocument(docType),
            truffleAssert.ErrorType.REVERT);

    });

});
