const Notary          = artifacts.require("Notary");
const CustomerJourney = artifacts.require("CustomerJourney");
const truffleAssert   = require('truffle-assertions');
const crypto          = require('crypto');

function generateHashes(count) {
    var hashes = [];
    for (let i = 0; i < count; i++) {
        hashes.push('0x' + crypto.randomBytes(32).toString('hex'));
    }
    return hashes;
}

contract('CustomerJourney', async (accounts) => {
    const owner = accounts[0];
    const expiresAt = Math.floor((new Date()).getTime() / 1000) + 3600;

    beforeEach(async () => {
       this.notary = await Notary.new();
       this.journey = await CustomerJourney.new(this.notary.address);
       for (let i = 1; i < 8; i++) {
           await this.journey.RegisterDocument(i, 'unittest document');
       }
       
    });

    it('link assets', async () => {
        
        // register numerous assets with the notary
        let hashes = generateHashes(10);
        for (let i = 0; i < hashes.length; i++) {
            let tx = await this.notary.registerAsset(hashes[i], expiresAt, {from: owner});
            assert.equal(tx.receipt.status, 1, 'transaction failed unexpected');
        };

        // register them in the customer journey contract as follows.
        //     layer 0              layer 1          layer 2            layer 3
        // start(hashes[0]) -> link(hashes[1]) -> link(hashes[2])
        //                  -> link(hashes[3]) -> link(hashes[4]) -> link(hashes[5])
        //                                     -> link(hashes[6]) -> link(hashes[7])
        //                                     -> link(hashes[8]) -> link(hashes[9])

        let startTx = await this.journey.Start(hashes[0], 1, 'bookingID#1234');

        let linkTx1 = await this.journey.Link(hashes[0], hashes[1], 2, 'bookingID#1234');
        let linkTx2 = await this.journey.Link(hashes[1], hashes[2], 3, '');

        let linkTx3 = await this.journey.Link(hashes[0], hashes[3], 4, '');
        let linkTx4 = await this.journey.Link(hashes[3], hashes[4], 5, '');
        let linkTx5 = await this.journey.Link(hashes[4], hashes[5], 5, '');

        let linkTx6 = await this.journey.Link(hashes[3], hashes[6], 6, '');
        let linkTx7 = await this.journey.Link(hashes[6], hashes[7], 7, '');

        let linkTx8 = await this.journey.Link(hashes[3], hashes[8], 7, '');
        let linkTx9 = await this.journey.Link(hashes[8], hashes[9], 7, '');

        // query to determine that journey has been good registered
        let start = hashes[0];
        let fromBlk = await this.journey.deployedOn();

        // find journey start log
        let crit = {filter: {hash: start}, fromBlock: fromBlk};
        let result = await this.journey.getPastEvents('JourneyStart', crit);

        // ensure that we retrieved the correct log
        assert.equal(result[0].transactionHash, startTx.tx);

        // retrieve all link events,
        // the "first" link layer has 2 nodes attached to the start asset
        crit = {filter: {parent: start}, fromBlock: fromBlk};
        result = await this.journey.getPastEvents('AssetLinked', crit)
        assert.equal(result.length, 2);

        // the second layer has 4 nodes attached to the 2 parents fetch previously.
        let parents = [];
        for (let i = 0; i < result.length; i++) {
            parents.push(result[i].args.hash);
        }

        crit = {filter: {parent: parents}, fromBlock: fromBlk};
        result = await this.journey.getPastEvents('AssetLinked', crit)
        assert.equal(result.length, 4);

        // the third layer has 3 nodes attached to possibliy 4 parents fetched previously
        parents = [];
        for (let i = 0; i < result.length; i++) {
            parents.push(result[i].args.hash);
        }

        crit = {filter: {parent: parents}, fromBlock: fromBlk};
        result = await this.journey.getPastEvents('AssetLinked', crit)
        assert.equal(result.length, 3);

        // check that all 3 last fetched assets have no children
        parents = [];
        for (let i = 0; i < result.length; i++) {
            parents.push(result[i].args.hash);
        }

        crit = {filter: {parent: parents}, fromBlock: fromBlk};
        result = await this.journey.getPastEvents('AssetLinked', crit)
        assert.equal(result.length, 0);
    });
});
