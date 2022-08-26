require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-solhint");
require("hardhat-gas-reporter");
require("solidity-coverage");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();
const coinKey = fs.readFileSync(".coinmarketcapSecret").toString().trim();
const apiKey = fs.readFileSync(".etherscanSecret").toString().trim();

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  paths: {
    artifacts: "./build/artifacts",
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    rinkeby: {
      url: "https://node.ebl.dev/",
      accounts: {
        mnemonic: mnemonic
      },
    },
    hardhat: {
      chainId: 1337,
    },
  },
  etherscan: {
    apiKey: apiKey,
  },
  gasReporter: {
    enabled: true,
    currency: "EUR",
    // gasPriceApi: "",
    gasPrice: 33,
    coinmarketcap: coinKey,
  },
};
