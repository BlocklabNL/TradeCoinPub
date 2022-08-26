var Notary = artifacts.require("Notary");

const truffleAssert = require('truffle-assertions');

contract('Notary::kill', (accounts) => {

    it('kill notary', async () => {
        let notary = await Notary.new();
        let owner = await notary.owner();

        tx = await notary.kill({from: owner});
        assert.equal(tx.receipt.status, 1, 'transaction should succeed'); 
    });

    it('kill notary from invalid account', async () => {
        let notary = await Notary.new();
        let owner = await notary.owner();

        var account;
        for (var i = 0; i < accounts.length; i++) {
            if (accounts[i] != owner) {
                account = accounts[i];
                break;
            }
        }

        await truffleAssert.fails(
            notary.kill({from: account}),
            truffleAssert.ErrorType.REVERT);
    });
});
