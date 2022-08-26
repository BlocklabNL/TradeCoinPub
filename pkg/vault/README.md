# Vault
Smart contract to pay for usage of the asset vault

This smart contract implements a payment mechanism to charge users of the vault
in the native ETH token of the blockchain. Two payment methods are supported: 
subscription and debit. 

This repository includes the smart contract as part of an npm package as well 
as the go bindings to use this smart contract in golang projects.

## Install

We make use of node js and the truffle framework for smart contract
development. Also we use [`lerna`](https://github.com/lerna/lerna), a tool to
manage node.js monorepos. To install the dependencies to build and test the
contracts run:

```sh
# to install lerna run `yarn global install lerna` or `npm i -g lerna`
$ lerna boostrap
```

## Usage

The run the tests on the smart contracts, run:

```sh
$ yarn test
```

Build the golang bindings, this needs to be rebuilt whenever the interface of
the smart contracts change to keep the go bindings in a compatible state.

```sh
$ yarn build:go
```

Remove build artifacts and start from a clean state. 

```sh
$ yarn clean
```

