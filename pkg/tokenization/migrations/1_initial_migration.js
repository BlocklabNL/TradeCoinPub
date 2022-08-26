const TradeCoinContract = artifacts.require("TradeCoinContract");
const TradeCoinCompositionContract = artifacts.require("TradeCoinCompositionContract");
const TradeCoinCompositionSales = artifacts.require("TradeCoinCompositionSales");

module.exports = async function(deployer) {
  await deployer.deploy(TradeCoinContract, "ProductNFT", "PNFT").then(async () => {
    await deployer.deploy(TradeCoinCompositionContract, "CompositionProductNFT", "CPNFT", TradeCoinContract.address).then(async ()=>{
      await deployer.deploy(TradeCoinCompositionSales, TradeCoinCompositionContract.address)
      console.log("Deployed TradeCoinContract on: ", TradeCoinContract.address)
      console.log("Deployed TradeCoinCompositionContract on: ", TradeCoinCompositionContract.address)
      console.log("Deployed TradeCoinCompositionSales on: ", TradeCoinCompositionSales.address)
    });
  });
};