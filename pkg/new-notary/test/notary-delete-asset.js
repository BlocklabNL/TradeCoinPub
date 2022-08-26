var Notary = artifacts.require("Notary");

const truffleAssert = require('truffle-assertions');

contract('Notary::deleteAsset', (accounts) => {
    const account0 = accounts[0];
    const account1 = accounts[1];
    const expiresAt = Math.floor((new Date()).getTime() / 1000) + 3600;

    beforeEach(async () => {
        this.notary = await Notary.new();
    });

    it('should successfully delete asset', async () => {
        let assetHash = '0x56ed0d1c6674d453561794036fd9900eb6f209defa4da34235d625b06794a18e';

        // register asset and ensure that the tx executed succesful by checking the log
        let registerTx = await this.notary.registerAsset(assetHash, expiresAt, {from: account0});
        assert.equal(registerTx.receipt.status, 1, 'transaction failed unexpected');

        // delete it and check log
        let deleteTx = await this.notary.deleteAsset(assetHash, {from: account0});
        assert.equal(deleteTx.receipt.status, 1, 'transaction failed unexpected');
        assert.equal(deleteTx.logs.length, 1, 'expected the AssetDeleted log');

        let log = deleteTx.logs[0];
        assert.equal(log.event, 'AssetDeleted', 'invalid event emitted');
        assert.equal(log.args.hash, assetHash, 'unexpected hash emitted');

        // ensure that is removed from the state
        let asset = await this.notary.assets.call(assetHash);
  
        let receivedOwner = asset.owner;
        let receivedExpiresAt = asset.expiresAt;

        assert.equal(receivedOwner, '0x0000000000000000000000000000000000000000', 'unexpected network received');
        assert.equal(receivedExpiresAt, 0, 'unexpected network received');
    });

    it('should fail deleting non-owned asset', async () => {
        let assetHash = '0x07626041386612c6bf3682ff760907086804fa311a87a3badb405ba906da1153';

        // register asset and ensure that the tx executed succesful
        let registerTx = await this.notary.registerAsset(assetHash, expiresAt, {from: account0});
        assert.equal(registerTx.receipt.status, 1, 'transaction failed unexpected');

        // try to delete from another account than the owner
        await truffleAssert.fails(
            this.notary.deleteAsset(assetHash, {from: account1}),
            truffleAssert.ErrorType.REVERT);
    });

});
