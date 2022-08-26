var Notary = artifacts.require("Notary");

const truffleAssert = require('truffle-assertions');

contract('Notary::updateAsset', (accounts) => {
    const owner = accounts[0];
    const assetHash = '0xd8967aac5d24b95f5d4658b4f7d05b08db839dc3cfc5f4d6d69ee165242923a7';
    const expiresAt = Math.floor((new Date()).getTime() / 1000) + 3600;

    beforeEach(async () => {
        this.notary = await Notary.new();
    });

    it('should successfully update asset', async () => {
        // register asset and ensure that the tx executed succesful by checking the log
        let registerTx = await this.notary.registerAsset(assetHash, expiresAt, {from: owner});
        assert.equal(registerTx.receipt.status, 1, 'transaction failed unexpected');
        assert.equal(registerTx.logs.length, 1, 'expected the AssetRegistered log');

        // send an updated version for the registered asset
        let newHash = '0x74be07fea395f9767d99fa915d0728212d5800429f676ae850338606e9f1cba9';
        let updateTx = await this.notary.updateAsset(assetHash, newHash, expiresAt, {from: owner});

        // check emitted log
        assert.equal(updateTx.logs.length, 1, 'expected the AssetUpdated log');
        let log = updateTx.logs[0]

        assert.equal(log.event, 'AssetUpdated', 'invalid event emitted');
        assert.equal(log.args.newHash, newHash, 'unexpected new hash emitted');
        assert.equal(log.args.previousHash, assetHash, 'unexpected previous hash emitted');

        // check state
        let asset = await this.notary.assets.call(newHash);

        let receivedOwner = asset.owner;
        let receivedExpiresAt = asset.expiresAt;

        assert.equal(owner, receivedOwner, 'unexpected owner received');
        assert.equal(expiresAt, receivedExpiresAt, 'unexpected expiresAt received');
    });

    it('should fail updating unknown asset', async () => {
        let unknownAsset = '0x0ec98d9a630fd30e01179f35e8bb40bd01d6db19152e418f606a8886d97b6375';
        let newHash = '0xede6b330d41d6fb1857cb8c4dda2efcde4c30405e7dd2abbfb5ea814b86b075f';

        await truffleAssert.fails(
            this.notary.updateAsset(unknownAsset, newHash, expiresAt, {from: owner}),
            truffleAssert.ErrorType.REVERT);
    });

    
    it('should fail updating asset from different owner', async () => {
        let currentHash = '0xb5696308eb645203216a2e1ce429f9787753e1dcf014a99daeebf7b6c4f7605b';
        let newHash = '0x00000008eb645203216a2e1ce429f9787753e1dcf014a99daeebf7b6c4f7605b';

        // register new asset
        let registerTx = await this.notary.registerAsset(currentHash, expiresAt, {from: owner});
        assert.equal(registerTx.receipt.status, 1, 'registering asset failed');

        var account;
        for (var i = 0; i < accounts.length; i++) {
            if (accounts[i] != owner) {
                account = accounts[i];
                break;
            }
        }

        await truffleAssert.fails(
            this.notary.updateAsset(currentHash, newHash, expiresAt, {from: account}), 
            truffleAssert.ErrorType.REVERT);
    });

    it('should fail updating asset with invalid hash', async () => {
        let currentHash = '0x11136308eb645203216a2e1ce429f9787753e1dcf014a99daeebf7b6c4f7605b';
        let newHash = '0x0000000000000000000000000000000000000000000000000000000000000000';

        // register new asset
        let registerTx = await this.notary.registerAsset(currentHash, expiresAt, {from: owner});
        assert.equal(registerTx.receipt.status, 1, 'registering asset failed');

        // update with invalid hash
        await truffleAssert.fails(
            this.notary.updateAsset(currentHash, newHash, expiresAt, {from: owner}),
            truffleAssert.ErrorType.REVERT);
    });

    it('should fail updating asset with already registered asset', async () => {
        let currentHash = '0x22136308eb645203216a2e1ce429f9787753e1dcf014a99daeebf7b6c4f7605b';
        let newHash = '0x9922000000000000000000000000000000000000000000000000000000000000';

        // register new asset
        let tx1 = await this.notary.registerAsset(currentHash, expiresAt, {from: owner});
        assert.equal(tx1.receipt.status, 1, 'registering asset failed');

        let tx2 = await this.notary.registerAsset(newHash, expiresAt, {from: owner});
        assert.equal(tx2.receipt.status, 1, 'registering asset failed');

        // update with asset that is already registered
        await truffleAssert.fails(
            this.notary.updateAsset(currentHash, newHash, expiresAt, {from: owner}),
            truffleAssert.ErrorType.REVERT);
    });

    it('should fail updating asset with asset that has an invalid expiresAt', async () => {
        let currentHash = '0x1234567800000000000000000000000000000000000000000000000000000000';
        let newHash = '0x9999988888877777744444466662367236623287328783782443763426723483';

        // register new asset
        let tx1 = await this.notary.registerAsset(currentHash, expiresAt, {from: owner});
        assert.equal(tx1.receipt.status, 1, 'registering asset failed');

        // update with asset that has an invalid expiresAt
        let expires = Math.floor(Date.now() / 1000) - 1;
        await truffleAssert.fails(
            this.notary.updateAsset(currentHash, newHash, expires, {from: owner}),
            truffleAssert.ErrorType.REVERT);
    });
});
