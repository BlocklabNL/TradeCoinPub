var Notary = artifacts.require("Notary");

const truffleAssert = require('truffle-assertions');

contract('Notary::transferAssetByCurrentOwner', (accounts) => {
    const account0 = accounts[0];
    const account1 = accounts[1];
    const app = 1; // http://some.host/{path}/{asset} => http://some.host/asset/a42b8de33
    const appDescription = 'unittest application';
    const pathSpec = '{"path":"/asset","asset":"a42b8de33"}';
    const expiresAt = Math.floor((new Date()).getTime() / 1000) + 3600;

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

        let transferTx = await this.notary.transferOwnership(assetHash, currentNetwork, newNetwork, newOwner, {from: currentOwner})
        assert.equal(transferTx.receipt.status, 1, 'transaction failed unexepcted');

        // check that the `AssetNewClaim` event is raised
        assert.equal(transferTx.logs.length, 1, 'expected the AssetRegistered log');
        let log = transferTx.logs[0];

        assert.equal(log.event, 'AssetNewClaim', 'invalid event emitted');
        assert.equal(log.args.hash, assetHash, 'invalid asset hash in AssetNewClaim log');
        assert.equal(log.args.addr, newOwner, 'invalid owner in AssetNewClaim log');
        assert.equal(log.args.network, newNetwork, 'invalid network in AssetNewClaim log');

        let approveTx = await this.notary.acceptOwnership(assetHash, newNetwork, app, pathSpec, expiresAt, {from: newOwner});
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

        // ensure that it is removed from the pending state
        let asset = await this.notary.pendingTransfers.call(assetHash);

        assert.equal(asset.owner, '0x0000000000000000000000000000000000000000', 'unexpected owner');
    });

    it('reject transfer ownership', async () => {
        let assetHash = '0x66670d1c6674d453561794036fd9900eb6f209defa4da34235d625b06794a18e';
        let currentOwner = account0;
        let currentNetwork = 1;
        let newOwner = account1;
        let newNetwork = 2;

        // register new asset
        let registerTx = await this.notary.registerAsset(currentNetwork, assetHash, app, pathSpec, expiresAt, {from: currentOwner});
        assert.equal(registerTx.receipt.status, 1, 'transaction failed unexpected');

        // initiate transfer
        let transferTx = await this.notary.transferOwnership(assetHash, currentNetwork, newNetwork, newOwner, {from: currentOwner})
        assert.equal(transferTx.receipt.status, 1, 'transaction failed unexpected');

        // reject transfer
        let rejectTx = await this.notary.rejectOwnership(assetHash, newNetwork, {from: newOwner});
        assert.equal(rejectTx.receipt.status, 1, 'transaction failed unexpected');

        // check that the `AssetOwnershipTransferred` event is raised
        assert.equal(rejectTx.logs.length, 1, 'expected the AssetOwnershipTransferred log');
        log = rejectTx.logs[0];

        assert.equal(log.event, 'AssetClaimRejected', 'invalid event emitted');
        assert.equal(log.args.hash, assetHash, 'invalid asset hash in AssetClaimRejected log');
    });

    it('disallow transfer ownership of non-owned asset', async () => {
        let assetHash = '0x666705678674d453561794036fd9900eb6f209defa4da34235d625b06794a18e';
        let currentOwner = account0;
        let currentNetwork = 1;
        let newOwner = account1;
        let newNetwork = 2;

        // register new asset
        let registerTx = await this.notary.registerAsset(currentNetwork, assetHash, app, pathSpec, expiresAt, {from: currentOwner});
        assert.equal(registerTx.receipt.status, 1, 'transaction failed unexpected');

        // initiate transfer of non-owned asset to myself
        await truffleAssert.fails(
            this.notary.transferOwnership(assetHash, currentNetwork, newNetwork, newOwner, {from: newOwner}),
            truffleAssert.ErrorType.REVERT);
    });

    it('disallow approving transfer ownership of owned asset without permisson new owner', async () => {
        let assetHash = '0x666705678674d453561794036fd9900eb6f209defa4da34235d625b99994a18e';
        let currentOwner = account0;
        let currentNetwork = 1;
        let newOwner = account1;
        let newNetwork = 2;

        // register new asset
        let registerTx = await this.notary.registerAsset(currentNetwork, assetHash, app, pathSpec, expiresAt, {from: currentOwner});
        assert.equal(registerTx.receipt.status, 1, 'transaction failed unexpected');

        // initiate transfer
        let transferTx = await this.notary.transferOwnership(assetHash, currentNetwork, newNetwork, newOwner, {from: currentOwner})
        assert.equal(transferTx.receipt.status, 1, 'transaction failed unexpected');

        // self approve ownership transfer
        await truffleAssert.fails(
            this.notary.acceptOwnership(assetHash, newNetwork, app, pathSpec, expiresAt, {from: currentOwner}),
            truffleAssert.ErrorType.REVERT);
    });
});
