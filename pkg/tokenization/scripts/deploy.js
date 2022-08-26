// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const TradeCoinContract = await hre.ethers.getContractFactory("TradeCoinContract");
  const tradeCoinContract = await TradeCoinContract.deploy("ProductNFT", "PNFT");

  await tradeCoinContract.deployed();

  console.log("TradeCoinContract deployed to:", tradeCoinContract.address);

  // Deploy second contract aka the composability
  const TradeCoinCompositionContract = await hre.ethers.getContractFactory("TradeCoinCompositionContract");
  const tradeCoinCompositionContract = await TradeCoinCompositionContract.deploy("CompositionProductNFT", "CPNFT", tradeCoinContract.address);

  await tradeCoinCompositionContract.deployed();

  console.log("TradeCoinComposition deployed to:", tradeCoinCompositionContract.address);

  const TradeCoinCompositionSales = await hre.ethers.getContractFactory("TradeCoinCompositionSales");
  const tradeCoinCompositionSales = await TradeCoinCompositionSales.deploy(tradeCoinCompositionContract.address);

  console.log("TradeCoinCompositionSales deployed to:", tradeCoinCompositionSales.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
