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
    TokenComposition = await ethers.getContractFactory("TradeCoinCompositionContract");
    TokenCompositionSales = await ethers.getContractFactory("TradeCoinCompositionSales");

    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // for it to be deployed(), which happens once its transaction has been
    // mined.
    hardhatToken = await Token.deploy("ProductNFT", "PNFT");
    hardhatTokenComposition = await TokenComposition.deploy("ProductNFTComposition", "PNFTC", hardhatToken.address);
    hardhatTokenCompositionSales = await TokenCompositionSales.deploy(hardhatTokenComposition.address);

    // make addr1 admin
    await expect(hardhatToken.connect(owner).addAdmin(addr1.address)).to.be.ok;

    // Initialize token
    await hardhatToken.connect(owner).initialTokenization("Cashew", 100, ethers.utils.formatBytes32String("Liters"), "10.0000, 4.0000");
    await hardhatToken.connect(owner).initialTokenization("Cashew", 100, ethers.utils.formatBytes32String("Liters"), "10.0000, 4.0000");
    const addr1Balance = await hardhatToken.balanceOf(owner.address);
    expect(addr1Balance).to.equal(2);

    // Should initialize commercial Tx
    await hardhatToken.connect(owner).initiateCommercialTx(1, 0, addr1.address, {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")}, true);
    expect(await hardhatToken.addressOfNewOwner(1) == (addr1.address));
    await hardhatToken.connect(owner).initiateCommercialTx(2, 0, addr1.address, {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")}, true);
    expect(await hardhatToken.addressOfNewOwner(2) == (addr1.address));
    
    // second acc approve tokenization
    await expect(hardhatToken.connect(addr1).approveTokenization(1, {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")})).to.be.ok;
    await expect(hardhatToken.connect(addr1).approveTokenization(2, {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")})).to.be.ok;

    // Do Mass approval so we can use token 1 and 2 for Composition
    await expect(hardhatToken.connect(addr1).massApproval([1,2], hardhatTokenComposition.address)).to.be.ok;

    ////////////////////////////////////////
    // Composition stuff
    // make addr1 admin
    await expect(hardhatTokenComposition.connect(owner).addAdmin(addr1.address)).to.be.ok;
    // CreateComposition
    await expect(hardhatTokenComposition.connect(addr1).createComposition("Comp", [1,2], {docHash: [ethers.utils.formatBytes32String("TestDocHash")], docType: [ethers.utils.formatBytes32String("TestDocType")], rootHash: ethers.utils.formatBytes32String("TestRootHash")}))

    // Do Mass approval so we can use token 1 for CompositionSales
    await expect(hardhatTokenComposition.connect(addr1).massApproval([1], hardhatTokenCompositionSales.address)).to.be.ok;
});

describe("Deployment", function () {
    it("Do Successfull Sales stuff for composition", async function () {
        // initiate commercialtx
        await expect(hardhatTokenCompositionSales.connect(addr1).initiateCommercialTx(
            1,
            owner.address,
            0,
            {
                docHash: [ethers.utils.formatBytes32String("TestDocHash")],
                docType: [ethers.utils.formatBytes32String("TestDocType")],
                rootHash: ethers.utils.formatBytes32String("TestRootHash")
            },
            true
        )).to.be.ok;

        // finish commercialtx
        await expect(hardhatTokenCompositionSales.connect(owner).finishCommercialTx(
            1,
            {
                docHash: [ethers.utils.formatBytes32String("TestDocHash")],
                docType: [ethers.utils.formatBytes32String("TestDocType")],
                rootHash: ethers.utils.formatBytes32String("TestRootHash")
            }
        )).to.be.ok;

        expect(await hardhatTokenComposition.ownerOf(1) == owner.address)
    });

    it("Cancel Sales stuff for composition", async function () {
        // initiate commercialtx
        await expect(hardhatTokenCompositionSales.connect(addr1).initiateCommercialTx(
            1,
            owner.address,
            0,
            {
                docHash: [ethers.utils.formatBytes32String("TestDocHash")],
                docType: [ethers.utils.formatBytes32String("TestDocType")],
                rootHash: ethers.utils.formatBytes32String("TestRootHash")
            },
            true
        )).to.be.ok;
        expect(await hardhatTokenCompositionSales.tradeCoinTokenBalance() === 1);
        // finish commercialtx
        await expect(hardhatTokenCompositionSales.connect(addr1).reverseSale(1)).to.be.ok;
        expect(await hardhatTokenCompositionSales.tradeCoinTokenBalance() === 0);
    });

    it("Do ServicePayment", async function () {
        await expect(hardhatTokenCompositionSales.connect(addr1).servicePayment(
            1,
            owner.address,
            0,
            false,
            {
                docHash: [ethers.utils.formatBytes32String("TestDocHash")],
                docType: [ethers.utils.formatBytes32String("TestDocType")],
                rootHash: ethers.utils.formatBytes32String("TestRootHash")
            }
        )).to.be.revertedWith("Promised to pay in Fiat");
        
        await expect(hardhatTokenCompositionSales.connect(addr1).servicePayment(
            1,
            owner.address,
            10,
            false,
            {
                docHash: [ethers.utils.formatBytes32String("TestDocHash")],
                docType: [ethers.utils.formatBytes32String("TestDocType")],
                rootHash: ethers.utils.formatBytes32String("TestRootHash")
            }
        )).to.be.ok;
        
        await expect(hardhatTokenCompositionSales.connect(addr1).servicePayment(
            1,
            owner.address,
            0,
            true,
            {
                docHash: [ethers.utils.formatBytes32String("TestDocHash")],
                docType: [ethers.utils.formatBytes32String("TestDocType")],
                rootHash: ethers.utils.formatBytes32String("TestRootHash")
            }
        )).to.be.ok;
    });
});