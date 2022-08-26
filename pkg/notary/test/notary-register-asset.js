var Notary = artifacts.require("Notary");

const truffleAssert = require('truffle-assertions');

contract('Notary::registerAsset', (accounts) => {
    const owner = accounts[0];
    const network = 1;
    const assetHash = '0x589af30f458f642e5ff32855c80f597b16fd010e368465d00fa65dab7f6e8fe7';
    const app = 1; // http://some.host/{path}/{asset} => http://some.host/asset/a42b8de33
    const appDescription = 'unittest application';
    const pathSpec = '{"path":"/asset","asset":"a42b8de33"}';
    const expiresAt = Math.floor((new Date()).getTime() / 1000) + 3600;

    beforeEach(async () => {
        this.notary = await Notary.new();
        const notaryOwner = await this.notary.owner();
        await this.notary.registerApplication(app, appDescription, {from: notaryOwner});
    });

    it('register new asset', async () => {
        let tx = await this.notary.registerAsset(network, assetHash, app, pathSpec, expiresAt, {from: owner});
        assert.equal(tx.receipt.status, 1, 'transaction failed unexpected');

        // check log
        assert.equal(tx.logs.length, 1, 'expected the AssetRegistered log');
        let log = tx.logs[0]

        assert.equal(log.event, 'AssetRegistered', 'invalid event emitted');
        assert.equal(log.args.hash, assetHash, 'invalid asset hash in AssetRegistered log');
        assert.equal(log.args.network, network, 'invalid network in AssetRegistered log');
        assert.equal(log.args.owner, owner, 'invalid owner in AssetRegistered log');

        // check contract state (result is returned in an array since returning structs isn't yet supported in web3.js)
        let asset = await this.notary.assets.call(assetHash);

        let receivedNetwork = asset.network;
        let receivedOwner = asset.owner;
        let receivedApp = asset.app;
        let receivedPathSpec = asset.pathSpec;
        let receivedExpiresAt = asset.expiresAt;

        assert.equal(owner, receivedOwner, 'unexpected owner received');
        assert.equal(network, receivedNetwork, 'unexpected network received');
        assert.equal(app, receivedApp, 'unexpected app received');
        assert.equal(pathSpec, receivedPathSpec, 'unexpected pathSpec received');
        assert.equal(expiresAt, receivedExpiresAt, 'unexpected expiresAt received');
    });

    it('register new asset with invalid hash', async () => {
        var invalidHash = '0x0000000000000000000000000000000000000000000000000000000000000000';

        await truffleAssert.fails(
            this.notary.registerAsset(network, invalidHash, app, pathSpec, expiresAt, {from: owner}),
            truffleAssert.ErrorType.REVERT);
    });

    it('register already registered asset', async () => {
        var hash = '0x0000000000000000000000000000000000000000000000000000000000001234'

        // should succeed
        let tx = await this.notary.registerAsset(network, hash, app, pathSpec, expiresAt, {from: owner});
        assert.equal(tx.receipt.status, 1, 'registering asset failed');

        // registering the same asset again should fail
        await truffleAssert.fails(
            this.notary.registerAsset(network, hash, app, pathSpec, expiresAt, {from: owner}),
            truffleAssert.ErrorType.REVERT);
    });

    it('register asset with too short endpoint', async () => {
        let invalidPathSpec = 'aa';

        await truffleAssert.fails(
            this.notary.registerAsset(network, assetHash, app, invalidPathSpec, expiresAt, {from: owner}),
            truffleAssert.ErrorType.REVERT);
    });

    it('register asset with invalid expiresAt', async () => {
        let invalidExpiresAt = Math.floor(Date.now() / 1000) - 1;

        await truffleAssert.fails(
            this.notary.registerAsset(network, assetHash, app, pathSpec, invalidExpiresAt, {from: owner}),
            truffleAssert.ErrorType.REVERT);
    });

});
