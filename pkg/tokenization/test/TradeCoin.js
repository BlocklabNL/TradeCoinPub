const { expect } = require("chai");
const { ethers } = require("hardhat");

let Token;
let hardhatToken;
let owner;
let addr1;
let addr2;
let addrs;

// `beforeEach` will run before each test, re-deploying the contract every
// time. It receives a callback, which can be async.
beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    Token = await ethers.getContractFactory("TradeCoinContract");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // for it to be deployed(), which happens once its transaction has been
    // mined.
    hardhatToken = await Token.deploy("ProductNFT", "PNFT");
});

describe("Deployment", function () {
    it("Should initialize tokenization", async function () {
        // Fails
        // Initializes a token with product "Cashew" and weightValue 0 fails as this is not supposed to happen
        await expect(hardhatToken.connect(owner).initialTokenization("Cashew", 0, ethers.utils.formatBytes32String("Liters"), "10.0000, 4.0000")).to.revertedWith("Weight can't be 0");
        // Initializes a token with product "Cashew" and weightValue 100 as a non tokenizer or admin => Fails as only those can call this function
        await expect(hardhatToken.connect(addr1).initialTokenization("Cashew", 100, ethers.utils.formatBytes32String("Liters"), "10.0000, 4.0000")).to.revertedWith("Restricted to FTokenizer or admins.");

        // Succeeds
        // Initializes a token with product "Cashew" and weightValue 100
        await hardhatToken.connect(owner).initialTokenization("Cashew", 100, ethers.utils.formatBytes32String("Liters"), "10.0000, 4.0000");
        const addr1Balance = await hardhatToken.balanceOf(owner.address);
        expect(addr1Balance).to.equal(1);
    });

    it("Should initialize commercial Tx", async function () {
        // Initializes a token with product "Cashew" and weightValue 100
        await hardhatToken.connect(owner).initialTokenization("Cashew", 100, ethers.utils.formatBytes32String("Liters"),  "10.0000, 4.0000");
        const addr1Balance = await hardhatToken.balanceOf(owner.address);
        expect(addr1Balance).to.equal(1);

        // fails
        await expect(hardhatToken.connect(owner).initiateCommercialTx(
            1, 
            0,
            owner.address, 
            {
                docHash: [ethers.utils.formatBytes32String("TestDocHash")], 
                docType: [ethers.utils.formatBytes32String("TestDocType")],
                rootHash: ethers.utils.formatBytes32String("TestRootHash")
            }, 
            true
        )).to.be.revertedWith("You can't sell to yourself");

        await expect(hardhatToken.connect(addr1).initiateCommercialTx(1, 0, owner.address, {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")}, true)).to.be.revertedWith("Not Owner");
        await expect(hardhatToken.connect(owner).initiateCommercialTx(1, 0, addr1.address, {docHash: [ethers.utils.formatBytes32String("TestDocHash"), ethers.utils.formatBytes32String("TTTT")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")}, true)).to.be.revertedWith("Invalid length");
        await expect(hardhatToken.connect(owner).initiateCommercialTx(1, 10, addr1.address, {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")}, true)).to.be.revertedWith("Not eth amount");

        // succeeds
        await hardhatToken.connect(owner).initiateCommercialTx(1, 0, addr1.address, {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")}, true);
        expect(await hardhatToken.addressOfNewOwner(1) == (addr1.address));

        // fails Because you can't finish a tx if it was not approved first
        await expect(hardhatToken.connect(addr1).finishCommercialTx(1, {
            docHash: [ethers.utils.formatBytes32String("docHash")], 
            docType: [ethers.utils.formatBytes32String("docType")], 
            rootHash: ethers.utils.formatBytes32String("rootHash")
        })).to.be.revertedWith("Incorrect State");
    });

    it("Should approve commercial Tx", async function () {
        // Initializes a token with product "Cashew" and weightValue 100
        await hardhatToken.connect(owner).initialTokenization("Cashew", 100, ethers.utils.formatBytes32String("Liters"),  "10.0000, 4.0000");
        const addr1Balance = await hardhatToken.balanceOf(owner.address);
        expect(addr1Balance).to.equal(1);
        await hardhatToken.connect(owner).initialTokenization("Cashew2", 100, ethers.utils.formatBytes32String("Liters"),  "10.0000, 4.0000");
        await hardhatToken.connect(owner).initialTokenization("Cashew3", 100, ethers.utils.formatBytes32String("Liters"),  "10.0000, 4.0000");

        await hardhatToken.connect(owner).initiateCommercialTx(1, 0, addr1.address, {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")}, true);
        expect(await hardhatToken.addressOfNewOwner(1) == (addr1.address));
        await hardhatToken.connect(owner).initiateCommercialTx(2, 10, addr2.address, {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")}, false);
        expect(await hardhatToken.addressOfNewOwner(2) == (addr2.address));

        await expect(hardhatToken.connect(addr1).approveTokenization(1, {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")})).to.be.ok;
        await expect(hardhatToken.connect(addr2).approveTokenization(2, {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")})).to.be.ok;

        await hardhatToken.connect(owner).initiateCommercialTx(1, 0, addr1.address, {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")}, true);
        await hardhatToken.connect(owner).addProductHandler(addr1.address);
        await hardhatToken.connect(addr1).approveTokenization(1, {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")});

        await hardhatToken.connect(addr1).initiateCommercialTx(1, 0, owner.address, {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")}, true);

        // Fails commercialTX
        await expect(hardhatToken.connect(addr1).finishCommercialTx(1, {
            docHash: [ethers.utils.formatBytes32String("docHash")], 
            docType: [ethers.utils.formatBytes32String("docType")], 
            rootHash: ethers.utils.formatBytes32String("rootHash")
        })).to.be.revertedWith("Unauthorized");

        await expect(hardhatToken.connect(owner).finishCommercialTx(1, {
            docHash: [ethers.utils.formatBytes32String("docHash"), ethers.utils.formatBytes32String("T")], 
            docType: [ethers.utils.formatBytes32String("docType")], 
            rootHash: ethers.utils.formatBytes32String("rootHash")
        })).to.be.revertedWith("Invalid length");
    });

    it("Should fail to approve commercial tx", async function () {
        await expect(hardhatToken.connect(addr2).approveTokenization(1, {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")})).to.be.revertedWith("Restricted to ProductHandlers or admins.");
        await expect(hardhatToken.connect(owner).approveTokenization(1, {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")})).to.be.revertedWith("You don't have the right to pay");
    });

    it("Should add new Transformation", async function () {
        // Initializes a token with product "Cashew" and weightValue 100
        await hardhatToken.connect(owner).initialTokenization("Cashew", 100, ethers.utils.formatBytes32String("Liters"), "10.0000, 4.0000");
        const addr1Balance = await hardhatToken.balanceOf(owner.address);
        expect(addr1Balance).to.equal(1);

        // fails transformation
        await expect(hardhatToken.connect(addr1).addTransformation(1, 100, "PEE2", {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")})).to.be.revertedWith("Not the Owner nor current Handler.");
        await expect(hardhatToken.connect(owner).addTransformation(1, 100, "PEE2", {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")})).to.be.revertedWith("Incorrect State");

        // Finish initial tokenization
        await hardhatToken.connect(owner).initiateCommercialTx(1, 0, addr1.address, {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")}, true);
        expect(await hardhatToken.addressOfNewOwner(1) == (addr1.address));
        await expect(hardhatToken.connect(owner).addProductHandler(addr1.address)).to.be.ok;

        await expect(hardhatToken.connect(addr1).approveTokenization(1, {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")})).to.be.ok;

        // Fails more transformations
        await expect(hardhatToken.connect(owner).addTransformation(1, 100, "PEE2", {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")})).to.be.revertedWith("Invalid Weightloss");
        await expect(hardhatToken.connect(owner).addTransformation(1, 0, "PEE2", {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")})).to.be.revertedWith("Invalid Weightloss");


        // succeeds transformation
        await expect(hardhatToken.addTransformation(1, 100, "PEE2", {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")})).to.be.ok
    });

    it("Should fail change state and handler", async function () {
        // Initializes a token with product "Cashew" and weightValue 100
        await hardhatToken.connect(owner).initialTokenization("Cashew", 100, ethers.utils.formatBytes32String("Liters"),  "10.0000, 4.0000");
        await expect(hardhatToken.connect(owner).changeStateAndHandler(1, addr1.address, 3, {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")})).to.be.revertedWith("Incorrect State");
        const addr1Balance = await hardhatToken.balanceOf(owner.address);
        expect(addr1Balance).to.equal(1);

        await hardhatToken.connect(owner).initiateCommercialTx(1, 0, addr1.address, {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")}, true);
        expect(await hardhatToken.addressOfNewOwner(1) == (addr1.address));
        await expect(hardhatToken.connect(owner).addProductHandler(addr1.address)).to.be.ok;

        await expect(hardhatToken.connect(addr1).approveTokenization(1, {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")})).to.be.ok;

        // until here all steps for intial token creation are successful
        await expect(hardhatToken.connect(addr2).changeStateAndHandler(1, addr1.address, 3, {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")})).to.be.revertedWith("Not the Owner nor current Handler.");
        await expect(hardhatToken.connect(addr1).changeStateAndHandler(1, addr1.address, 3, {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType"), ethers.utils.formatBytes32String("2323")], rootHash: ethers.utils.formatBytes32String("TestRootHash")})).to.be.revertedWith("Invalid length");
        await expect(hardhatToken.connect(addr1).changeStateAndHandler(1, addr1.address, 3, {docHash: [ethers.utils.formatBytes32String("TestDocHash"), ethers.utils.formatBytes32String("123123")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")})).to.be.revertedWith("Invalid length");

        // succeeds
        await expect(hardhatToken.connect(addr1).changeStateAndHandler(1, addr1.address, 3, {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")})).to.be.ok;
    });

    it("Should fail Splitting", async function () {
        // Initializes a token with product "Cashew" and weightValue 100
        await hardhatToken.connect(owner).initialTokenization("Cashew", 100, ethers.utils.formatBytes32String("Liters"),  "10.0000, 4.0000");
        await expect(hardhatToken.connect(owner).splitProduct(1, [20, 20, 60], {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")})).to.be.revertedWith("Incorrect State");
        const addr1Balance = await hardhatToken.balanceOf(owner.address);
        expect(addr1Balance).to.equal(1);

        await hardhatToken.connect(owner).initiateCommercialTx(1, 0, addr1.address, {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")}, true);
        expect(await hardhatToken.addressOfNewOwner(1) == (addr1.address));
        await expect(hardhatToken.connect(owner).addProductHandler(addr1.address)).to.be.ok;

        await expect(hardhatToken.connect(addr1).approveTokenization(1, {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")})).to.be.ok;

        // until here all steps for intial token creation are successful
        await expect(hardhatToken.connect(addr1).splitProduct(1, [20, 20, 20], {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")})).to.be.revertedWith("Incorrect sum of amount");
        await expect(hardhatToken.connect(addr1).splitProduct(1, [20, 20, 20, 30], {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")})).to.be.revertedWith("Max 3, Min 2 tokens");
        await expect(hardhatToken.connect(addr1).splitProduct(1, [20, 20, 20], {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType"), ethers.utils.formatBytes32String("123123")], rootHash: ethers.utils.formatBytes32String("TestRootHash")})).to.be.revertedWith("Invalid Length");
        await expect(hardhatToken.connect(owner).splitProduct(1, [20, 20, 20], {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")})).to.be.revertedWith("Not Owner");
        await expect(hardhatToken.connect(addr1).splitProduct(1, [20, 80, 0], {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")})).to.be.revertedWith("Partitions can't be 0");
        await expect(hardhatToken.connect(addr1).splitProduct(1, [20, 30, 40], {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")})).to.be.revertedWith("Incorrect sum of amount");
        await expect(hardhatToken.connect(addr1).splitProduct(1, [20, 30, 60], {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")})).to.be.revertedWith("Incorrect sum of amount");

        // succeeds
        await expect(hardhatToken.connect(addr1).splitProduct(1, [20, 30, 50], {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")})).to.be.ok;
    });

    it("Should fail Batching", async function () {
        // Initializes a token with product "Cashew" and weightValue 100
        await hardhatToken.connect(owner).initialTokenization("Cashew", 100, ethers.utils.formatBytes32String("Liters"),  "10.0000, 4.0000");
        await hardhatToken.connect(owner).initialTokenization("Cashew", 100, ethers.utils.formatBytes32String("Liters"),  "10.0000, 4.0000");
        await hardhatToken.connect(owner).initialTokenization("Cashew3", 100, ethers.utils.formatBytes32String("Liters"),  "10.0000, 4.0000");
        await hardhatToken.connect(owner).initialTokenization("Cashew", 100, ethers.utils.formatBytes32String("Liters"),  "10.0000, 4.0000");

        const addr1Balance = await hardhatToken.balanceOf(owner.address);
        expect(addr1Balance).to.equal(4);
        await expect(hardhatToken.connect(owner).batchProduct([1,2,3], {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")})).to.be.revertedWith("Invalid State");


        await hardhatToken.connect(owner).initiateCommercialTx(1, 0, addr1.address, {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")}, true);
        await hardhatToken.connect(owner).initiateCommercialTx(2, 0, addr1.address, {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")}, true);
        await hardhatToken.connect(owner).initiateCommercialTx(3, 0, addr1.address, {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")}, true);
        await hardhatToken.connect(owner).initiateCommercialTx(4, 0, addr1.address, {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")}, true);

        expect(await hardhatToken.addressOfNewOwner(1) == (addr1.address));
        expect(await hardhatToken.addressOfNewOwner(2) == (addr1.address));
        expect(await hardhatToken.addressOfNewOwner(3) == (addr1.address));
        expect(await hardhatToken.addressOfNewOwner(4) == (addr1.address));

        await expect(hardhatToken.connect(owner).addProductHandler(addr1.address)).to.be.ok;

        await expect(hardhatToken.connect(addr1).approveTokenization(1, {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")})).to.be.ok;
        await expect(hardhatToken.connect(addr1).approveTokenization(2, {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")})).to.be.ok;
        await expect(hardhatToken.connect(addr1).approveTokenization(3, {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")})).to.be.ok;
        await expect(hardhatToken.connect(addr1).approveTokenization(4, {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")})).to.be.ok;

        // until here all steps for intial token creation are successful
        await expect(hardhatToken.connect(addr1).batchProduct([1, 2, 3, 4], {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")})).to.be.revertedWith("Maximum batch: 3, minimum: 2");
        await expect(hardhatToken.connect(addr1).batchProduct([1, 2, 3], {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")})).to.be.revertedWith("Invalid PNFT");
        await expect(hardhatToken.connect(addr1).batchProduct([1, 2, 3], {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType"), ethers.utils.formatBytes32String("123123")], rootHash: ethers.utils.formatBytes32String("TestRootHash")})).to.be.revertedWith("Invalid length");
        await expect(hardhatToken.connect(owner).batchProduct([1, 2, 3], {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")})).to.be.revertedWith("Unauthorized");

        // succeeds
        await expect(hardhatToken.connect(addr1).batchProduct([1, 2, 4], {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")})).to.be.ok;
    });

    it("Should succeed and fail unit conversion", async function () {
        // Initializes a token with product "Cashew" and weightValue 100
        await hardhatToken.connect(owner).initialTokenization("Cashew", 100, ethers.utils.formatBytes32String("Liters"),  "10.0000, 4.0000");
        const addr1Balance = await hardhatToken.balanceOf(owner.address);
        expect(addr1Balance).to.equal(1);

        // Fails
        await expect(hardhatToken.connect(owner).unitConversion(1, 20, ethers.utils.formatBytes32String("Liters"), ethers.utils.formatBytes32String("Liters"))).to.be.revertedWith("Invalid Conversion");
        await expect(hardhatToken.connect(owner).unitConversion(1, 20, ethers.utils.formatBytes32String("Test"), ethers.utils.formatBytes32String("Liters"))).to.be.revertedWith("Invalid Match: unit");
        await expect(hardhatToken.connect(addr1).unitConversion(1, 20, ethers.utils.formatBytes32String("Test"), ethers.utils.formatBytes32String("Test"))).to.be.revertedWith("Not Owner");
        await expect(hardhatToken.connect(owner).unitConversion(1, 0, ethers.utils.formatBytes32String("Liters"), ethers.utils.formatBytes32String("Test"))).to.be.revertedWith("Can't be 0");

        // Succeeds
        await expect(hardhatToken.connect(owner).unitConversion(1, 20, ethers.utils.formatBytes32String("Liters"), ethers.utils.formatBytes32String("KiloGram"))).to.be.ok;
    });

    it("Does initial tx and then does transformation fetching", async function () {
        // Initializes a token with product "Cashew" and weightValue 100
        await hardhatToken.connect(owner).initialTokenization("Cashew", 100, ethers.utils.formatBytes32String("Liters"),  "10.0000, 4.0000");
        const addr1Balance = await hardhatToken.balanceOf(owner.address);
        expect(addr1Balance).to.equal(1);

        // Initiating commercial tx for token 1 from addr1 to addr2
        // Fiat version
        // We use .connect(signer) to send a transaction from another account
        
        await hardhatToken.connect(owner).initiateCommercialTx(1, 0, addr1.address, {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")}, true);
        
        const addr2Balance = await hardhatToken.balanceOf(addr1.address);
        expect(addr1Balance).to.equal(1);
        expect(addr2Balance).to.equal(0);

        // As Admin Give address2 rights to do minting and approving
        await hardhatToken.connect(owner).addTokenizer(addr1.address);
        await hardhatToken.connect(owner).addProductHandler(addr1.address);
        
        await hardhatToken.connect(addr1).approveTokenization(1, {docHash: [ethers.utils.formatBytes32String("D")], docType: [ethers.utils.formatBytes32String("T")], rootHash: ethers.utils.formatBytes32String("R")});
        // Try to send 1 token from addr1 (0 tokens) to owner (1000000 tokens).
        // `require` will evaluate false and revert the transaction.
        expect(await hardhatToken.ownerOf(1) == addr1.address);

        // Get First TransformationIndex (Default it should be raw)
        expect(await hardhatToken.connect(owner).getTransformationsbyIndex(1,0) == "Raw");
        // underwent 2 transformations so should return 2
        expect(await hardhatToken.connect(owner).getTransformationsLength(1) == 2);
    });

    it("Should succeed service payment", async function () {
        await expect(hardhatToken.connect(owner).servicePayment(1, addr1.address, 10, false, {docHash: [ethers.utils.formatBytes32String("Doc")], docType: [ethers.utils.formatBytes32String("123")], rootHash: ethers.utils.formatBytes32String("ASd")})).to.be.ok;
        await expect(hardhatToken.connect(owner).servicePayment(1, addr1.address, 0, false, {docHash: [ethers.utils.formatBytes32String("Doc")], docType: [ethers.utils.formatBytes32String("123")], rootHash: ethers.utils.formatBytes32String("ASd")})).to.be.revertedWith("Promised to pay in Fiat");
        await expect(hardhatToken.connect(owner).servicePayment(1, addr1.address, 10, false, {docHash: [ethers.utils.formatBytes32String("Doc"), ethers.utils.formatBytes32String("wdas")], docType: [ethers.utils.formatBytes32String("123")], rootHash: ethers.utils.formatBytes32String("ASd")})).to.be.revertedWith("Invalid length");
    });

    it("Should succeed adding information", async function () {
        // Initializes a token with product "Cashew" and weightValue 100
        await hardhatToken.connect(owner).initialTokenization("Cashew", 100, ethers.utils.formatBytes32String("Liters"),  "10.0000, 4.0000");
        const addr1Balance = await hardhatToken.balanceOf(owner.address);
        expect(addr1Balance).to.equal(1);

        // fails
        await expect(hardhatToken.connect(addr1).addInformation([1], {docHash: [ethers.utils.formatBytes32String("Doc")], docType: [ethers.utils.formatBytes32String("123")], rootHash: ethers.utils.formatBytes32String("")}, [ethers.utils.formatBytes32String("123")])).to.be.revertedWith("Restricted to InformationHandlers or admins.");
        await expect(hardhatToken.connect(owner).addInformation([1], {docHash: [ethers.utils.formatBytes32String("Doc")], docType: [ethers.utils.formatBytes32String("123")], rootHash: ethers.utils.formatBytes32String("")}, [ethers.utils.formatBytes32String("123"), ethers.utils.formatBytes32String("123")])).to.be.revertedWith("Invalid Length");
        await expect(hardhatToken.connect(owner).addInformation([1,2], {docHash: [ethers.utils.formatBytes32String("Doc")], docType: [ethers.utils.formatBytes32String("123")], rootHash: ethers.utils.formatBytes32String("")}, [ethers.utils.formatBytes32String("123")])).to.be.revertedWith("Invalid Length");
        await expect(hardhatToken.connect(owner).addInformation([1], {docHash: [ethers.utils.formatBytes32String("Doc"), ethers.utils.formatBytes32String("123")], docType: [ethers.utils.formatBytes32String("123")], rootHash: ethers.utils.formatBytes32String("")}, [ethers.utils.formatBytes32String("123")])).to.be.revertedWith("Invalid length");

        // succeeds
        await expect(hardhatToken.connect(owner).addInformation([1], {docHash: [ethers.utils.formatBytes32String("Doc")], docType: [ethers.utils.formatBytes32String("123")], rootHash: ethers.utils.formatBytes32String("")}, [ethers.utils.formatBytes32String("123")])).to.be.ok;
    });

    it("Should succeed Burning", async function () {
        // Initializes a token with product "Cashew" and weightValue 100
        await hardhatToken.connect(owner).initialTokenization("Cashew", 100, ethers.utils.formatBytes32String("Liters"),  "10.0000, 4.0000");
        const addr1Balance = await hardhatToken.balanceOf(owner.address);
        expect(addr1Balance).to.equal(1);

        // fails
        await expect(hardhatToken.connect(addr1).burn(1, {docHash: [ethers.utils.formatBytes32String("Doc")], docType: [ethers.utils.formatBytes32String("123")], rootHash: ethers.utils.formatBytes32String("")})).to.be.revertedWith("Not Owner");
        await expect(hardhatToken.connect(owner).burn(1, {docHash: [ethers.utils.formatBytes32String("Doc"), ethers.utils.formatBytes32String("123")], docType: [ethers.utils.formatBytes32String("123")], rootHash: ethers.utils.formatBytes32String("")})).to.be.revertedWith("Invalid Length");
        await expect(hardhatToken.connect(owner).burn(1, {docHash: [ethers.utils.formatBytes32String("Doc")], docType: [ethers.utils.formatBytes32String("123"), ethers.utils.formatBytes32String("123")], rootHash: ethers.utils.formatBytes32String("")})).to.be.revertedWith("Invalid Length");

        // succeeds
        await expect(hardhatToken.connect(owner).burn(1, {docHash: [ethers.utils.formatBytes32String("Doc")], docType: [ethers.utils.formatBytes32String("123")], rootHash: ethers.utils.formatBytes32String("")})).to.be.ok;
    });

    it("Shows all functionality", async function () {
        // Initializes a token with product "Cashew" and weightValue 100
        await hardhatToken.connect(owner).initialTokenization("Cashew", 100, ethers.utils.formatBytes32String("Liters"), "10.0000, 4.0000");
        const addr1Balance = await hardhatToken.balanceOf(owner.address);
        expect(addr1Balance).to.equal(1);

        // Initiating commercial tx for token 1 from addr1 to addr2
        // Fiat version
        // We use .connect(signer) to send a transaction from another account
        
        await hardhatToken.connect(owner).initiateCommercialTx(1, 0, addr1.address, {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")}, true);
        
        const addr2Balance = await hardhatToken.balanceOf(addr1.address);
        expect(addr1Balance).to.equal(1);
        expect(addr2Balance).to.equal(0);

        // As Admin Give address2 rights to do minting and approving
        await hardhatToken.connect(owner).addTokenizer(addr1.address);
        await hardhatToken.connect(owner).addProductHandler(addr1.address);
        
        await hardhatToken.connect(addr1).approveTokenization(1, {docHash: [ethers.utils.formatBytes32String("D")], docType: [ethers.utils.formatBytes32String("T")], rootHash: ethers.utils.formatBytes32String("R")});
        // Try to send 1 token from addr1 (0 tokens) to owner (1000000 tokens).
        // `require` will evaluate false and revert the transaction.
        expect(await hardhatToken.ownerOf(1) == addr1.address);

        const tradeCoinOld = await hardhatToken.tradeCoin(1);
        // Add a transformation
        await hardhatToken.connect(addr1).addTransformation(1, 10, "Peeled", {docHash: [ethers.utils.formatBytes32String("TestDocHash2"), ethers.utils.formatBytes32String("Test3")], docType: [ethers.utils.formatBytes32String("TestDocTyp2"), ethers.utils.formatBytes32String("Test3")], rootHash: ethers.utils.formatBytes32String("TestRootHash2")});
        const tradeCoinNew = await hardhatToken.tradeCoin(1);
        // console.log(tradeCoinOld, tradeCoinNew);
        expect(tradeCoinOld).to.not.eql(tradeCoinNew);

        // Change State and Handler
        await hardhatToken.connect(addr1).changeStateAndHandler(1, addr1.address, 3, {docHash: [ethers.utils.formatBytes32String("TestDocHash3")], docType: [ethers.utils.formatBytes32String("TestDocTyp3")], rootHash: ethers.utils.formatBytes32String("TestRootHash3")});
        const tradeCoinNewest = await hardhatToken.tradeCoin(1);
        // console.log(tradeCoinNew, tradeCoinNewest);
        expect(tradeCoinNew).to.not.eql(tradeCoinNewest);

        // Split a product
        await hardhatToken.connect(addr1).splitProduct(1, [30, 30, 30], {docHash: [ethers.utils.formatBytes32String("DocHash")], docType: [ethers.utils.formatBytes32String("docType")], rootHash: ethers.utils.formatBytes32String("RootGasg")});
        const newAddr1BalAfterSplit = await hardhatToken.balanceOf(addr1.address);
        expect(newAddr1BalAfterSplit).to.equal(3);

        // Batch a product
        await hardhatToken.connect(addr1).batchProduct([2, 3, 4], {docHash: [ethers.utils.formatBytes32String("docHash")], docType: [ethers.utils.formatBytes32String("docType")], rootHash: ethers.utils.formatBytes32String("rootHash")});
        const newAddr1BalAfterBatch = await hardhatToken.balanceOf(addr1.address);
        expect(newAddr1BalAfterBatch).to.equal(1);

        // List item on sale
        await hardhatToken.connect(addr1).initiateCommercialTx(5, 0, addr2.address, {docHash: [ethers.utils.formatBytes32String("TestDocHash2")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")}, true);
        await hardhatToken.connect(addr2).finishCommercialTx(5, {
            docHash: [ethers.utils.formatBytes32String("docHash")], 
            docType: [ethers.utils.formatBytes32String("docType")], 
            rootHash: ethers.utils.formatBytes32String("rootHash")
        });
        // As Admin Give address2 rights to do approving
        const addr2Bal = await hardhatToken.balanceOf(addr2.address);
        expect(addr2Bal).to.equal(1);

        // Add Information as information Handler
        await hardhatToken.connect(owner).addInformationHandler(addr2.address);

        const tokenInfoBe4 = await hardhatToken.tradeCoin(5);
        // Set new rootHash and doc as information Handler
        await hardhatToken.connect(addr2).addInformation([5], {docHash: [ethers.utils.formatBytes32String("PeePee")], docType: [ethers.utils.formatBytes32String("PooPoo")], rootHash: ethers.utils.formatBytes32String("")}, [ethers.utils.formatBytes32String("PeePoo")]);
        const tokenInfoAfter = await hardhatToken.tradeCoin(5);
        expect(tokenInfoBe4).to.not.eql(tokenInfoAfter);

        // Burn a token
        await hardhatToken.connect(addr2).burn(5, {docHash: [ethers.utils.formatBytes32String("D")], docType: [ethers.utils.formatBytes32String("T")], rootHash: ethers.utils.formatBytes32String("R")});
        const updatedBalance = await hardhatToken.balanceOf(addr2.address);

        expect(updatedBalance).to.equal(0);
    });

    it("Adds address to role and then removes", async function () {
        // Try and add roles as a non owner address
        await expect(hardhatToken.connect(owner).addInformationHandler(addr1.address)).to.be.ok;
        await expect(hardhatToken.connect(owner).addProductHandler(addr1.address)).to.be.ok;
        await expect(hardhatToken.connect(owner).addTokenizer(addr1.address)).to.be.ok;
        await expect(hardhatToken.connect(owner).addAdmin(addr1.address)).to.be.ok;
        // Remove roles from addresses
        await expect(hardhatToken.connect(owner).removeInformationHandler(addr1.address)).to.be.ok;
        await expect(hardhatToken.connect(owner).removeProductHandler(addr1.address)).to.be.ok;
        await expect(hardhatToken.connect(owner).removeTokenizer(addr1.address)).to.be.ok;
        await expect(hardhatToken.connect(owner).removeAdmin(addr1.address)).to.be.ok;
    });
    
    it("Should fail to assign rights", async function () {
        // Try and add roles as a non owner address
        await expect(hardhatToken.connect(addr1).addAdmin(addr1.address)).to.be.reverted
        await expect(hardhatToken.connect(addr1).addInformationHandler(addr1.address)).to.be.reverted;
        await expect(hardhatToken.connect(addr1).addProductHandler(addr1.address)).to.be.reverted;
        await expect(hardhatToken.connect(addr1).addTokenizer(addr1.address)).to.be.reverted;
    });
    
    it("Should fail to remove rights", async function () {
        // Try and add roles as a non owner address
        await expect(hardhatToken.connect(addr1).removeAdmin(addr1.address)).to.be.reverted
        await expect(hardhatToken.connect(addr1).removeInformationHandler(addr1.address)).to.be.reverted;
        await expect(hardhatToken.connect(addr1).removeProductHandler(addr1.address)).to.be.reverted;
        await expect(hardhatToken.connect(addr1).removeTokenizer(addr1.address)).to.be.reverted;
    });
});