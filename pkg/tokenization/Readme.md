# Tokenization
Smart contract to Tokenize productNFT's for proof of existence

The tokenization smart contract registers products with their weight, commodity, state,
transformations and rootHash to the valid documents.

## Install

We make use of node js and the truffle framework for smart contract
development. Also we use [`lerna`](https://github.com/lerna/lerna), a tool to
manage node.js monorepos. To install the dependencies to build and test the contracts run:

```sh
# to install lerna run `yarn global install lerna` or `npm i -g lerna`
$ lerna bootstrap
```

## Usage
To run the tests on the smart contracts, run:

```sh
$ yarn test
```

Remove build artifacts and start from a clean state. 

```sh
$ yarn clean
```

## Hardhat deployment (Hardhat Main development compiler)
When deploying with Hardhat is important to note that the developer needs to
edit the import path:

```solidity
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

// Into

import "@openzeppelin/contracts/utils/Counters.sol";
```

Then run the command to deploy:
```
npx hardhat run --network rinkeby scripts/deploy.js
```

## Smart Contract Verification (Hardhat Main development compiler)
To verify the smart contract run (This also needs the `.etherscanSecret`, `.secret` and `.coinmarketcapSecret` file):

```sh
npx hardhat verify <Smart contract address> --network rinkeby "Parameter 1(NFT Name)" "Parameter 2(NFT symbol)"
```

Example ProductNFT
```sh
npx hardhat verify 0x3Eb6EBB8c0511dC4B705e51bd2a7176B81308fdF --network rinkeby "ProductNFT" "PNFT"
```

Example CompositionProductNFT
```sh
npx hardhat verify 0x1000095E8FC85d54F833694C6548fbC6a1c5611e --network rinkeby "CompositionProductNFT" "CPNFT" 0x3Eb6EBB8c0511dC4B705e51bd2a7176B81308fdF
```

Example CompositionSalesContract
```sh
npx hardhat verify 0xB4B25f90f9aD810190403441153DFD5cc95232D5 --network rinkeby 0x1000095E8FC85d54F833694C6548fbC6a1c5611e
```

# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

After compiling the smart contract, copy the `build/artifacts/contracts/TradeCoinContract/TradeCoinContract.json` into your front-end to connect to ethers.js. When using web3 you have to export.default the json structure.

## Truffle deployment
To deploy the smart contract on rinkeby you have to create a `.secret` file.
Place this in the root of your smart contracts folder, afterwards run:

```sh
truffle migrate --network rinkeby
```

## Smart contract verification (Truffle)
To verify the smart contract you will need a `.etherscanSecret` file (Etherscan ApiKey) and run:

```sh
truffle run verify TradeCoinContract --network rinkeby
```


## Build go files/abigen bindings
For the external services written in Golang you will need a go version of the smart contract unlike ethers.js.
For the TradeCoin project we have three smart contracts so each will need their own Go Bindings.
For each there is there own command:

### TradeCoin Go Bindings
```
yarn build:tradeCoinGo
```

### TradeCoinComposition Go Bindings
```
yarn build:tradeCoinCompositionGo
```

### TradeCoinCompositionSales Go Bindings
```
yarn build:tradeCoinCompositionSalesGo
```

### Common error
Because of something in Truffle and the type of naming chosen for the smart contract there is a possibility that a filePath could not be found when running the abigen. Simply rename the file of the error to the correct name.
I.E. in `./pkg/tokenization/tradeCoinComposition.go` or `./pkg/tokenization/tradeCoinCompositionSales.go` change the package name from `tradeCoinComposition` or `tradeCoinCompositionSales` respectively to `tradeCoin`