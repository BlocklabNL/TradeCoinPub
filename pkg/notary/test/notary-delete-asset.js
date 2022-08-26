var Notary = artifacts.require("Notary");

const truffleAssert = require('truffle-assertions');

contract('Notary::deleteAsset', (accounts) => {
    const account0 = accounts[0];
    const account1 = accounts[1];
    const network = 1;
    const app = 1; // http://some.host/{path}/{asset} => http://some.host/asset/a42b8de33
    const appDescription = 'unittest';
    const pathSpec = '{"path":"/asset","asset":"a42b8de33"}';
    const expiresAt = Math.floor((new Date()).getTime() / 1000) + 3600;

    beforeEach(async () => {
        this.notary = await Notary.new();
        const notaryOwner = await this.notary.owner();
        await this.notary.registerApplication(app, appDescription, {from: notaryOwner});
    });

    it('delete asset', async () => {
        let assetHash = '0x56ed0d1c6674d453561794036fd9900eb6f209defa4da34235d625b06794a18e';

        // register asset and ensure that the tx executed succesful by checking the log
        let registerTx = await this.notary.registerAsset(network, assetHash, app, pathSpec, expiresAt, {from: account0});
        assert.equal(registerTx.receipt.status, 1, 'transaction failed unexpected');

        // delete it and check log
        let deleteTx = await this.notary.deleteAsset(assetHash, network, {from: account0});
        assert.equal(deleteTx.receipt.status, 1, 'transaction failed unexpected');
        assert.equal(deleteTx.logs.length, 1, 'expected the AssetDeleted log');

        let log = deleteTx.logs[0];
        assert.equal(log.event, 'AssetDeleted', 'invalid event emitted');
        assert.equal(log.args.hash, assetHash, 'unexpected hash emitted');

        // ensure that is removed from the state
        let asset = await this.notary.assets.call(assetHash);
  
        let receivedNetwork = asset.network;
        let receivedOwner = asset.owner;
        let receivedApp = asset.app;
        let receivedPathSpec = asset.pathSpec;
        let receivedExpiresAt = asset.expiresAt;

        assert.equal(receivedNetwork, 0, 'unexpected network received');
        assert.equal(receivedOwner, '0x0000000000000000000000000000000000000000', 'unexpected network received');
        assert.equal(receivedApp, 0, 'unexpected app received');
        assert.equal(receivedPathSpec, '', 'unexpected pathSpec received');
        assert.equal(receivedExpiresAt, 0, 'unexpected network received');
    });

    it('delete non-owned asset', async () => {
        let assetHash = '0x07626041386612c6bf3682ff760907086804fa311a87a3badb405ba906da1153';

        // register asset and ensure that the tx executed succesful
        let registerTx = await this.notary.registerAsset(network, assetHash, app, pathSpec, expiresAt, {from: account0});
        assert.equal(registerTx.receipt.status, 1, 'transaction failed unexpected');

        // try to delete from another account than the owner
        await truffleAssert.fails(
            this.notary.deleteAsset(assetHash, network, {from: account1}),
            truffleAssert.ErrorType.REVERT);
    });

    it('delete asset that is marked for transfer of ownership', async () => {
        let assetHash = '0x05526041386612c6bf3682ff760907086804fa311a87a3badb405ba906da1153';

        // register asset and ensure that the tx executed succesful
        let registerTx = await this.notary.registerAsset(network, assetHash, app, pathSpec, expiresAt, {from: account0});
        assert.equal(registerTx.receipt.status, 1, 'transaction failed unexpected');

        // initiate transfer of ownership
        let transferTx = await this.notary.transferOwnership(assetHash, network, network, account1, {from: account0});
        assert.equal(transferTx.receipt.status, 1, 'transfer of ownership transaction failed unexpected');

        // try to delete it while marked for ownership transfer
        await truffleAssert.fails(
            this.notary.deleteAsset(assetHash, network, {from: account0}),
            truffleAssert.ErrorType.REVERT);
    });
});
