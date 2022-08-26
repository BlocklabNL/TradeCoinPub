# Notary
Smart contract to notarise documents for proof of existence

The notary smart contract registers documents with their hash, thereby proving
their existence at a given point in time (block in the ethereum blockchain). By
using the hash of a document, the actual content is not visible to the public 
but the integrity of the document can still be proven. In general, the origin 
of the document is the sender, however the notary also allows for on-behalf
registration in which the signer of the notarisation request is different from
the sender, proving the intent of the registration of the signer.

This repository includes the smart contract as part of an npm package as well 
as the go bindings to use this smart contract in golang projects.

## Install

We make use of node js and the truffle framework for smart contract
development. Also we use [`lerna`](https://github.com/lerna/lerna), a tool to
manage node.js monorepos. To install the dependencies to build and test the contracts run:

```sh
# to install lerna run `yarn global install lerna` or `npm i -g lerna`
$ lerna bootstrap
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

