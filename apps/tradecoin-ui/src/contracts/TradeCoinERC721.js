exports.default = (address) => ({
  "_format": "hh-sol-artifact-1",
  "contractName": "TradeCoinContract",
  "sourceName": "contracts/TradeCoinContract.sol",
  "abi": [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_symbol",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "functionCaller",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "docHashIndexed",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "bytes32[]",
          "name": "docHash",
          "type": "bytes32[]"
        },
        {
          "indexed": false,
          "internalType": "bytes32[]",
          "name": "docType",
          "type": "bytes32[]"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "rootHash",
          "type": "bytes32"
        }
      ],
      "name": "AddInformationEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "functionCaller",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "docHashIndexed",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "bytes32[]",
          "name": "docHash",
          "type": "bytes32[]"
        },
        {
          "indexed": false,
          "internalType": "bytes32[]",
          "name": "docType",
          "type": "bytes32[]"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "rootHash",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "weightLoss",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "transformationCode",
          "type": "string"
        }
      ],
      "name": "AddTransformationEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "approved",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "functionCaller",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bytes32[]",
          "name": "docHash",
          "type": "bytes32[]"
        },
        {
          "indexed": false,
          "internalType": "bytes32[]",
          "name": "docType",
          "type": "bytes32[]"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "rootHash",
          "type": "bytes32"
        }
      ],
      "name": "ApproveTokenizationEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "functionCaller",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "notIndexedTokenIds",
          "type": "uint256[]"
        }
      ],
      "name": "BatchProductEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "functionCaller",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "docHashIndexed",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "bytes32[]",
          "name": "docHash",
          "type": "bytes32[]"
        },
        {
          "indexed": false,
          "internalType": "bytes32[]",
          "name": "docType",
          "type": "bytes32[]"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "rootHash",
          "type": "bytes32"
        }
      ],
      "name": "BurnEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "functionCaller",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "docHashIndexed",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "bytes32[]",
          "name": "docHash",
          "type": "bytes32[]"
        },
        {
          "indexed": false,
          "internalType": "bytes32[]",
          "name": "docType",
          "type": "bytes32[]"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "rootHash",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "enum TradeCoinContract.State",
          "name": "newState",
          "type": "uint8"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "newCurrentHandler",
          "type": "address"
        }
      ],
      "name": "ChangeStateAndHandlerEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "functionCaller",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bytes32[]",
          "name": "dochash",
          "type": "bytes32[]"
        },
        {
          "indexed": false,
          "internalType": "bytes32[]",
          "name": "docType",
          "type": "bytes32[]"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "rootHash",
          "type": "bytes32"
        }
      ],
      "name": "FinishCommercialTxEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "functionCaller",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "geoLocation",
          "type": "string"
        }
      ],
      "name": "InitialTokenizationEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "functionCaller",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bytes32[]",
          "name": "docHash",
          "type": "bytes32[]"
        },
        {
          "indexed": false,
          "internalType": "bytes32[]",
          "name": "docType",
          "type": "bytes32[]"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "rootHash",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "payInFiat",
          "type": "bool"
        }
      ],
      "name": "InitiateCommercialTxEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "functionCaller",
          "type": "address"
        }
      ],
      "name": "MintAfterSplitOrBatchEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "previousAdminRole",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "newAdminRole",
          "type": "bytes32"
        }
      ],
      "name": "RoleAdminChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "RoleGranted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "RoleRevoked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "indexedDocHash",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "bytes32[]",
          "name": "docHash",
          "type": "bytes32[]"
        },
        {
          "indexed": false,
          "internalType": "bytes32[]",
          "name": "docType",
          "type": "bytes32[]"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "rootHash",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "paymentInWei",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "payInFiat",
          "type": "bool"
        }
      ],
      "name": "ServicePaymentEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "functionCaller",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "notIndexedTokenIds",
          "type": "uint256[]"
        }
      ],
      "name": "SplitProductEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "previousAmountUnit",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "newAmountUnit",
          "type": "bytes32"
        }
      ],
      "name": "UnitConversionEvent",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "DEFAULT_ADMIN_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "INFORMATION_HANDLER_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "PRODUCT_HANDLER_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "TOKENIZER_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "addAdmin",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "_tokenIds",
          "type": "uint256[]"
        },
        {
          "components": [
            {
              "internalType": "bytes32[]",
              "name": "docHash",
              "type": "bytes32[]"
            },
            {
              "internalType": "bytes32[]",
              "name": "docType",
              "type": "bytes32[]"
            },
            {
              "internalType": "bytes32",
              "name": "rootHash",
              "type": "bytes32"
            }
          ],
          "internalType": "struct TradeCoinContract.Documents",
          "name": "_documents",
          "type": "tuple"
        },
        {
          "internalType": "bytes32[]",
          "name": "_rootHash",
          "type": "bytes32[]"
        }
      ],
      "name": "addInformation",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "addInformationHandler",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "addProductHandler",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "addTokenizer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_amountLoss",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_transformationCode",
          "type": "string"
        },
        {
          "components": [
            {
              "internalType": "bytes32[]",
              "name": "docHash",
              "type": "bytes32[]"
            },
            {
              "internalType": "bytes32[]",
              "name": "docType",
              "type": "bytes32[]"
            },
            {
              "internalType": "bytes32",
              "name": "rootHash",
              "type": "bytes32"
            }
          ],
          "internalType": "struct TradeCoinContract.Documents",
          "name": "_documents",
          "type": "tuple"
        }
      ],
      "name": "addTransformation",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "addressOfNewOwner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        },
        {
          "components": [
            {
              "internalType": "bytes32[]",
              "name": "docHash",
              "type": "bytes32[]"
            },
            {
              "internalType": "bytes32[]",
              "name": "docType",
              "type": "bytes32[]"
            },
            {
              "internalType": "bytes32",
              "name": "rootHash",
              "type": "bytes32"
            }
          ],
          "internalType": "struct TradeCoinContract.Documents",
          "name": "_documents",
          "type": "tuple"
        }
      ],
      "name": "approveTokenization",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "_tokenIds",
          "type": "uint256[]"
        },
        {
          "components": [
            {
              "internalType": "bytes32[]",
              "name": "docHash",
              "type": "bytes32[]"
            },
            {
              "internalType": "bytes32[]",
              "name": "docType",
              "type": "bytes32[]"
            },
            {
              "internalType": "bytes32",
              "name": "rootHash",
              "type": "bytes32"
            }
          ],
          "internalType": "struct TradeCoinContract.Documents",
          "name": "_documents",
          "type": "tuple"
        }
      ],
      "name": "batchProduct",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        },
        {
          "components": [
            {
              "internalType": "bytes32[]",
              "name": "docHash",
              "type": "bytes32[]"
            },
            {
              "internalType": "bytes32[]",
              "name": "docType",
              "type": "bytes32[]"
            },
            {
              "internalType": "bytes32",
              "name": "rootHash",
              "type": "bytes32"
            }
          ],
          "internalType": "struct TradeCoinContract.Documents",
          "name": "_documents",
          "type": "tuple"
        }
      ],
      "name": "burn",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_newCurrentHandler",
          "type": "address"
        },
        {
          "internalType": "enum TradeCoinContract.State",
          "name": "_newState",
          "type": "uint8"
        },
        {
          "components": [
            {
              "internalType": "bytes32[]",
              "name": "docHash",
              "type": "bytes32[]"
            },
            {
              "internalType": "bytes32[]",
              "name": "docType",
              "type": "bytes32[]"
            },
            {
              "internalType": "bytes32",
              "name": "rootHash",
              "type": "bytes32"
            }
          ],
          "internalType": "struct TradeCoinContract.Documents",
          "name": "_documents",
          "type": "tuple"
        }
      ],
      "name": "changeStateAndHandler",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "deployedOn",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        },
        {
          "components": [
            {
              "internalType": "bytes32[]",
              "name": "docHash",
              "type": "bytes32[]"
            },
            {
              "internalType": "bytes32[]",
              "name": "docType",
              "type": "bytes32[]"
            },
            {
              "internalType": "bytes32",
              "name": "rootHash",
              "type": "bytes32"
            }
          ],
          "internalType": "struct TradeCoinContract.Documents",
          "name": "_documents",
          "type": "tuple"
        }
      ],
      "name": "finishCommercialTx",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getApproved",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        }
      ],
      "name": "getRoleAdmin",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "getTransformationsLength",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_transformationIndex",
          "type": "uint256"
        }
      ],
      "name": "getTransformationsbyIndex",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "grantRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "hasRole",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_product",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        },
        {
          "internalType": "bytes32",
          "name": "_unit",
          "type": "bytes32"
        },
        {
          "internalType": "string",
          "name": "_geoLocation",
          "type": "string"
        }
      ],
      "name": "initialTokenization",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_paymentInWei",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_newOwner",
          "type": "address"
        },
        {
          "components": [
            {
              "internalType": "bytes32[]",
              "name": "docHash",
              "type": "bytes32[]"
            },
            {
              "internalType": "bytes32[]",
              "name": "docType",
              "type": "bytes32[]"
            },
            {
              "internalType": "bytes32",
              "name": "rootHash",
              "type": "bytes32"
            }
          ],
          "internalType": "struct TradeCoinContract.Documents",
          "name": "_documents",
          "type": "tuple"
        },
        {
          "internalType": "bool",
          "name": "_payInFiat",
          "type": "bool"
        }
      ],
      "name": "initiateCommercialTx",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "isAdmin",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "isInformationHandlerOrAdmin",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "isProductHandlerOrAdmin",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "isTokenizerOrAdmin",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "_tokenIds",
          "type": "uint256[]"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "massApproval",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "paymentInFiat",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "priceForOwnership",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "removeAdmin",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "removeInformationHandler",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "removeProductHandler",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "removeTokenizer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "renounceRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "revokeRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_receiver",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_paymentInWei",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "_payInFiat",
          "type": "bool"
        },
        {
          "components": [
            {
              "internalType": "bytes32[]",
              "name": "docHash",
              "type": "bytes32[]"
            },
            {
              "internalType": "bytes32[]",
              "name": "docType",
              "type": "bytes32[]"
            },
            {
              "internalType": "bytes32",
              "name": "rootHash",
              "type": "bytes32"
            }
          ],
          "internalType": "struct TradeCoinContract.Documents",
          "name": "_documents",
          "type": "tuple"
        }
      ],
      "name": "servicePayment",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        },
        {
          "internalType": "uint256[]",
          "name": "partitions",
          "type": "uint256[]"
        },
        {
          "components": [
            {
              "internalType": "bytes32[]",
              "name": "docHash",
              "type": "bytes32[]"
            },
            {
              "internalType": "bytes32[]",
              "name": "docType",
              "type": "bytes32[]"
            },
            {
              "internalType": "bytes32",
              "name": "rootHash",
              "type": "bytes32"
            }
          ],
          "internalType": "struct TradeCoinContract.Documents",
          "name": "_documents",
          "type": "tuple"
        }
      ],
      "name": "splitProduct",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "tradeCoin",
      "outputs": [
        {
          "internalType": "string",
          "name": "product",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "bytes32",
          "name": "unit",
          "type": "bytes32"
        },
        {
          "internalType": "enum TradeCoinContract.State",
          "name": "state",
          "type": "uint8"
        },
        {
          "internalType": "address",
          "name": "currentHandler",
          "type": "address"
        },
        {
          "internalType": "bytes32",
          "name": "rootHash",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        },
        {
          "internalType": "bytes32",
          "name": "_previousAmountUnit",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "_newAmountUnit",
          "type": "bytes32"
        }
      ],
      "name": "unitConversion",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x60806040523480156200001157600080fd5b5060405162005f6338038062005f63833981016040819052620000349162000368565b33828281600090805190602001906200004f9291906200020f565b508051620000659060019060208401906200020f565b50620000779150600090508262000110565b620000a47fe70d28ebd9d7d9a3dd77d46ae2481f301c80806f395b08de31d8e095b1c46cee600062000120565b620000d17f7d516c105bee30cf3879df4b9a7cf2e17d81aa2e2cd673a2f488a1d6fadd45ec600062000120565b620000fe7f8da7d70244203c30977cc84bc73c56df770db659eae5eae031338bf752ed6b18600062000120565b50506001600755504360095562000422565b6200011c82826200016b565b5050565b600082815260066020526040808220600101805490849055905190918391839186917fbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff9190a4505050565b60008281526006602090815260408083206001600160a01b038516845290915290205460ff166200011c5760008281526006602090815260408083206001600160a01b03851684529091529020805460ff19166001179055620001cb3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b8280546200021d90620003cf565b90600052602060002090601f0160209004810192826200024157600085556200028c565b82601f106200025c57805160ff19168380011785556200028c565b828001600101855582156200028c579182015b828111156200028c5782518255916020019190600101906200026f565b506200029a9291506200029e565b5090565b5b808211156200029a57600081556001016200029f565b600082601f830112620002c6578081fd5b81516001600160401b0380821115620002e357620002e36200040c565b604051601f8301601f19908116603f011681019082821181831017156200030e576200030e6200040c565b816040528381526020925086838588010111156200032a578485fd5b8491505b838210156200034d57858201830151818301840152908201906200032e565b838211156200035e57848385830101525b9695505050505050565b600080604083850312156200037b578182fd5b82516001600160401b038082111562000392578384fd5b620003a086838701620002b5565b93506020850151915080821115620003b6578283fd5b50620003c585828601620002b5565b9150509250929050565b600181811c90821680620003e457607f821691505b602082108114156200040657634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b615b3180620004326000396000f3fe6080604052600436106103355760003560e01c80636f589053116101ab578063a02de811116100f7578063cf2a6a0f11610095578063d58e36e01161006f578063d58e36e0146109d9578063e985e9c5146109fb578063e9e9a6b314610a44578063f1ead07114610a6657600080fd5b8063cf2a6a0f14610986578063d52c9a4014610999578063d547741f146109b957600080fd5b8063aed2025e116100d1578063aed2025e14610906578063b88d4fde14610926578063c29278f414610946578063c87b56dd1461096657600080fd5b8063a02de8111461089f578063a217fddf146108d1578063a22cb465146108e657600080fd5b80637aac74cc1161016457806395d89b411161013e57806395d89b411461082a57806397d0a85a1461083f5780639825e98d1461085f5780639d4ba5ff1461087f57600080fd5b80637aac74cc146107ca57806385fb92ac146107ea57806391d148541461080a57600080fd5b80636f58905314610704578063704802751461073457806370a082311461075457806371fdc7ac146107745780637314b0f71461079457806373fc8420146107b457600080fd5b80632f2ff15d116102855780634b7d4fef116102235780636352211e116101fd5780636352211e1461066b5780636392130a1461068b578063682e67e81461069e57806368728f92146106ce57600080fd5b80634b7d4fef146105fe578063542c7c0a1461061e57806358d6dd8f1461064b57600080fd5b806342842e0e1161025f57806342842e0e1461057e5780634406257a1461059e578063462be15d146105be57806349b6c21d146105de57600080fd5b80632f2ff15d1461051e57806336568abe1461053e5780633a962a191461055e57600080fd5b80631779a3b5116102f2578063248a9ca3116102cc578063248a9ca31461048e57806324d7806c146104be57806327315cd6146104de5780632dd87e0f146104fe57600080fd5b80631779a3b51461043b5780631785f53c1461044e57806323b872dd1461046e57600080fd5b806301ffc9a71461033a5780630605a3341461036f57806306fdde031461039f578063081812fc146103c1578063095ea7b3146103f957806315fc35ad1461041b575b600080fd5b34801561034657600080fd5b5061035a610355366004614f4b565b610a86565b60405190151581526020015b60405180910390f35b34801561037b57600080fd5b50610391600080516020615a9c83398151915281565b604051908152602001610366565b3480156103ab57600080fd5b506103b4610a97565b60405161036691906155d0565b3480156103cd57600080fd5b506103e16103dc366004614f11565b610b29565b6040516001600160a01b039091168152602001610366565b34801561040557600080fd5b50610419610414366004614dc3565b610bc3565b005b34801561042757600080fd5b50610419610436366004614c9b565b610cd9565b610419610449366004615116565b610d19565b34801561045a57600080fd5b50610419610469366004614c9b565b610fb9565b34801561047a57600080fd5b50610419610489366004614ce7565b610fe9565b34801561049a57600080fd5b506103916104a9366004614f11565b60009081526006602052604090206001015490565b3480156104ca57600080fd5b5061035a6104d9366004614c9b565b61101a565b3480156104ea57600080fd5b506104196104f9366004615171565b611026565b34801561050a57600080fd5b506103b4610519366004615150565b61122d565b34801561052a57600080fd5b50610419610539366004614f29565b6112fd565b34801561054a57600080fd5b50610419610559366004614f29565b611323565b34801561056a57600080fd5b50610419610579366004614dec565b6113a1565b34801561058a57600080fd5b50610419610599366004614ce7565b611480565b3480156105aa57600080fd5b506104196105b9366004615116565b61149b565b3480156105ca57600080fd5b506104196105d9366004615211565b6115f4565b3480156105ea57600080fd5b506104196105f93660046150b7565b611854565b34801561060a57600080fd5b50610419610619366004614fea565b611e3a565b34801561062a57600080fd5b50610391610639366004614f11565b600d6020526000908152604090205481565b34801561065757600080fd5b50610419610666366004614c9b565b612043565b34801561067757600080fd5b506103e1610686366004614f11565b612080565b610419610699366004615048565b6120f7565b3480156106aa57600080fd5b5061035a6106b9366004614f11565b600e6020526000908152604090205460ff1681565b3480156106da57600080fd5b506103e16106e9366004614f11565b600c602052600090815260409020546001600160a01b031681565b34801561071057600080fd5b5061039161071f366004614f11565b6000908152600a602052604090206004015490565b34801561074057600080fd5b5061041961074f366004614c9b565b612282565b34801561076057600080fd5b5061039161076f366004614c9b565b6122b2565b34801561078057600080fd5b5061035a61078f366004614c9b565b612339565b3480156107a057600080fd5b506104196107af366004614c9b565b612364565b3480156107c057600080fd5b5061039160095481565b3480156107d657600080fd5b506104196107e5366004614e8e565b6123a1565b3480156107f657600080fd5b50610419610805366004614c9b565b6125c8565b34801561081657600080fd5b5061035a610825366004614f29565b612605565b34801561083657600080fd5b506103b4612630565b34801561084b57600080fd5b5061035a61085a366004614c9b565b61263f565b34801561086b57600080fd5b5061041961087a366004614e2e565b612659565b34801561088b57600080fd5b5061041961089a366004614c9b565b613120565b3480156108ab57600080fd5b506108bf6108ba366004614f11565b61315d565b604051610366969594939291906155e3565b3480156108dd57600080fd5b50610391600081565b3480156108f257600080fd5b50610419610901366004614d9a565b613228565b34801561091257600080fd5b50610419610921366004614f83565b613233565b34801561093257600080fd5b50610419610941366004614d22565b6134c6565b34801561095257600080fd5b506104196109613660046151e0565b6134f8565b34801561097257600080fd5b506103b4610981366004614f11565b613658565b610419610994366004615116565b613765565b3480156109a557600080fd5b5061035a6109b4366004614c9b565b613a91565b3480156109c557600080fd5b506104196109d4366004614f29565b613aab565b3480156109e557600080fd5b50610391600080516020615adc83398151915281565b348015610a0757600080fd5b5061035a610a16366004614cb5565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b348015610a5057600080fd5b50610391600080516020615abc83398151915281565b348015610a7257600080fd5b50610419610a81366004614c9b565b613ad1565b6000610a9182613b0e565b92915050565b606060008054610aa6906159d9565b80601f0160208091040260200160405190810160405280929190818152602001828054610ad2906159d9565b8015610b1f5780601f10610af457610100808354040283529160200191610b1f565b820191906000526020600020905b815481529060010190602001808311610b0257829003601f168201915b5050505050905090565b6000818152600260205260408120546001600160a01b0316610ba75760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600460205260409020546001600160a01b031690565b6000610bce82612080565b9050806001600160a01b0316836001600160a01b03161415610c3c5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b6064820152608401610b9e565b336001600160a01b0382161480610c585750610c588133610a16565b610cca5760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c00000000000000006064820152608401610b9e565b610cd48383613b33565b505050565b610ce23361101a565b610cfe5760405162461bcd60e51b8152600401610b9e90615735565b610d16600080516020615abc833981519152826112fd565b50565b600082816000828152600a602052604090206003015460ff16600b811115610d5157634e487b7160e01b600052602160045260246000fd5b1415610d6f5760405162461bcd60e51b8152600401610b9e90615764565b60026007541415610d925760405162461bcd60e51b8152600401610b9e906157de565b60026007556000848152600c60205260409020546001600160a01b03163314610dec5760405162461bcd60e51b815260206004820152600c60248201526b155b985d5d1a1bdc9a5e995960a21b6044820152606401610b9e565b6000848152600d6020526040902054341015610e3f5760405162461bcd60e51b8152602060048201526012602482015271496e73756666696369656e742066756e647360701b6044820152606401610b9e565b602083015151835151148015610e6857508251516002101580610e685750600283602001515111155b610e845760405162461bcd60e51b8152600401610b9e9061562e565b6000610e8f85612080565b6000868152600e602052604090205490915060ff16610f29576000858152600d6020526040902054610ef25760405162461bcd60e51b815260206004820152600c60248201526b4e6f7420666f722073616c6560a01b6044820152606401610b9e565b6040516001600160a01b038216903480156108fc02916000818181858888f19350505050158015610f27573d6000803e3d6000fd5b505b610f34813387613ba1565b6000858152600d60209081526040808320839055600c82529182902080546001600160a01b031916905585519086015186830151925133936001600160a01b038616938a937fa5e91af02aa5d70d4b15add4716242eff01c348f03f956c6ff5491a3bdd966ba93610fa593906153e1565b60405180910390a450506001600755505050565b610fc23361101a565b610fde5760405162461bcd60e51b8152600401610b9e90615735565b610d16600082613aab565b610ff33382613d3d565b61100f5760405162461bcd60e51b8152600401610b9e9061578d565b610cd4838383613ba1565b6000610a918183612605565b33858161103282612080565b6001600160a01b0316146110585760405162461bcd60e51b8152600401610b9e906156ea565b336001600160a01b03861614156110b15760405162461bcd60e51b815260206004820152601a60248201527f596f752063616e27742073656c6c20746f20796f757273656c660000000000006044820152606401610b9e565b6020840151518451511480156110da575083515160021015806110da5750600284602001515111155b6110f65760405162461bcd60e51b8152600401610b9e9061562e565b821561114057851561113b5760405162461bcd60e51b815260206004820152600e60248201526d139bdd08195d1a08185b5bdd5b9d60921b6044820152606401610b9e565b61117f565b8561117f5760405162461bcd60e51b815260206004820152600f60248201526e139bdd08119a585d08185b5bdd5b9d608a1b6044820152606401610b9e565b6000878152600d60209081526040808320899055600c825280832080546001600160a01b0319166001600160a01b038a16908117909155600e8352818420805460ff19168815151790558782018051600a8552948390206005019490945587519288015193519151909333938c937f1b75ab2a389bbdc3360833f6dccf917fc65fe7e7ddfb0eb49f735cecf628baf59361121c9391908b90615417565b60405180910390a450505050505050565b6000828152600a602052604090206004018054606091908390811061126257634e487b7160e01b600052603260045260246000fd5b906000526020600020018054611277906159d9565b80601f01602080910402602001604051908101604052809291908181526020018280546112a3906159d9565b80156112f05780601f106112c5576101008083540402835291602001916112f0565b820191906000526020600020905b8154815290600101906020018083116112d357829003601f168201915b5050505050905092915050565b6000828152600660205260409020600101546113198133613e34565b610cd48383613e98565b6001600160a01b03811633146113935760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b6064820152608401610b9e565b61139d8282613f1e565b5050565b60005b8251811015610cd457336001600160a01b03166113e78483815181106113da57634e487b7160e01b600052603260045260246000fd5b6020026020010151612080565b6001600160a01b03161461143d5760405162461bcd60e51b815260206004820152601860248201527f596f7520617265206e6f742074686520617070726f76657200000000000000006044820152606401610b9e565b61146e8284838151811061146157634e487b7160e01b600052603260045260246000fd5b6020026020010151610bc3565b8061147881615a14565b9150506113a4565b610cd4838383604051806020016040528060008152506134c6565b3382816114a782612080565b6001600160a01b0316146114cd5760405162461bcd60e51b8152600401610b9e906156ea565b6020830151518351511480156114f6575082515160021015806114f65750600283602001515111155b6115125760405162461bcd60e51b8152600401610b9e9061570d565b61151b84613f85565b6000848152600a60205260408120906115348282614932565b600060018301819055600283018190556003830180546001600160a81b031916905561156490600484019061496c565b60058201600090555050336001600160a01b0316847f4b5dc53104cae632721a6ff5439e47a34cd019bfeb778b0125b64d64c281b5c285600001516000815181106115bf57634e487b7160e01b600052603260045260246000fd5b60200260200101518660000151876020015188604001516040516115e694939291906154ea565b60405180910390a350505050565b6000848152600a60205260409020600301543390859061010090046001600160a01b031682148061163e5750816001600160a01b031661163382612080565b6001600160a01b0316145b61165a5760405162461bcd60e51b8152600401610b9e906156a8565b600086816000828152600a602052604090206003015460ff16600b81111561169257634e487b7160e01b600052602160045260246000fd5b14156116b05760405162461bcd60e51b8152600401610b9e90615764565b6000871180156116d057506000888152600a602052604090206001015487105b6117115760405162461bcd60e51b8152602060048201526012602482015271496e76616c6964205765696768746c6f737360701b6044820152606401610b9e565b60208501515185515114801561173a5750845151600210158061173a5750600285602001515111155b6117565760405162461bcd60e51b8152600401610b9e9061562e565b6000888152600a602090815260408220600401805460018101825590835291819020885161178b93919091019189019061498a565b506000888152600a60205260408120600101546117a990899061597f565b60008a8152600a6020526040808220600181018490559089015160059091015587518051929350916117eb57634e487b7160e01b600052603260045260246000fd5b6020026020010151336001600160a01b03168a7f0de5290eb91da735ef493eb75b75cb8398c596fc092f374beb7de0b279106ad589600001518a602001518b60400151878e604051611841959493929190615455565b60405180910390a4505050505050505050565b33838161186082612080565b6001600160a01b0316146118865760405162461bcd60e51b8152600401610b9e906156ea565b600085816000828152600a602052604090206003015460ff16600b8111156118be57634e487b7160e01b600052602160045260246000fd5b14156118dc5760405162461bcd60e51b8152600401610b9e90615764565b60038651111580156118ef575060018651115b6119315760405162461bcd60e51b81526020600482015260136024820152724d617820332c204d696e203220746f6b656e7360681b6044820152606401610b9e565b60208501515185515114801561195a5750845151600210158061195a5750600285602001515111155b6119765760405162461bcd60e51b8152600401610b9e9061570d565b6000865160016119869190615934565b6001600160401b038111156119ab57634e487b7160e01b600052604160045260246000fd5b6040519080825280602002602001820160405280156119d4578160200160208202803683370190505b50905087816000815181106119f957634e487b7160e01b600052603260045260246000fd5b6020026020010181815250506000600a60008a81526020019081526020016000206040518060e0016040529081600082018054611a35906159d9565b80601f0160208091040260200160405190810160405280929190818152602001828054611a61906159d9565b8015611aae5780601f10611a8357610100808354040283529160200191611aae565b820191906000526020600020905b815481529060010190602001808311611a9157829003601f168201915b50505091835250506001820154602082015260028201546040820152600382015460609091019060ff16600b811115611af757634e487b7160e01b600052602160045260246000fd5b600b811115611b1657634e487b7160e01b600052602160045260246000fd5b8152600382015461010090046001600160a01b0316602080830191909152600483018054604080518285028101850182528281529401939260009084015b82821015611c00578382906000526020600020018054611b73906159d9565b80601f0160208091040260200160405190810160405280929190818152602001828054611b9f906159d9565b8015611bec5780601f10611bc157610100808354040283529160200191611bec565b820191906000526020600020905b815481529060010190602001808311611bcf57829003601f168201915b505050505081526020019060010190611b54565b50505050815260200160058201548152505090506000805b8951811015611cd857898181518110611c4157634e487b7160e01b600052603260045260246000fd5b602002602001015160001415611c915760405162461bcd60e51b81526020600482015260156024820152740506172746974696f6e732063616e2774206265203605c1b6044820152606401610b9e565b898181518110611cb157634e487b7160e01b600052603260045260246000fd5b602002602001015182611cc49190615934565b915080611cd081615a14565b915050611c18565b5060008a8152600a60205260409020600101548114611d395760405162461bcd60e51b815260206004820152601760248201527f496e636f72726563742073756d206f6620616d6f756e740000000000000000006044820152606401610b9e565b611d438a8961149b565b60005b8951811015611de257611d9883600001518b8381518110611d7757634e487b7160e01b600052603260045260246000fd5b60200260200101518560400151866060015187608001518860a00151614020565b60085484611da7836001615934565b81518110611dc557634e487b7160e01b600052603260045260246000fd5b602090810291909101015280611dda81615a14565b915050611d46565b50336001600160a01b03168a7f0efcd01882c599f19b0991d3d113428582d6593bc7cd14b33dfd2f949a51f4c085604051611e1d91906154a6565b60405180910390a3611e2d614a0e565b5050505050505050505050565b6000848152600a60205260409020600301543390859061010090046001600160a01b0316821480611e845750816001600160a01b0316611e7982612080565b6001600160a01b0316145b611ea05760405162461bcd60e51b8152600401610b9e906156a8565b600086816000828152600a602052604090206003015460ff16600b811115611ed857634e487b7160e01b600052602160045260246000fd5b1415611ef65760405162461bcd60e51b8152600401610b9e90615764565b602085015151855151148015611f1f57508451516002101580611f1f5750600285602001515111155b611f3b5760405162461bcd60e51b8152600401610b9e9061562e565b6000888152600a602052604090206003018054610100600160a81b031981166101006001600160a01b038b160290811783558892916001600160a81b03191660ff1990911617600183600b811115611fa357634e487b7160e01b600052602160045260246000fd5b021790555060408086015160008a8152600a602052918220600501558551805133928b927fedeee9aed78718d2a4fc664fe842d7a180deb1de9a8edc48901d213bd32443079290919061200657634e487b7160e01b600052603260045260246000fd5b6020026020010151886000015189602001518a604001518c8e60405161203196959493929190615527565b60405180910390a35050505050505050565b61204c3361101a565b6120685760405162461bcd60e51b8152600401610b9e90615735565b610d16600080516020615abc83398151915282613aab565b6000818152600260205260408120546001600160a01b031680610a915760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201526832b73a103a37b5b2b760b91b6064820152608401610b9e565b6002600754141561211a5760405162461bcd60e51b8152600401610b9e906157de565b6002600755602081015151815151148015612148575080515160021015806121485750600281602001515111155b6121645760405162461bcd60e51b8152600401610b9e9061562e565b816121fc573483101580156121795750600083115b6121c55760405162461bcd60e51b815260206004820152601760248201527f50726f6d6973656420746f2070617920696e20466961740000000000000000006044820152606401610b9e565b6040516001600160a01b038516903480156108fc02916000818181858888f193505050501580156121fa573d6000803e3d6000fd5b505b336001600160a01b0316846001600160a01b0316867f259239d3edd4e6a630db0d6ab72e61bbf8a03a02a90bca16ec882f201ad71d76846000015160008151811061225757634e487b7160e01b600052603260045260246000fd5b60200260200101518560000151866020015187604001518a8a604051610fa596959493929190615584565b61228b3361101a565b6122a75760405162461bcd60e51b8152600401610b9e90615735565b610d166000826112fd565b60006001600160a01b03821661231d5760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604482015269726f206164647265737360b01b6064820152608401610b9e565b506001600160a01b031660009081526003602052604090205490565b6000612353600080516020615a9c83398151915283612605565b80610a915750610a91600083612605565b61236d3361101a565b6123895760405162461bcd60e51b8152600401610b9e90615735565b610d16600080516020615adc83398151915282613aab565b6123aa33613a91565b61240b5760405162461bcd60e51b815260206004820152602c60248201527f5265737472696374656420746f20496e666f726d6174696f6e48616e646c657260448201526b399037b91030b236b4b7399760a11b6064820152608401610b9e565b805183511461242c5760405162461bcd60e51b8152600401610b9e9061570d565b602082015151825151148015612455575081515160021015806124555750600282602001515111155b6124715760405162461bcd60e51b8152600401610b9e9061562e565b60005b83518110156125c25781818151811061249d57634e487b7160e01b600052603260045260246000fd5b6020026020010151600a60008684815181106124c957634e487b7160e01b600052603260045260246000fd5b6020026020010151815260200190815260200160002060050181905550336001600160a01b031684828151811061251057634e487b7160e01b600052603260045260246000fd5b60200260200101517ffdbdbc05573951e8f00387285b7bd65b2bdcf225715eb729087d35b35bc2fe9b856000015160008151811061255e57634e487b7160e01b600052603260045260246000fd5b60200260200101518660000151876020015187878151811061259057634e487b7160e01b600052603260045260246000fd5b60200260200101516040516125a894939291906154ea565b60405180910390a3806125ba81615a14565b915050612474565b50505050565b6125d13361101a565b6125ed5760405162461bcd60e51b8152600401610b9e90615735565b610d16600080516020615a9c83398151915282613aab565b60009182526006602090815260408084206001600160a01b0393909316845291905290205460ff1690565b606060018054610aa6906159d9565b6000612353600080516020615adc83398151915283612605565b6001825111801561266c57506003825111155b6126b85760405162461bcd60e51b815260206004820152601c60248201527f4d6178696d756d2062617463683a20332c206d696e696d756d3a2032000000006044820152606401610b9e565b6020810151518151511480156126e1575080515160021015806126e15750600281602001515111155b6126fd5760405162461bcd60e51b8152600401610b9e9061562e565b60008060006040518060e00160405280600a60008860008151811061273257634e487b7160e01b600052603260045260246000fd5b602002602001015181526020019081526020016000206000018054612756906159d9565b80601f0160208091040260200160405190810160405280929190818152602001828054612782906159d9565b80156127cf5780601f106127a4576101008083540402835291602001916127cf565b820191906000526020600020905b8154815290600101906020018083116127b257829003601f168201915b5050505050815260200160008152602001600a60008860008151811061280557634e487b7160e01b600052603260045260246000fd5b60200260200101518152602001908152602001600020600201548152602001600a60008860008151811061284957634e487b7160e01b600052603260045260246000fd5b60209081029190910181015182528101919091526040016000206003015460ff16600b81111561288957634e487b7160e01b600052602160045260246000fd5b8152602001600a6000886000815181106128b357634e487b7160e01b600052603260045260246000fd5b6020026020010151815260200190815260200160002060030160019054906101000a90046001600160a01b03166001600160a01b03168152602001600a60008860008151811061291357634e487b7160e01b600052603260045260246000fd5b60200260200101518152602001908152602001600020600401805480602002602001604051908101604052809291908181526020016000905b828210156129f857838290600052602060002001805461296b906159d9565b80601f0160208091040260200160405190810160405280929190818152602001828054612997906159d9565b80156129e45780601f106129b9576101008083540402835291602001916129e4565b820191906000526020600020905b8154815290600101906020018083116129c757829003601f168201915b50505050508152602001906001019061294c565b505050508152602001848152509050600081604051602001612a1a9190615815565b604051602081830303815290604052805190602001209050600086516001612a429190615934565b6001600160401b03811115612a6757634e487b7160e01b600052604160045260246000fd5b604051908082528060200260200182016040528015612a90578160200160208202803683370190505b50905060005b875181101561308357336001600160a01b0316612acc8983815181106113da57634e487b7160e01b600052603260045260246000fd5b6001600160a01b031614612b115760405162461bcd60e51b815260206004820152600c60248201526b155b985d5d1a1bdc9a5e995960a21b6044820152606401610b9e565b6000600a60008a8481518110612b3757634e487b7160e01b600052603260045260246000fd5b60209081029190910181015182528101919091526040016000206003015460ff16600b811115612b7757634e487b7160e01b600052602160045260246000fd5b1415612bb55760405162461bcd60e51b815260206004820152600d60248201526c496e76616c696420537461746560981b6044820152606401610b9e565b60006040518060e00160405280600a60008c8681518110612be657634e487b7160e01b600052603260045260246000fd5b602002602001015181526020019081526020016000206000018054612c0a906159d9565b80601f0160208091040260200160405190810160405280929190818152602001828054612c36906159d9565b8015612c835780601f10612c5857610100808354040283529160200191612c83565b820191906000526020600020905b815481529060010190602001808311612c6657829003601f168201915b5050505050815260200160008152602001600a60008c8681518110612cb857634e487b7160e01b600052603260045260246000fd5b60200260200101518152602001908152602001600020600201548152602001600a60008c8681518110612cfb57634e487b7160e01b600052603260045260246000fd5b60209081029190910181015182528101919091526040016000206003015460ff16600b811115612d3b57634e487b7160e01b600052602160045260246000fd5b8152602001600a60008c8681518110612d6457634e487b7160e01b600052603260045260246000fd5b6020026020010151815260200190815260200160002060030160019054906101000a90046001600160a01b03166001600160a01b03168152602001600a60008c8681518110612dc357634e487b7160e01b600052603260045260246000fd5b60200260200101518152602001908152602001600020600401805480602002602001604051908101604052809291908181526020016000905b82821015612ea8578382906000526020600020018054612e1b906159d9565b80601f0160208091040260200160405190810160405280929190818152602001828054612e47906159d9565b8015612e945780601f10612e6957610100808354040283529160200191612e94565b820191906000526020600020905b815481529060010190602001808311612e7757829003601f168201915b505050505081526020019060010190612dfc565b50505050815260200188815250905080604051602001612ec89190615815565b604051602081830303815290604052805190602001208414612f1b5760405162461bcd60e51b815260206004820152600c60248201526b125b9d985b1a59081413919560a21b6044820152606401610b9e565b888281518110612f3b57634e487b7160e01b600052603260045260246000fd5b6020026020010151838381518110612f6357634e487b7160e01b600052603260045260246000fd5b602002602001018181525050600a60008a8481518110612f9357634e487b7160e01b600052603260045260246000fd5b602002602001015181526020019081526020016000206001015486612fb89190615934565b9550612feb898381518110612fdd57634e487b7160e01b600052603260045260246000fd5b60200260200101518961149b565b600a60008a848151811061300f57634e487b7160e01b600052603260045260246000fd5b60200260200101518152602001908152602001600020600080820160006130369190614932565b600060018301819055600283018190556003830180546001600160a81b031916905561306690600484019061496c565b50600060059190910155508061307b81615a14565b915050612a96565b506130a68360000151858560400151866060015187608001518860a00151614020565b600854818851815181106130ca57634e487b7160e01b600052603260045260246000fd5b602002602001018181525050336001600160a01b03167fea5425d523a6d590132943fc2b95afa0695f7310acdad1457216ffba0580edb28260405161310f91906154a6565b60405180910390a250505050505050565b6131293361101a565b6131455760405162461bcd60e51b8152600401610b9e90615735565b610d16600080516020615a9c833981519152826112fd565b600a60205260009081526040902080548190613178906159d9565b80601f01602080910402602001604051908101604052809291908181526020018280546131a4906159d9565b80156131f15780601f106131c6576101008083540402835291602001916131f1565b820191906000526020600020905b8154815290600101906020018083116131d457829003601f168201915b505050506001830154600284015460038501546005909501549394919390925060ff82169161010090046001600160a01b03169086565b61139d3383836141f2565b61323c33612339565b6132945760405162461bcd60e51b815260206004820152602360248201527f5265737472696374656420746f2046546f6b656e697a6572206f722061646d6960448201526237399760e91b6064820152608401610b9e565b600083116132d85760405162461bcd60e51b815260206004820152601160248201527005765696768742063616e2774206265203607c1b6044820152606401610b9e565b604080516001808252818301909252600091816020015b60608152602001906001900390816132ef5790505090506040518060400160405280600381526020016252617760e81b8152508160008151811061334357634e487b7160e01b600052603260045260246000fd5b602002602001018190525061335c600880546001019055565b600061336760085490565b905061337333826142c1565b6040805160e081018252878152602080820188905281830187905260006060830181905233608084015260a0830186905260c08301819052848152600a82529290922081518051929391926133cb928492019061498a565b50602082015181600101556040820151816002015560608201518160030160006101000a81548160ff0219169083600b81111561341857634e487b7160e01b600052602160045260246000fd5b021790555060808201516003820180546001600160a01b0390921661010002610100600160a81b031990921691909117905560a08201518051613465916004840191602090910190614a6d565b5060c0820151816005015590505061347c81614403565b336001600160a01b0316817fcf832bb5dc6b042772da28aae6ff0e3b380c924268b4aef923c89dbf27786351856040516134b691906155d0565b60405180910390a3505050505050565b6134d03383613d3d565b6134ec5760405162461bcd60e51b8152600401610b9e9061578d565b6125c2848484846144a8565b33848161350482612080565b6001600160a01b03161461352a5760405162461bcd60e51b8152600401610b9e906156ea565b600085116135675760405162461bcd60e51b815260206004820152600a602482015269043616e277420626520360b41b6044820152606401610b9e565b828414156135ac5760405162461bcd60e51b815260206004820152601260248201527124b73b30b634b21021b7b73b32b939b4b7b760711b6044820152606401610b9e565b6000868152600a602052604090206002015484146136025760405162461bcd60e51b8152602060048201526013602482015272125b9d985b1a590813585d18da0e881d5b9a5d606a1b6044820152606401610b9e565b6000868152600a6020908152604091829020600181018890556002018590558151868152908101859052869188917f4e1f8601a03fdbbc86a16e28caede62143afc8f04f10a78f04b0d4ded0e69e8691016134b6565b6000818152600260205260409020546060906001600160a01b03166136d75760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201526e3732bc34b9ba32b73a103a37b5b2b760891b6064820152608401610b9e565b600061371360408051808201909152601a81527f687474703a2f2f7472616465636f696e2e6e6c2f7661756c742f000000000000602082015290565b90506000815111613733576040518060200160405280600081525061375e565b8061373d846144db565b60405160200161374e929190615300565b6040516020818303038152906040525b9392505050565b61376e3361263f565b6137cb5760405162461bcd60e51b815260206004820152602860248201527f5265737472696374656420746f2050726f6475637448616e646c657273206f726044820152671030b236b4b7399760c11b6064820152608401610b9e565b600082816000828152600a602052604090206003015460ff16600b81111561380357634e487b7160e01b600052602160045260246000fd5b146138205760405162461bcd60e51b8152600401610b9e90615764565b600260075414156138435760405162461bcd60e51b8152600401610b9e906157de565b60026007556000848152600c60205260409020546001600160a01b031633146138ae5760405162461bcd60e51b815260206004820152601f60248201527f596f7520646f6e277420686176652074686520726967687420746f20706179006044820152606401610b9e565b6000848152600d60205260409020543410156139055760405162461bcd60e51b81526020600482015260166024820152750b2deea40c8d2c840dcdee840e0c2f240cadcdeeaced60531b6044820152606401610b9e565b60208301515183515114801561392e5750825151600210158061392e5750600283602001515111155b61394a5760405162461bcd60e51b8152600401610b9e9061562e565b600061395585612080565b6000868152600e602052604090205490915060ff16613a00576000858152600d60205260409020546139c95760405162461bcd60e51b815260206004820152601e60248201527f54686973206973206e6f74206c697374656420617320616e206f6666657200006044820152606401610b9e565b6040516001600160a01b038216903480156108fc02916000818181858888f193505050501580156139fe573d6000803e3d6000fd5b505b613a0b813387613ba1565b6000858152600d60209081526040808320839055600c825280832080546001600160a01b0319169055600a825291829020600301805460ff1916600117905585519086015186830151925133936001600160a01b038616938a937fc1ebddee4d77ec41b96882ea791fbe13f1063516d0a550365e79a2c1f4fa9b1b93610fa593906153e1565b6000612353600080516020615abc83398151915283612605565b600082815260066020526040902060010154613ac78133613e34565b610cd48383613f1e565b613ada3361101a565b613af65760405162461bcd60e51b8152600401610b9e90615735565b610d16600080516020615adc833981519152826112fd565b60006001600160e01b03198216637965db0b60e01b1480610a915750610a91826145f4565b600081815260046020526040902080546001600160a01b0319166001600160a01b0384169081179091558190613b6882612080565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b826001600160a01b0316613bb482612080565b6001600160a01b031614613c185760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b6064820152608401610b9e565b6001600160a01b038216613c7a5760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608401610b9e565b613c85600082613b33565b6001600160a01b0383166000908152600360205260408120805460019290613cae90849061597f565b90915550506001600160a01b0382166000908152600360205260408120805460019290613cdc908490615934565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6000818152600260205260408120546001600160a01b0316613db65760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b6064820152608401610b9e565b6000613dc183612080565b9050806001600160a01b0316846001600160a01b03161480613dfc5750836001600160a01b0316613df184610b29565b6001600160a01b0316145b80613e2c57506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b949350505050565b613e3e8282612605565b61139d57613e56816001600160a01b03166014614644565b613e61836020614644565b604051602001613e7292919061532f565b60408051601f198184030181529082905262461bcd60e51b8252610b9e916004016155d0565b613ea28282612605565b61139d5760008281526006602090815260408083206001600160a01b03851684529091529020805460ff19166001179055613eda3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b613f288282612605565b1561139d5760008281526006602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b6000613f9082612080565b9050613f9d600083613b33565b6001600160a01b0381166000908152600360205260408120805460019290613fc690849061597f565b909155505060008281526002602052604080822080546001600160a01b0319169055518391906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b846140635760405162461bcd60e51b8152602060048201526013602482015272125b9cdd59999a58da595b9d08105b5bdd5b9d606a1b6044820152606401610b9e565b614071600880546001019055565b600061407c60085490565b905061408833826142c1565b6040518060e0016040528088815260200187815260200186815260200185600b8111156140c557634e487b7160e01b600052602160045260246000fd5b81526001600160a01b038516602080830191909152604080830186905260006060909301839052848352600a825290912082518051919261410b9284929091019061498a565b50602082015181600101556040820151816002015560608201518160030160006101000a81548160ff0219169083600b81111561415857634e487b7160e01b600052602160045260246000fd5b021790555060808201516003820180546001600160a01b0390921661010002610100600160a81b031990921691909117905560a082015180516141a5916004840191602090910190614a6d565b5060c082015181600501559050506141bc81614403565b604051339082907f8cee4fca8298d98d9137f53d00920fbe667539eeaa7ae1dba71f7942e0515f7790600090a350505050505050565b816001600160a01b0316836001600160a01b031614156142545760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610b9e565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6001600160a01b0382166143175760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610b9e565b6000818152600260205260409020546001600160a01b03161561437c5760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610b9e565b6001600160a01b03821660009081526003602052604081208054600192906143a5908490615934565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b6000818152600260205260409020546001600160a01b031661447c5760405162461bcd60e51b815260206004820152602c60248201527f4552433732314d657461646174613a2055524920736574206f66206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b6064820152608401610b9e565b614485816144db565b6000828152600b60209081526040909120825161139d939192919091019061498a565b6144b3848484613ba1565b6144bf84848484614825565b6125c25760405162461bcd60e51b8152600401610b9e90615656565b6060816144ff5750506040805180820190915260018152600360fc1b602082015290565b8160005b8115614529578061451381615a14565b91506145229050600a8361594c565b9150614503565b6000816001600160401b0381111561455157634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f19166020018201604052801561457b576020820181803683370190505b5090505b8415613e2c5761459060018361597f565b915061459d600a86615a2f565b6145a8906030615934565b60f81b8183815181106145cb57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a9053506145ed600a8661594c565b945061457f565b60006001600160e01b031982166380ac58cd60e01b148061462557506001600160e01b03198216635b5e139f60e01b145b80610a9157506301ffc9a760e01b6001600160e01b0319831614610a91565b60606000614653836002615960565b61465e906002615934565b6001600160401b0381111561468357634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f1916602001820160405280156146ad576020820181803683370190505b509050600360fc1b816000815181106146d657634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350600f60fb1b8160018151811061471357634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a9053506000614737846002615960565b614742906001615934565b90505b60018111156147d6576f181899199a1a9b1b9c1cb0b131b232b360811b85600f166010811061478457634e487b7160e01b600052603260045260246000fd5b1a60f81b8282815181106147a857634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a90535060049490941c936147cf816159c2565b9050614745565b50831561375e5760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610b9e565b60006001600160a01b0384163b1561492757604051630a85bd0160e11b81526001600160a01b0385169063150b7a02906148699033908990889088906004016153a4565b602060405180830381600087803b15801561488357600080fd5b505af19250505080156148b3575060408051601f3d908101601f191682019092526148b091810190614f67565b60015b61490d573d8080156148e1576040519150601f19603f3d011682016040523d82523d6000602084013e6148e6565b606091505b5080516149055760405162461bcd60e51b8152600401610b9e90615656565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050613e2c565b506001949350505050565b50805461493e906159d9565b6000825580601f1061494e575050565b601f016020900490600052602060002090810190610d169190614ac6565b5080546000825590600052602060002090810190610d169190614adb565b828054614996906159d9565b90600052602060002090601f0160209004810192826149b857600085556149fe565b82601f106149d157805160ff19168380011785556149fe565b828001600101855582156149fe579182015b828111156149fe5782518255916020019190600101906149e3565b50614a0a929150614ac6565b5090565b6040518060e001604052806060815260200160008152602001600080191681526020016000600b811115614a5257634e487b7160e01b600052602160045260246000fd5b81526000602082018190526060604083018190529091015290565b828054828255906000526020600020908101928215614aba579160200282015b82811115614aba5782518051614aaa91849160209091019061498a565b5091602001919060010190614a8d565b50614a0a929150614adb565b5b80821115614a0a5760008155600101614ac7565b80821115614a0a576000614aef8282614932565b50600101614adb565b60006001600160401b03831115614b1157614b11615a6f565b614b24601f8401601f19166020016158e1565b9050828152838383011115614b3857600080fd5b828260208301376000602084830101529392505050565b80356001600160a01b0381168114614b6657600080fd5b919050565b600082601f830112614b7b578081fd5b81356020614b90614b8b83615911565b6158e1565b80838252828201915082860187848660051b8901011115614baf578586fd5b855b85811015614bcd57813584529284019290840190600101614bb1565b5090979650505050505050565b80358015158114614b6657600080fd5b600082601f830112614bfa578081fd5b61375e83833560208501614af8565b600060608284031215614c1a578081fd5b604051606081016001600160401b038282108183111715614c3d57614c3d615a6f565b816040528293508435915080821115614c5557600080fd5b614c6186838701614b6b565b83526020850135915080821115614c7757600080fd5b50614c8485828601614b6b565b602083015250604083013560408201525092915050565b600060208284031215614cac578081fd5b61375e82614b4f565b60008060408385031215614cc7578081fd5b614cd083614b4f565b9150614cde60208401614b4f565b90509250929050565b600080600060608486031215614cfb578081fd5b614d0484614b4f565b9250614d1260208501614b4f565b9150604084013590509250925092565b60008060008060808587031215614d37578081fd5b614d4085614b4f565b9350614d4e60208601614b4f565b92506040850135915060608501356001600160401b03811115614d6f578182fd5b8501601f81018713614d7f578182fd5b614d8e87823560208401614af8565b91505092959194509250565b60008060408385031215614dac578182fd5b614db583614b4f565b9150614cde60208401614bda565b60008060408385031215614dd5578182fd5b614dde83614b4f565b946020939093013593505050565b60008060408385031215614dfe578182fd5b82356001600160401b03811115614e13578283fd5b614e1f85828601614b6b565b925050614cde60208401614b4f565b60008060408385031215614e40578182fd5b82356001600160401b0380821115614e56578384fd5b614e6286838701614b6b565b93506020850135915080821115614e77578283fd5b50614e8485828601614c09565b9150509250929050565b600080600060608486031215614ea2578081fd5b83356001600160401b0380821115614eb8578283fd5b614ec487838801614b6b565b94506020860135915080821115614ed9578283fd5b614ee587838801614c09565b93506040860135915080821115614efa578283fd5b50614f0786828701614b6b565b9150509250925092565b600060208284031215614f22578081fd5b5035919050565b60008060408385031215614f3b578182fd5b82359150614cde60208401614b4f565b600060208284031215614f5c578081fd5b813561375e81615a85565b600060208284031215614f78578081fd5b815161375e81615a85565b60008060008060808587031215614f98578182fd5b84356001600160401b0380821115614fae578384fd5b614fba88838901614bea565b955060208701359450604087013593506060870135915080821115614fdd578283fd5b50614d8e87828801614bea565b60008060008060808587031215614fff578182fd5b8435935061500f60208601614b4f565b92506040850135600c8110615022578283fd5b915060608501356001600160401b0381111561503c578182fd5b614d8e87828801614c09565b600080600080600060a0868803121561505f578283fd5b8535945061506f60208701614b4f565b93506040860135925061508460608701614bda565b915060808601356001600160401b0381111561509e578182fd5b6150aa88828901614c09565b9150509295509295909350565b6000806000606084860312156150cb578081fd5b8335925060208401356001600160401b03808211156150e8578283fd5b6150f487838801614b6b565b93506040860135915080821115615109578283fd5b50614f0786828701614c09565b60008060408385031215615128578182fd5b8235915060208301356001600160401b03811115615144578182fd5b614e8485828601614c09565b60008060408385031215615162578182fd5b50508035926020909101359150565b600080600080600060a08688031215615188578283fd5b853594506020860135935061519f60408701614b4f565b925060608601356001600160401b038111156151b9578182fd5b6151c588828901614c09565b9250506151d460808701614bda565b90509295509295909350565b600080600080608085870312156151f5578182fd5b5050823594602084013594506040840135936060013592509050565b60008060008060808587031215615226578182fd5b843593506020850135925060408501356001600160401b038082111561524a578384fd5b61525688838901614bea565b9350606087013591508082111561526b578283fd5b50614d8e87828801614c09565b6000815180845260208085019450808401835b838110156152a75781518752958201959082019060010161528b565b509495945050505050565b600081518084526152ca816020860160208601615996565b601f01601f19169290920160200192915050565b600c81106152fc57634e487b7160e01b600052602160045260246000fd5b9052565b60008351615312818460208801615996565b835190830190615326818360208801615996565b01949350505050565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351615367816017850160208801615996565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351615398816028840160208801615996565b01602801949350505050565b6001600160a01b03858116825284166020820152604081018390526080606082018190526000906153d7908301846152b2565b9695505050505050565b6060815260006153f46060830186615278565b82810360208401526154068186615278565b915050826040830152949350505050565b60808152600061542a6080830187615278565b828103602084015261543c8187615278565b6040840195909552505090151560609091015292915050565b60a08152600061546860a0830188615278565b828103602084015261547a8188615278565b9050856040840152846060840152828103608084015261549a81856152b2565b98975050505050505050565b6020808252825182820181905260009190848201906040850190845b818110156154de578351835292840192918401916001016154c2565b50909695505050505050565b8481526080602082015260006155036080830186615278565b82810360408401526155158186615278565b91505082606083015295945050505050565b86815260c06020820152600061554060c0830188615278565b82810360408401526155528188615278565b91505084606083015261556860808301856152de565b6001600160a01b039290921660a0919091015295945050505050565b86815260c06020820152600061559d60c0830188615278565b82810360408401526155af8188615278565b606084019690965250506080810192909252151560a0909101529392505050565b60208152600061375e60208301846152b2565b60c0815260006155f660c08301896152b2565b905086602083015285604083015261561160608301866152de565b6001600160a01b0393909316608082015260a00152949350505050565b6020808252600e908201526d092dcecc2d8d2c840d8cadccee8d60931b604082015260600190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b60208082526022908201527f4e6f7420746865204f776e6572206e6f722063757272656e742048616e646c65604082015261391760f11b606082015260800190565b6020808252600990820152682737ba1027bbb732b960b91b604082015260600190565b6020808252600e908201526d092dcecc2d8d2c84098cadccee8d60931b604082015260600190565b6020808252601590820152742932b9ba3934b1ba32b2103a379030b236b4b7399760591b604082015260600190565b6020808252600f908201526e496e636f727265637420537461746560881b604082015260600190565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b6020808252601f908201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604082015260600190565b60006020808352835160e0828501526158326101008501826152b2565b905081850151604085015260408501516060850152606085015161585960808601826152de565b5060808501516001600160a01b031660a085810191909152850151848203601f1990810160c087015281518084529184019184840190600581901b85018601875b828110156158c657848783030184526158b48287516152b2565b9588019593880193915060010161589a565b5060c08a015160e08a01528097505050505050505092915050565b604051601f8201601f191681016001600160401b038111828210171561590957615909615a6f565b604052919050565b60006001600160401b0382111561592a5761592a615a6f565b5060051b60200190565b6000821982111561594757615947615a43565b500190565b60008261595b5761595b615a59565b500490565b600081600019048311821515161561597a5761597a615a43565b500290565b60008282101561599157615991615a43565b500390565b60005b838110156159b1578181015183820152602001615999565b838111156125c25750506000910152565b6000816159d1576159d1615a43565b506000190190565b600181811c908216806159ed57607f821691505b60208210811415615a0e57634e487b7160e01b600052602260045260246000fd5b50919050565b6000600019821415615a2857615a28615a43565b5060010190565b600082615a3e57615a3e615a59565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160e01b031981168114610d1657600080fdfee70d28ebd9d7d9a3dd77d46ae2481f301c80806f395b08de31d8e095b1c46cee8da7d70244203c30977cc84bc73c56df770db659eae5eae031338bf752ed6b187d516c105bee30cf3879df4b9a7cf2e17d81aa2e2cd673a2f488a1d6fadd45eca264697066735822122031efb0b1c79ba5fbf2e485ea2221d9e38dbec3fa31e32f0eef3ca1e5090dbf4f64736f6c63430008040033",
  "deployedBytecode": "0x6080604052600436106103355760003560e01c80636f589053116101ab578063a02de811116100f7578063cf2a6a0f11610095578063d58e36e01161006f578063d58e36e0146109d9578063e985e9c5146109fb578063e9e9a6b314610a44578063f1ead07114610a6657600080fd5b8063cf2a6a0f14610986578063d52c9a4014610999578063d547741f146109b957600080fd5b8063aed2025e116100d1578063aed2025e14610906578063b88d4fde14610926578063c29278f414610946578063c87b56dd1461096657600080fd5b8063a02de8111461089f578063a217fddf146108d1578063a22cb465146108e657600080fd5b80637aac74cc1161016457806395d89b411161013e57806395d89b411461082a57806397d0a85a1461083f5780639825e98d1461085f5780639d4ba5ff1461087f57600080fd5b80637aac74cc146107ca57806385fb92ac146107ea57806391d148541461080a57600080fd5b80636f58905314610704578063704802751461073457806370a082311461075457806371fdc7ac146107745780637314b0f71461079457806373fc8420146107b457600080fd5b80632f2ff15d116102855780634b7d4fef116102235780636352211e116101fd5780636352211e1461066b5780636392130a1461068b578063682e67e81461069e57806368728f92146106ce57600080fd5b80634b7d4fef146105fe578063542c7c0a1461061e57806358d6dd8f1461064b57600080fd5b806342842e0e1161025f57806342842e0e1461057e5780634406257a1461059e578063462be15d146105be57806349b6c21d146105de57600080fd5b80632f2ff15d1461051e57806336568abe1461053e5780633a962a191461055e57600080fd5b80631779a3b5116102f2578063248a9ca3116102cc578063248a9ca31461048e57806324d7806c146104be57806327315cd6146104de5780632dd87e0f146104fe57600080fd5b80631779a3b51461043b5780631785f53c1461044e57806323b872dd1461046e57600080fd5b806301ffc9a71461033a5780630605a3341461036f57806306fdde031461039f578063081812fc146103c1578063095ea7b3146103f957806315fc35ad1461041b575b600080fd5b34801561034657600080fd5b5061035a610355366004614f4b565b610a86565b60405190151581526020015b60405180910390f35b34801561037b57600080fd5b50610391600080516020615a9c83398151915281565b604051908152602001610366565b3480156103ab57600080fd5b506103b4610a97565b60405161036691906155d0565b3480156103cd57600080fd5b506103e16103dc366004614f11565b610b29565b6040516001600160a01b039091168152602001610366565b34801561040557600080fd5b50610419610414366004614dc3565b610bc3565b005b34801561042757600080fd5b50610419610436366004614c9b565b610cd9565b610419610449366004615116565b610d19565b34801561045a57600080fd5b50610419610469366004614c9b565b610fb9565b34801561047a57600080fd5b50610419610489366004614ce7565b610fe9565b34801561049a57600080fd5b506103916104a9366004614f11565b60009081526006602052604090206001015490565b3480156104ca57600080fd5b5061035a6104d9366004614c9b565b61101a565b3480156104ea57600080fd5b506104196104f9366004615171565b611026565b34801561050a57600080fd5b506103b4610519366004615150565b61122d565b34801561052a57600080fd5b50610419610539366004614f29565b6112fd565b34801561054a57600080fd5b50610419610559366004614f29565b611323565b34801561056a57600080fd5b50610419610579366004614dec565b6113a1565b34801561058a57600080fd5b50610419610599366004614ce7565b611480565b3480156105aa57600080fd5b506104196105b9366004615116565b61149b565b3480156105ca57600080fd5b506104196105d9366004615211565b6115f4565b3480156105ea57600080fd5b506104196105f93660046150b7565b611854565b34801561060a57600080fd5b50610419610619366004614fea565b611e3a565b34801561062a57600080fd5b50610391610639366004614f11565b600d6020526000908152604090205481565b34801561065757600080fd5b50610419610666366004614c9b565b612043565b34801561067757600080fd5b506103e1610686366004614f11565b612080565b610419610699366004615048565b6120f7565b3480156106aa57600080fd5b5061035a6106b9366004614f11565b600e6020526000908152604090205460ff1681565b3480156106da57600080fd5b506103e16106e9366004614f11565b600c602052600090815260409020546001600160a01b031681565b34801561071057600080fd5b5061039161071f366004614f11565b6000908152600a602052604090206004015490565b34801561074057600080fd5b5061041961074f366004614c9b565b612282565b34801561076057600080fd5b5061039161076f366004614c9b565b6122b2565b34801561078057600080fd5b5061035a61078f366004614c9b565b612339565b3480156107a057600080fd5b506104196107af366004614c9b565b612364565b3480156107c057600080fd5b5061039160095481565b3480156107d657600080fd5b506104196107e5366004614e8e565b6123a1565b3480156107f657600080fd5b50610419610805366004614c9b565b6125c8565b34801561081657600080fd5b5061035a610825366004614f29565b612605565b34801561083657600080fd5b506103b4612630565b34801561084b57600080fd5b5061035a61085a366004614c9b565b61263f565b34801561086b57600080fd5b5061041961087a366004614e2e565b612659565b34801561088b57600080fd5b5061041961089a366004614c9b565b613120565b3480156108ab57600080fd5b506108bf6108ba366004614f11565b61315d565b604051610366969594939291906155e3565b3480156108dd57600080fd5b50610391600081565b3480156108f257600080fd5b50610419610901366004614d9a565b613228565b34801561091257600080fd5b50610419610921366004614f83565b613233565b34801561093257600080fd5b50610419610941366004614d22565b6134c6565b34801561095257600080fd5b506104196109613660046151e0565b6134f8565b34801561097257600080fd5b506103b4610981366004614f11565b613658565b610419610994366004615116565b613765565b3480156109a557600080fd5b5061035a6109b4366004614c9b565b613a91565b3480156109c557600080fd5b506104196109d4366004614f29565b613aab565b3480156109e557600080fd5b50610391600080516020615adc83398151915281565b348015610a0757600080fd5b5061035a610a16366004614cb5565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b348015610a5057600080fd5b50610391600080516020615abc83398151915281565b348015610a7257600080fd5b50610419610a81366004614c9b565b613ad1565b6000610a9182613b0e565b92915050565b606060008054610aa6906159d9565b80601f0160208091040260200160405190810160405280929190818152602001828054610ad2906159d9565b8015610b1f5780601f10610af457610100808354040283529160200191610b1f565b820191906000526020600020905b815481529060010190602001808311610b0257829003601f168201915b5050505050905090565b6000818152600260205260408120546001600160a01b0316610ba75760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600460205260409020546001600160a01b031690565b6000610bce82612080565b9050806001600160a01b0316836001600160a01b03161415610c3c5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b6064820152608401610b9e565b336001600160a01b0382161480610c585750610c588133610a16565b610cca5760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c00000000000000006064820152608401610b9e565b610cd48383613b33565b505050565b610ce23361101a565b610cfe5760405162461bcd60e51b8152600401610b9e90615735565b610d16600080516020615abc833981519152826112fd565b50565b600082816000828152600a602052604090206003015460ff16600b811115610d5157634e487b7160e01b600052602160045260246000fd5b1415610d6f5760405162461bcd60e51b8152600401610b9e90615764565b60026007541415610d925760405162461bcd60e51b8152600401610b9e906157de565b60026007556000848152600c60205260409020546001600160a01b03163314610dec5760405162461bcd60e51b815260206004820152600c60248201526b155b985d5d1a1bdc9a5e995960a21b6044820152606401610b9e565b6000848152600d6020526040902054341015610e3f5760405162461bcd60e51b8152602060048201526012602482015271496e73756666696369656e742066756e647360701b6044820152606401610b9e565b602083015151835151148015610e6857508251516002101580610e685750600283602001515111155b610e845760405162461bcd60e51b8152600401610b9e9061562e565b6000610e8f85612080565b6000868152600e602052604090205490915060ff16610f29576000858152600d6020526040902054610ef25760405162461bcd60e51b815260206004820152600c60248201526b4e6f7420666f722073616c6560a01b6044820152606401610b9e565b6040516001600160a01b038216903480156108fc02916000818181858888f19350505050158015610f27573d6000803e3d6000fd5b505b610f34813387613ba1565b6000858152600d60209081526040808320839055600c82529182902080546001600160a01b031916905585519086015186830151925133936001600160a01b038616938a937fa5e91af02aa5d70d4b15add4716242eff01c348f03f956c6ff5491a3bdd966ba93610fa593906153e1565b60405180910390a450506001600755505050565b610fc23361101a565b610fde5760405162461bcd60e51b8152600401610b9e90615735565b610d16600082613aab565b610ff33382613d3d565b61100f5760405162461bcd60e51b8152600401610b9e9061578d565b610cd4838383613ba1565b6000610a918183612605565b33858161103282612080565b6001600160a01b0316146110585760405162461bcd60e51b8152600401610b9e906156ea565b336001600160a01b03861614156110b15760405162461bcd60e51b815260206004820152601a60248201527f596f752063616e27742073656c6c20746f20796f757273656c660000000000006044820152606401610b9e565b6020840151518451511480156110da575083515160021015806110da5750600284602001515111155b6110f65760405162461bcd60e51b8152600401610b9e9061562e565b821561114057851561113b5760405162461bcd60e51b815260206004820152600e60248201526d139bdd08195d1a08185b5bdd5b9d60921b6044820152606401610b9e565b61117f565b8561117f5760405162461bcd60e51b815260206004820152600f60248201526e139bdd08119a585d08185b5bdd5b9d608a1b6044820152606401610b9e565b6000878152600d60209081526040808320899055600c825280832080546001600160a01b0319166001600160a01b038a16908117909155600e8352818420805460ff19168815151790558782018051600a8552948390206005019490945587519288015193519151909333938c937f1b75ab2a389bbdc3360833f6dccf917fc65fe7e7ddfb0eb49f735cecf628baf59361121c9391908b90615417565b60405180910390a450505050505050565b6000828152600a602052604090206004018054606091908390811061126257634e487b7160e01b600052603260045260246000fd5b906000526020600020018054611277906159d9565b80601f01602080910402602001604051908101604052809291908181526020018280546112a3906159d9565b80156112f05780601f106112c5576101008083540402835291602001916112f0565b820191906000526020600020905b8154815290600101906020018083116112d357829003601f168201915b5050505050905092915050565b6000828152600660205260409020600101546113198133613e34565b610cd48383613e98565b6001600160a01b03811633146113935760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b6064820152608401610b9e565b61139d8282613f1e565b5050565b60005b8251811015610cd457336001600160a01b03166113e78483815181106113da57634e487b7160e01b600052603260045260246000fd5b6020026020010151612080565b6001600160a01b03161461143d5760405162461bcd60e51b815260206004820152601860248201527f596f7520617265206e6f742074686520617070726f76657200000000000000006044820152606401610b9e565b61146e8284838151811061146157634e487b7160e01b600052603260045260246000fd5b6020026020010151610bc3565b8061147881615a14565b9150506113a4565b610cd4838383604051806020016040528060008152506134c6565b3382816114a782612080565b6001600160a01b0316146114cd5760405162461bcd60e51b8152600401610b9e906156ea565b6020830151518351511480156114f6575082515160021015806114f65750600283602001515111155b6115125760405162461bcd60e51b8152600401610b9e9061570d565b61151b84613f85565b6000848152600a60205260408120906115348282614932565b600060018301819055600283018190556003830180546001600160a81b031916905561156490600484019061496c565b60058201600090555050336001600160a01b0316847f4b5dc53104cae632721a6ff5439e47a34cd019bfeb778b0125b64d64c281b5c285600001516000815181106115bf57634e487b7160e01b600052603260045260246000fd5b60200260200101518660000151876020015188604001516040516115e694939291906154ea565b60405180910390a350505050565b6000848152600a60205260409020600301543390859061010090046001600160a01b031682148061163e5750816001600160a01b031661163382612080565b6001600160a01b0316145b61165a5760405162461bcd60e51b8152600401610b9e906156a8565b600086816000828152600a602052604090206003015460ff16600b81111561169257634e487b7160e01b600052602160045260246000fd5b14156116b05760405162461bcd60e51b8152600401610b9e90615764565b6000871180156116d057506000888152600a602052604090206001015487105b6117115760405162461bcd60e51b8152602060048201526012602482015271496e76616c6964205765696768746c6f737360701b6044820152606401610b9e565b60208501515185515114801561173a5750845151600210158061173a5750600285602001515111155b6117565760405162461bcd60e51b8152600401610b9e9061562e565b6000888152600a602090815260408220600401805460018101825590835291819020885161178b93919091019189019061498a565b506000888152600a60205260408120600101546117a990899061597f565b60008a8152600a6020526040808220600181018490559089015160059091015587518051929350916117eb57634e487b7160e01b600052603260045260246000fd5b6020026020010151336001600160a01b03168a7f0de5290eb91da735ef493eb75b75cb8398c596fc092f374beb7de0b279106ad589600001518a602001518b60400151878e604051611841959493929190615455565b60405180910390a4505050505050505050565b33838161186082612080565b6001600160a01b0316146118865760405162461bcd60e51b8152600401610b9e906156ea565b600085816000828152600a602052604090206003015460ff16600b8111156118be57634e487b7160e01b600052602160045260246000fd5b14156118dc5760405162461bcd60e51b8152600401610b9e90615764565b60038651111580156118ef575060018651115b6119315760405162461bcd60e51b81526020600482015260136024820152724d617820332c204d696e203220746f6b656e7360681b6044820152606401610b9e565b60208501515185515114801561195a5750845151600210158061195a5750600285602001515111155b6119765760405162461bcd60e51b8152600401610b9e9061570d565b6000865160016119869190615934565b6001600160401b038111156119ab57634e487b7160e01b600052604160045260246000fd5b6040519080825280602002602001820160405280156119d4578160200160208202803683370190505b50905087816000815181106119f957634e487b7160e01b600052603260045260246000fd5b6020026020010181815250506000600a60008a81526020019081526020016000206040518060e0016040529081600082018054611a35906159d9565b80601f0160208091040260200160405190810160405280929190818152602001828054611a61906159d9565b8015611aae5780601f10611a8357610100808354040283529160200191611aae565b820191906000526020600020905b815481529060010190602001808311611a9157829003601f168201915b50505091835250506001820154602082015260028201546040820152600382015460609091019060ff16600b811115611af757634e487b7160e01b600052602160045260246000fd5b600b811115611b1657634e487b7160e01b600052602160045260246000fd5b8152600382015461010090046001600160a01b0316602080830191909152600483018054604080518285028101850182528281529401939260009084015b82821015611c00578382906000526020600020018054611b73906159d9565b80601f0160208091040260200160405190810160405280929190818152602001828054611b9f906159d9565b8015611bec5780601f10611bc157610100808354040283529160200191611bec565b820191906000526020600020905b815481529060010190602001808311611bcf57829003601f168201915b505050505081526020019060010190611b54565b50505050815260200160058201548152505090506000805b8951811015611cd857898181518110611c4157634e487b7160e01b600052603260045260246000fd5b602002602001015160001415611c915760405162461bcd60e51b81526020600482015260156024820152740506172746974696f6e732063616e2774206265203605c1b6044820152606401610b9e565b898181518110611cb157634e487b7160e01b600052603260045260246000fd5b602002602001015182611cc49190615934565b915080611cd081615a14565b915050611c18565b5060008a8152600a60205260409020600101548114611d395760405162461bcd60e51b815260206004820152601760248201527f496e636f72726563742073756d206f6620616d6f756e740000000000000000006044820152606401610b9e565b611d438a8961149b565b60005b8951811015611de257611d9883600001518b8381518110611d7757634e487b7160e01b600052603260045260246000fd5b60200260200101518560400151866060015187608001518860a00151614020565b60085484611da7836001615934565b81518110611dc557634e487b7160e01b600052603260045260246000fd5b602090810291909101015280611dda81615a14565b915050611d46565b50336001600160a01b03168a7f0efcd01882c599f19b0991d3d113428582d6593bc7cd14b33dfd2f949a51f4c085604051611e1d91906154a6565b60405180910390a3611e2d614a0e565b5050505050505050505050565b6000848152600a60205260409020600301543390859061010090046001600160a01b0316821480611e845750816001600160a01b0316611e7982612080565b6001600160a01b0316145b611ea05760405162461bcd60e51b8152600401610b9e906156a8565b600086816000828152600a602052604090206003015460ff16600b811115611ed857634e487b7160e01b600052602160045260246000fd5b1415611ef65760405162461bcd60e51b8152600401610b9e90615764565b602085015151855151148015611f1f57508451516002101580611f1f5750600285602001515111155b611f3b5760405162461bcd60e51b8152600401610b9e9061562e565b6000888152600a602052604090206003018054610100600160a81b031981166101006001600160a01b038b160290811783558892916001600160a81b03191660ff1990911617600183600b811115611fa357634e487b7160e01b600052602160045260246000fd5b021790555060408086015160008a8152600a602052918220600501558551805133928b927fedeee9aed78718d2a4fc664fe842d7a180deb1de9a8edc48901d213bd32443079290919061200657634e487b7160e01b600052603260045260246000fd5b6020026020010151886000015189602001518a604001518c8e60405161203196959493929190615527565b60405180910390a35050505050505050565b61204c3361101a565b6120685760405162461bcd60e51b8152600401610b9e90615735565b610d16600080516020615abc83398151915282613aab565b6000818152600260205260408120546001600160a01b031680610a915760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201526832b73a103a37b5b2b760b91b6064820152608401610b9e565b6002600754141561211a5760405162461bcd60e51b8152600401610b9e906157de565b6002600755602081015151815151148015612148575080515160021015806121485750600281602001515111155b6121645760405162461bcd60e51b8152600401610b9e9061562e565b816121fc573483101580156121795750600083115b6121c55760405162461bcd60e51b815260206004820152601760248201527f50726f6d6973656420746f2070617920696e20466961740000000000000000006044820152606401610b9e565b6040516001600160a01b038516903480156108fc02916000818181858888f193505050501580156121fa573d6000803e3d6000fd5b505b336001600160a01b0316846001600160a01b0316867f259239d3edd4e6a630db0d6ab72e61bbf8a03a02a90bca16ec882f201ad71d76846000015160008151811061225757634e487b7160e01b600052603260045260246000fd5b60200260200101518560000151866020015187604001518a8a604051610fa596959493929190615584565b61228b3361101a565b6122a75760405162461bcd60e51b8152600401610b9e90615735565b610d166000826112fd565b60006001600160a01b03821661231d5760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604482015269726f206164647265737360b01b6064820152608401610b9e565b506001600160a01b031660009081526003602052604090205490565b6000612353600080516020615a9c83398151915283612605565b80610a915750610a91600083612605565b61236d3361101a565b6123895760405162461bcd60e51b8152600401610b9e90615735565b610d16600080516020615adc83398151915282613aab565b6123aa33613a91565b61240b5760405162461bcd60e51b815260206004820152602c60248201527f5265737472696374656420746f20496e666f726d6174696f6e48616e646c657260448201526b399037b91030b236b4b7399760a11b6064820152608401610b9e565b805183511461242c5760405162461bcd60e51b8152600401610b9e9061570d565b602082015151825151148015612455575081515160021015806124555750600282602001515111155b6124715760405162461bcd60e51b8152600401610b9e9061562e565b60005b83518110156125c25781818151811061249d57634e487b7160e01b600052603260045260246000fd5b6020026020010151600a60008684815181106124c957634e487b7160e01b600052603260045260246000fd5b6020026020010151815260200190815260200160002060050181905550336001600160a01b031684828151811061251057634e487b7160e01b600052603260045260246000fd5b60200260200101517ffdbdbc05573951e8f00387285b7bd65b2bdcf225715eb729087d35b35bc2fe9b856000015160008151811061255e57634e487b7160e01b600052603260045260246000fd5b60200260200101518660000151876020015187878151811061259057634e487b7160e01b600052603260045260246000fd5b60200260200101516040516125a894939291906154ea565b60405180910390a3806125ba81615a14565b915050612474565b50505050565b6125d13361101a565b6125ed5760405162461bcd60e51b8152600401610b9e90615735565b610d16600080516020615a9c83398151915282613aab565b60009182526006602090815260408084206001600160a01b0393909316845291905290205460ff1690565b606060018054610aa6906159d9565b6000612353600080516020615adc83398151915283612605565b6001825111801561266c57506003825111155b6126b85760405162461bcd60e51b815260206004820152601c60248201527f4d6178696d756d2062617463683a20332c206d696e696d756d3a2032000000006044820152606401610b9e565b6020810151518151511480156126e1575080515160021015806126e15750600281602001515111155b6126fd5760405162461bcd60e51b8152600401610b9e9061562e565b60008060006040518060e00160405280600a60008860008151811061273257634e487b7160e01b600052603260045260246000fd5b602002602001015181526020019081526020016000206000018054612756906159d9565b80601f0160208091040260200160405190810160405280929190818152602001828054612782906159d9565b80156127cf5780601f106127a4576101008083540402835291602001916127cf565b820191906000526020600020905b8154815290600101906020018083116127b257829003601f168201915b5050505050815260200160008152602001600a60008860008151811061280557634e487b7160e01b600052603260045260246000fd5b60200260200101518152602001908152602001600020600201548152602001600a60008860008151811061284957634e487b7160e01b600052603260045260246000fd5b60209081029190910181015182528101919091526040016000206003015460ff16600b81111561288957634e487b7160e01b600052602160045260246000fd5b8152602001600a6000886000815181106128b357634e487b7160e01b600052603260045260246000fd5b6020026020010151815260200190815260200160002060030160019054906101000a90046001600160a01b03166001600160a01b03168152602001600a60008860008151811061291357634e487b7160e01b600052603260045260246000fd5b60200260200101518152602001908152602001600020600401805480602002602001604051908101604052809291908181526020016000905b828210156129f857838290600052602060002001805461296b906159d9565b80601f0160208091040260200160405190810160405280929190818152602001828054612997906159d9565b80156129e45780601f106129b9576101008083540402835291602001916129e4565b820191906000526020600020905b8154815290600101906020018083116129c757829003601f168201915b50505050508152602001906001019061294c565b505050508152602001848152509050600081604051602001612a1a9190615815565b604051602081830303815290604052805190602001209050600086516001612a429190615934565b6001600160401b03811115612a6757634e487b7160e01b600052604160045260246000fd5b604051908082528060200260200182016040528015612a90578160200160208202803683370190505b50905060005b875181101561308357336001600160a01b0316612acc8983815181106113da57634e487b7160e01b600052603260045260246000fd5b6001600160a01b031614612b115760405162461bcd60e51b815260206004820152600c60248201526b155b985d5d1a1bdc9a5e995960a21b6044820152606401610b9e565b6000600a60008a8481518110612b3757634e487b7160e01b600052603260045260246000fd5b60209081029190910181015182528101919091526040016000206003015460ff16600b811115612b7757634e487b7160e01b600052602160045260246000fd5b1415612bb55760405162461bcd60e51b815260206004820152600d60248201526c496e76616c696420537461746560981b6044820152606401610b9e565b60006040518060e00160405280600a60008c8681518110612be657634e487b7160e01b600052603260045260246000fd5b602002602001015181526020019081526020016000206000018054612c0a906159d9565b80601f0160208091040260200160405190810160405280929190818152602001828054612c36906159d9565b8015612c835780601f10612c5857610100808354040283529160200191612c83565b820191906000526020600020905b815481529060010190602001808311612c6657829003601f168201915b5050505050815260200160008152602001600a60008c8681518110612cb857634e487b7160e01b600052603260045260246000fd5b60200260200101518152602001908152602001600020600201548152602001600a60008c8681518110612cfb57634e487b7160e01b600052603260045260246000fd5b60209081029190910181015182528101919091526040016000206003015460ff16600b811115612d3b57634e487b7160e01b600052602160045260246000fd5b8152602001600a60008c8681518110612d6457634e487b7160e01b600052603260045260246000fd5b6020026020010151815260200190815260200160002060030160019054906101000a90046001600160a01b03166001600160a01b03168152602001600a60008c8681518110612dc357634e487b7160e01b600052603260045260246000fd5b60200260200101518152602001908152602001600020600401805480602002602001604051908101604052809291908181526020016000905b82821015612ea8578382906000526020600020018054612e1b906159d9565b80601f0160208091040260200160405190810160405280929190818152602001828054612e47906159d9565b8015612e945780601f10612e6957610100808354040283529160200191612e94565b820191906000526020600020905b815481529060010190602001808311612e7757829003601f168201915b505050505081526020019060010190612dfc565b50505050815260200188815250905080604051602001612ec89190615815565b604051602081830303815290604052805190602001208414612f1b5760405162461bcd60e51b815260206004820152600c60248201526b125b9d985b1a59081413919560a21b6044820152606401610b9e565b888281518110612f3b57634e487b7160e01b600052603260045260246000fd5b6020026020010151838381518110612f6357634e487b7160e01b600052603260045260246000fd5b602002602001018181525050600a60008a8481518110612f9357634e487b7160e01b600052603260045260246000fd5b602002602001015181526020019081526020016000206001015486612fb89190615934565b9550612feb898381518110612fdd57634e487b7160e01b600052603260045260246000fd5b60200260200101518961149b565b600a60008a848151811061300f57634e487b7160e01b600052603260045260246000fd5b60200260200101518152602001908152602001600020600080820160006130369190614932565b600060018301819055600283018190556003830180546001600160a81b031916905561306690600484019061496c565b50600060059190910155508061307b81615a14565b915050612a96565b506130a68360000151858560400151866060015187608001518860a00151614020565b600854818851815181106130ca57634e487b7160e01b600052603260045260246000fd5b602002602001018181525050336001600160a01b03167fea5425d523a6d590132943fc2b95afa0695f7310acdad1457216ffba0580edb28260405161310f91906154a6565b60405180910390a250505050505050565b6131293361101a565b6131455760405162461bcd60e51b8152600401610b9e90615735565b610d16600080516020615a9c833981519152826112fd565b600a60205260009081526040902080548190613178906159d9565b80601f01602080910402602001604051908101604052809291908181526020018280546131a4906159d9565b80156131f15780601f106131c6576101008083540402835291602001916131f1565b820191906000526020600020905b8154815290600101906020018083116131d457829003601f168201915b505050506001830154600284015460038501546005909501549394919390925060ff82169161010090046001600160a01b03169086565b61139d3383836141f2565b61323c33612339565b6132945760405162461bcd60e51b815260206004820152602360248201527f5265737472696374656420746f2046546f6b656e697a6572206f722061646d6960448201526237399760e91b6064820152608401610b9e565b600083116132d85760405162461bcd60e51b815260206004820152601160248201527005765696768742063616e2774206265203607c1b6044820152606401610b9e565b604080516001808252818301909252600091816020015b60608152602001906001900390816132ef5790505090506040518060400160405280600381526020016252617760e81b8152508160008151811061334357634e487b7160e01b600052603260045260246000fd5b602002602001018190525061335c600880546001019055565b600061336760085490565b905061337333826142c1565b6040805160e081018252878152602080820188905281830187905260006060830181905233608084015260a0830186905260c08301819052848152600a82529290922081518051929391926133cb928492019061498a565b50602082015181600101556040820151816002015560608201518160030160006101000a81548160ff0219169083600b81111561341857634e487b7160e01b600052602160045260246000fd5b021790555060808201516003820180546001600160a01b0390921661010002610100600160a81b031990921691909117905560a08201518051613465916004840191602090910190614a6d565b5060c0820151816005015590505061347c81614403565b336001600160a01b0316817fcf832bb5dc6b042772da28aae6ff0e3b380c924268b4aef923c89dbf27786351856040516134b691906155d0565b60405180910390a3505050505050565b6134d03383613d3d565b6134ec5760405162461bcd60e51b8152600401610b9e9061578d565b6125c2848484846144a8565b33848161350482612080565b6001600160a01b03161461352a5760405162461bcd60e51b8152600401610b9e906156ea565b600085116135675760405162461bcd60e51b815260206004820152600a602482015269043616e277420626520360b41b6044820152606401610b9e565b828414156135ac5760405162461bcd60e51b815260206004820152601260248201527124b73b30b634b21021b7b73b32b939b4b7b760711b6044820152606401610b9e565b6000868152600a602052604090206002015484146136025760405162461bcd60e51b8152602060048201526013602482015272125b9d985b1a590813585d18da0e881d5b9a5d606a1b6044820152606401610b9e565b6000868152600a6020908152604091829020600181018890556002018590558151868152908101859052869188917f4e1f8601a03fdbbc86a16e28caede62143afc8f04f10a78f04b0d4ded0e69e8691016134b6565b6000818152600260205260409020546060906001600160a01b03166136d75760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201526e3732bc34b9ba32b73a103a37b5b2b760891b6064820152608401610b9e565b600061371360408051808201909152601a81527f687474703a2f2f7472616465636f696e2e6e6c2f7661756c742f000000000000602082015290565b90506000815111613733576040518060200160405280600081525061375e565b8061373d846144db565b60405160200161374e929190615300565b6040516020818303038152906040525b9392505050565b61376e3361263f565b6137cb5760405162461bcd60e51b815260206004820152602860248201527f5265737472696374656420746f2050726f6475637448616e646c657273206f726044820152671030b236b4b7399760c11b6064820152608401610b9e565b600082816000828152600a602052604090206003015460ff16600b81111561380357634e487b7160e01b600052602160045260246000fd5b146138205760405162461bcd60e51b8152600401610b9e90615764565b600260075414156138435760405162461bcd60e51b8152600401610b9e906157de565b60026007556000848152600c60205260409020546001600160a01b031633146138ae5760405162461bcd60e51b815260206004820152601f60248201527f596f7520646f6e277420686176652074686520726967687420746f20706179006044820152606401610b9e565b6000848152600d60205260409020543410156139055760405162461bcd60e51b81526020600482015260166024820152750b2deea40c8d2c840dcdee840e0c2f240cadcdeeaced60531b6044820152606401610b9e565b60208301515183515114801561392e5750825151600210158061392e5750600283602001515111155b61394a5760405162461bcd60e51b8152600401610b9e9061562e565b600061395585612080565b6000868152600e602052604090205490915060ff16613a00576000858152600d60205260409020546139c95760405162461bcd60e51b815260206004820152601e60248201527f54686973206973206e6f74206c697374656420617320616e206f6666657200006044820152606401610b9e565b6040516001600160a01b038216903480156108fc02916000818181858888f193505050501580156139fe573d6000803e3d6000fd5b505b613a0b813387613ba1565b6000858152600d60209081526040808320839055600c825280832080546001600160a01b0319169055600a825291829020600301805460ff1916600117905585519086015186830151925133936001600160a01b038616938a937fc1ebddee4d77ec41b96882ea791fbe13f1063516d0a550365e79a2c1f4fa9b1b93610fa593906153e1565b6000612353600080516020615abc83398151915283612605565b600082815260066020526040902060010154613ac78133613e34565b610cd48383613f1e565b613ada3361101a565b613af65760405162461bcd60e51b8152600401610b9e90615735565b610d16600080516020615adc833981519152826112fd565b60006001600160e01b03198216637965db0b60e01b1480610a915750610a91826145f4565b600081815260046020526040902080546001600160a01b0319166001600160a01b0384169081179091558190613b6882612080565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b826001600160a01b0316613bb482612080565b6001600160a01b031614613c185760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b6064820152608401610b9e565b6001600160a01b038216613c7a5760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608401610b9e565b613c85600082613b33565b6001600160a01b0383166000908152600360205260408120805460019290613cae90849061597f565b90915550506001600160a01b0382166000908152600360205260408120805460019290613cdc908490615934565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6000818152600260205260408120546001600160a01b0316613db65760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b6064820152608401610b9e565b6000613dc183612080565b9050806001600160a01b0316846001600160a01b03161480613dfc5750836001600160a01b0316613df184610b29565b6001600160a01b0316145b80613e2c57506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b949350505050565b613e3e8282612605565b61139d57613e56816001600160a01b03166014614644565b613e61836020614644565b604051602001613e7292919061532f565b60408051601f198184030181529082905262461bcd60e51b8252610b9e916004016155d0565b613ea28282612605565b61139d5760008281526006602090815260408083206001600160a01b03851684529091529020805460ff19166001179055613eda3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b613f288282612605565b1561139d5760008281526006602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b6000613f9082612080565b9050613f9d600083613b33565b6001600160a01b0381166000908152600360205260408120805460019290613fc690849061597f565b909155505060008281526002602052604080822080546001600160a01b0319169055518391906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b846140635760405162461bcd60e51b8152602060048201526013602482015272125b9cdd59999a58da595b9d08105b5bdd5b9d606a1b6044820152606401610b9e565b614071600880546001019055565b600061407c60085490565b905061408833826142c1565b6040518060e0016040528088815260200187815260200186815260200185600b8111156140c557634e487b7160e01b600052602160045260246000fd5b81526001600160a01b038516602080830191909152604080830186905260006060909301839052848352600a825290912082518051919261410b9284929091019061498a565b50602082015181600101556040820151816002015560608201518160030160006101000a81548160ff0219169083600b81111561415857634e487b7160e01b600052602160045260246000fd5b021790555060808201516003820180546001600160a01b0390921661010002610100600160a81b031990921691909117905560a082015180516141a5916004840191602090910190614a6d565b5060c082015181600501559050506141bc81614403565b604051339082907f8cee4fca8298d98d9137f53d00920fbe667539eeaa7ae1dba71f7942e0515f7790600090a350505050505050565b816001600160a01b0316836001600160a01b031614156142545760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610b9e565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6001600160a01b0382166143175760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610b9e565b6000818152600260205260409020546001600160a01b03161561437c5760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610b9e565b6001600160a01b03821660009081526003602052604081208054600192906143a5908490615934565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b6000818152600260205260409020546001600160a01b031661447c5760405162461bcd60e51b815260206004820152602c60248201527f4552433732314d657461646174613a2055524920736574206f66206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b6064820152608401610b9e565b614485816144db565b6000828152600b60209081526040909120825161139d939192919091019061498a565b6144b3848484613ba1565b6144bf84848484614825565b6125c25760405162461bcd60e51b8152600401610b9e90615656565b6060816144ff5750506040805180820190915260018152600360fc1b602082015290565b8160005b8115614529578061451381615a14565b91506145229050600a8361594c565b9150614503565b6000816001600160401b0381111561455157634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f19166020018201604052801561457b576020820181803683370190505b5090505b8415613e2c5761459060018361597f565b915061459d600a86615a2f565b6145a8906030615934565b60f81b8183815181106145cb57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a9053506145ed600a8661594c565b945061457f565b60006001600160e01b031982166380ac58cd60e01b148061462557506001600160e01b03198216635b5e139f60e01b145b80610a9157506301ffc9a760e01b6001600160e01b0319831614610a91565b60606000614653836002615960565b61465e906002615934565b6001600160401b0381111561468357634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f1916602001820160405280156146ad576020820181803683370190505b509050600360fc1b816000815181106146d657634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350600f60fb1b8160018151811061471357634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a9053506000614737846002615960565b614742906001615934565b90505b60018111156147d6576f181899199a1a9b1b9c1cb0b131b232b360811b85600f166010811061478457634e487b7160e01b600052603260045260246000fd5b1a60f81b8282815181106147a857634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a90535060049490941c936147cf816159c2565b9050614745565b50831561375e5760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610b9e565b60006001600160a01b0384163b1561492757604051630a85bd0160e11b81526001600160a01b0385169063150b7a02906148699033908990889088906004016153a4565b602060405180830381600087803b15801561488357600080fd5b505af19250505080156148b3575060408051601f3d908101601f191682019092526148b091810190614f67565b60015b61490d573d8080156148e1576040519150601f19603f3d011682016040523d82523d6000602084013e6148e6565b606091505b5080516149055760405162461bcd60e51b8152600401610b9e90615656565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050613e2c565b506001949350505050565b50805461493e906159d9565b6000825580601f1061494e575050565b601f016020900490600052602060002090810190610d169190614ac6565b5080546000825590600052602060002090810190610d169190614adb565b828054614996906159d9565b90600052602060002090601f0160209004810192826149b857600085556149fe565b82601f106149d157805160ff19168380011785556149fe565b828001600101855582156149fe579182015b828111156149fe5782518255916020019190600101906149e3565b50614a0a929150614ac6565b5090565b6040518060e001604052806060815260200160008152602001600080191681526020016000600b811115614a5257634e487b7160e01b600052602160045260246000fd5b81526000602082018190526060604083018190529091015290565b828054828255906000526020600020908101928215614aba579160200282015b82811115614aba5782518051614aaa91849160209091019061498a565b5091602001919060010190614a8d565b50614a0a929150614adb565b5b80821115614a0a5760008155600101614ac7565b80821115614a0a576000614aef8282614932565b50600101614adb565b60006001600160401b03831115614b1157614b11615a6f565b614b24601f8401601f19166020016158e1565b9050828152838383011115614b3857600080fd5b828260208301376000602084830101529392505050565b80356001600160a01b0381168114614b6657600080fd5b919050565b600082601f830112614b7b578081fd5b81356020614b90614b8b83615911565b6158e1565b80838252828201915082860187848660051b8901011115614baf578586fd5b855b85811015614bcd57813584529284019290840190600101614bb1565b5090979650505050505050565b80358015158114614b6657600080fd5b600082601f830112614bfa578081fd5b61375e83833560208501614af8565b600060608284031215614c1a578081fd5b604051606081016001600160401b038282108183111715614c3d57614c3d615a6f565b816040528293508435915080821115614c5557600080fd5b614c6186838701614b6b565b83526020850135915080821115614c7757600080fd5b50614c8485828601614b6b565b602083015250604083013560408201525092915050565b600060208284031215614cac578081fd5b61375e82614b4f565b60008060408385031215614cc7578081fd5b614cd083614b4f565b9150614cde60208401614b4f565b90509250929050565b600080600060608486031215614cfb578081fd5b614d0484614b4f565b9250614d1260208501614b4f565b9150604084013590509250925092565b60008060008060808587031215614d37578081fd5b614d4085614b4f565b9350614d4e60208601614b4f565b92506040850135915060608501356001600160401b03811115614d6f578182fd5b8501601f81018713614d7f578182fd5b614d8e87823560208401614af8565b91505092959194509250565b60008060408385031215614dac578182fd5b614db583614b4f565b9150614cde60208401614bda565b60008060408385031215614dd5578182fd5b614dde83614b4f565b946020939093013593505050565b60008060408385031215614dfe578182fd5b82356001600160401b03811115614e13578283fd5b614e1f85828601614b6b565b925050614cde60208401614b4f565b60008060408385031215614e40578182fd5b82356001600160401b0380821115614e56578384fd5b614e6286838701614b6b565b93506020850135915080821115614e77578283fd5b50614e8485828601614c09565b9150509250929050565b600080600060608486031215614ea2578081fd5b83356001600160401b0380821115614eb8578283fd5b614ec487838801614b6b565b94506020860135915080821115614ed9578283fd5b614ee587838801614c09565b93506040860135915080821115614efa578283fd5b50614f0786828701614b6b565b9150509250925092565b600060208284031215614f22578081fd5b5035919050565b60008060408385031215614f3b578182fd5b82359150614cde60208401614b4f565b600060208284031215614f5c578081fd5b813561375e81615a85565b600060208284031215614f78578081fd5b815161375e81615a85565b60008060008060808587031215614f98578182fd5b84356001600160401b0380821115614fae578384fd5b614fba88838901614bea565b955060208701359450604087013593506060870135915080821115614fdd578283fd5b50614d8e87828801614bea565b60008060008060808587031215614fff578182fd5b8435935061500f60208601614b4f565b92506040850135600c8110615022578283fd5b915060608501356001600160401b0381111561503c578182fd5b614d8e87828801614c09565b600080600080600060a0868803121561505f578283fd5b8535945061506f60208701614b4f565b93506040860135925061508460608701614bda565b915060808601356001600160401b0381111561509e578182fd5b6150aa88828901614c09565b9150509295509295909350565b6000806000606084860312156150cb578081fd5b8335925060208401356001600160401b03808211156150e8578283fd5b6150f487838801614b6b565b93506040860135915080821115615109578283fd5b50614f0786828701614c09565b60008060408385031215615128578182fd5b8235915060208301356001600160401b03811115615144578182fd5b614e8485828601614c09565b60008060408385031215615162578182fd5b50508035926020909101359150565b600080600080600060a08688031215615188578283fd5b853594506020860135935061519f60408701614b4f565b925060608601356001600160401b038111156151b9578182fd5b6151c588828901614c09565b9250506151d460808701614bda565b90509295509295909350565b600080600080608085870312156151f5578182fd5b5050823594602084013594506040840135936060013592509050565b60008060008060808587031215615226578182fd5b843593506020850135925060408501356001600160401b038082111561524a578384fd5b61525688838901614bea565b9350606087013591508082111561526b578283fd5b50614d8e87828801614c09565b6000815180845260208085019450808401835b838110156152a75781518752958201959082019060010161528b565b509495945050505050565b600081518084526152ca816020860160208601615996565b601f01601f19169290920160200192915050565b600c81106152fc57634e487b7160e01b600052602160045260246000fd5b9052565b60008351615312818460208801615996565b835190830190615326818360208801615996565b01949350505050565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351615367816017850160208801615996565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351615398816028840160208801615996565b01602801949350505050565b6001600160a01b03858116825284166020820152604081018390526080606082018190526000906153d7908301846152b2565b9695505050505050565b6060815260006153f46060830186615278565b82810360208401526154068186615278565b915050826040830152949350505050565b60808152600061542a6080830187615278565b828103602084015261543c8187615278565b6040840195909552505090151560609091015292915050565b60a08152600061546860a0830188615278565b828103602084015261547a8188615278565b9050856040840152846060840152828103608084015261549a81856152b2565b98975050505050505050565b6020808252825182820181905260009190848201906040850190845b818110156154de578351835292840192918401916001016154c2565b50909695505050505050565b8481526080602082015260006155036080830186615278565b82810360408401526155158186615278565b91505082606083015295945050505050565b86815260c06020820152600061554060c0830188615278565b82810360408401526155528188615278565b91505084606083015261556860808301856152de565b6001600160a01b039290921660a0919091015295945050505050565b86815260c06020820152600061559d60c0830188615278565b82810360408401526155af8188615278565b606084019690965250506080810192909252151560a0909101529392505050565b60208152600061375e60208301846152b2565b60c0815260006155f660c08301896152b2565b905086602083015285604083015261561160608301866152de565b6001600160a01b0393909316608082015260a00152949350505050565b6020808252600e908201526d092dcecc2d8d2c840d8cadccee8d60931b604082015260600190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b60208082526022908201527f4e6f7420746865204f776e6572206e6f722063757272656e742048616e646c65604082015261391760f11b606082015260800190565b6020808252600990820152682737ba1027bbb732b960b91b604082015260600190565b6020808252600e908201526d092dcecc2d8d2c84098cadccee8d60931b604082015260600190565b6020808252601590820152742932b9ba3934b1ba32b2103a379030b236b4b7399760591b604082015260600190565b6020808252600f908201526e496e636f727265637420537461746560881b604082015260600190565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b6020808252601f908201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604082015260600190565b60006020808352835160e0828501526158326101008501826152b2565b905081850151604085015260408501516060850152606085015161585960808601826152de565b5060808501516001600160a01b031660a085810191909152850151848203601f1990810160c087015281518084529184019184840190600581901b85018601875b828110156158c657848783030184526158b48287516152b2565b9588019593880193915060010161589a565b5060c08a015160e08a01528097505050505050505092915050565b604051601f8201601f191681016001600160401b038111828210171561590957615909615a6f565b604052919050565b60006001600160401b0382111561592a5761592a615a6f565b5060051b60200190565b6000821982111561594757615947615a43565b500190565b60008261595b5761595b615a59565b500490565b600081600019048311821515161561597a5761597a615a43565b500290565b60008282101561599157615991615a43565b500390565b60005b838110156159b1578181015183820152602001615999565b838111156125c25750506000910152565b6000816159d1576159d1615a43565b506000190190565b600181811c908216806159ed57607f821691505b60208210811415615a0e57634e487b7160e01b600052602260045260246000fd5b50919050565b6000600019821415615a2857615a28615a43565b5060010190565b600082615a3e57615a3e615a59565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160e01b031981168114610d1657600080fdfee70d28ebd9d7d9a3dd77d46ae2481f301c80806f395b08de31d8e095b1c46cee8da7d70244203c30977cc84bc73c56df770db659eae5eae031338bf752ed6b187d516c105bee30cf3879df4b9a7cf2e17d81aa2e2cd673a2f488a1d6fadd45eca264697066735822122031efb0b1c79ba5fbf2e485ea2221d9e38dbec3fa31e32f0eef3ca1e5090dbf4f64736f6c63430008040033",
  "linkReferences": {},
  "deployedLinkReferences": {}
}
)