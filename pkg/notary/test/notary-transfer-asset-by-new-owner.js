var Notary = artifacts.require("Notary");

const truffleAssert = require('truffle-assertions');

contract('Notary::transferAssetByNewOwner', (accounts) => {
    let account0 = accounts[0];
    let account1 = accounts[1];
    var app = 1; // http://some.host/{path}/{asset} => http://some.host/asset/a42b8de33
    var appDescription = 'unittest application';
    var pathSpec = '{"path":"/asset","asset":"a42b8de33"}';
    var expiresAt = Math.floor((new Date()).getTime() / 1000) + 3600;

    beforeEach(async () => {
        this.notary = await Notary.new();
        const notaryOwner = await this.notary.owner();
        await this.notary.registerApplication(app, appDescription, {from: notaryOwner});
    });

    it('transfer ownership', async () => {
        let assetHash = '0x66ed0d1c6674d453561794036fd9900eb6f209defa4da34235d625b06794a18e';
        let currentOwner = account0;
        let currentNetwork = 1;
        let newOwner = account1;
        let newNetwork = 2;

        // register new asset
        let registerTx = await this.notary.registerAsset(currentNetwork, assetHash, app, pathSpec, expiresAt, {from: currentOwner});
        assert.equal(registerTx.receipt.status, 1, 'transaction failed unexpected');

        // claim ownership of asset
        let claimTx = await this.notary.claimAsset(assetHash, newNetwork, app, pathSpec, expiresAt, {from: newOwner})
        assert.equal(claimTx.receipt.status, 1, 'transaction failed unexepcted');

        // check that the `AssetNewClaim` event is raised
        assert.equal(claimTx.logs.length, 1, 'expected the AssetRegistered log');
        let log = claimTx.logs[0];

        assert.equal(log.event, 'AssetNewClaim', 'invalid event emitted');
        assert.equal(log.args.hash, assetHash, 'invalid asset hash in AssetNewClaim log');
        assert.equal(log.args.addr, currentOwner, 'invalid addr in AssetNewClaim log');
        assert.equal(log.args.network, currentNetwork, 'invalid network in AssetNewClaim log');

        // approve claim
        let approveTx = await this.notary.acceptClaim(assetHash, currentNetwork, {from: currentOwner});
        assert.equal(approveTx.receipt.status, 1, 'transaction failed unexpected');

        // check that the `AssetOwnershipTransferred` event is raised
        assert.equal(approveTx.logs.length, 1, 'expected the AssetOwnershipTransferred log');
        log = approveTx.logs[0];

        assert.equal(log.event, 'AssetOwnershipTransferred', 'invalid event emitted');
        assert.equal(log.args.hash, assetHash, 'invalid asset hash in AssetOwnershipTransferred log');
        assert.equal(log.args.oldNetwork, currentNetwork, 'invalid currentNetwork');
        assert.equal(log.args.oldOwner, currentOwner, 'invalid currentOwner');
        assert.equal(log.args.newNetwork, newNetwork, 'invalid newNetwork');
        assert.equal(log.args.newOwner, newOwner, 'invalid newOwner');
    });

    it('reject transfer ownership', async () => {
        let assetHash = '0x66ed0d1c6674d453561794034449900eb6f209defa4da34235d625b06794a18e';
        let currentOwner = account0;
        let currentNetwork = 1;
        let newOwner = account1;
        let newNetwork = 2;

        // register new asset
        let registerTx = await this.notary.registerAsset(currentNetwork, assetHash, app, pathSpec, expiresAt, {from: currentOwner});
        assert.equal(registerTx.receipt.status, 1, 'transaction failed unexpected');

        // claim ownership of asset
        let claimTx = await this.notary.claimAsset(assetHash, newNetwork, app, pathSpec, expiresAt, {from: newOwner})
        assert.equal(claimTx.receipt.status, 1, 'transaction failed unexepcted');

        // reject claim by current owner
        let rejectTx = await this.notary.rejectClaim(assetHash, currentNetwork, {from: currentOwner});
        assert.equal(rejectTx.receipt.status, 1, 'transaction failed unexepcted');

        // check the AssetClaimRejected event
        assert.equal(rejectTx.logs.length, 1, 'expected the AssetClaimRejected log');
        log = rejectTx.logs[0];

        assert.equal(log.event, 'AssetClaimRejected', 'invalid event emitted');
        assert.equal(log.args.hash, assetHash, 'invalid asset hash in AssetClaimRejected log');
    });

    it('disallow stealing asset by claiming and self approving', async () => {
        let assetHash = '0x66ed0d1c6674d488561794034449900eb6f209defa4da34235d625b06794a18e';
        let currentOwner = account0;
        let currentNetwork = 1;
        let newOwner = account1;
        let newNetwork = 2;

        // register new asset
        let registerTx = await this.notary.registerAsset(currentNetwork, assetHash, app, pathSpec, expiresAt, {from: currentOwner});
        assert.equal(registerTx.receipt.status, 1, 'transaction failed unexpected');

        // claim ownership of asset
        let claimTx = await this.notary.claimAsset(assetHash, newNetwork, app, pathSpec, expiresAt, {from: newOwner})
        assert.equal(claimTx.receipt.status, 1, 'transaction failed unexepcted');

        // self approve claim
        await truffleAssert.fails(
            this.notary.acceptClaim(assetHash, newNetwork, {from: newOwner}),
            truffleAssert.ErrorType.REVERT);
    });
});
