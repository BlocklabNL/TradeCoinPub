exports.default = (address) => ({
  "_format": "hh-sol-artifact-1",
  "contractName": "TradeCoinCompositionContract",
  "sourceName": "contracts/TradeCoinCompositionContract.sol",
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
        },
        {
          "internalType": "address",
          "name": "_tradeCoin",
          "type": "address"
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
          "internalType": "uint256",
          "name": "tokenIdOfProduct",
          "type": "uint256"
        }
      ],
      "name": "AppendProductToCompositionEvent",
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
          "internalType": "enum TradeCoinCompositionContract.State",
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
          "name": "functionCaller",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "productIds",
          "type": "uint256[]"
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
      "name": "CreateCompositionEvent",
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
          "name": "productIds",
          "type": "uint256[]"
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
      "name": "DecompositionEvent",
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
          "internalType": "uint256",
          "name": "tokenIdOfProduct",
          "type": "uint256"
        }
      ],
      "name": "RemoveProductFromCompositionEvent",
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
          "internalType": "struct TradeCoinCompositionContract.Documents",
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
          "internalType": "struct TradeCoinCompositionContract.Documents",
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
          "internalType": "uint256",
          "name": "_tokenIdComposition",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_tokenIdTC",
          "type": "uint256"
        }
      ],
      "name": "appendProductToComposition",
      "outputs": [],
      "stateMutability": "nonpayable",
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
          "internalType": "struct TradeCoinCompositionContract.Documents",
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
          "internalType": "enum TradeCoinCompositionContract.State",
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
          "internalType": "struct TradeCoinCompositionContract.Documents",
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
      "inputs": [
        {
          "internalType": "string",
          "name": "_compositionName",
          "type": "string"
        },
        {
          "internalType": "uint256[]",
          "name": "_tokenIdsOfTC",
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
          "internalType": "struct TradeCoinCompositionContract.Documents",
          "name": "_documents",
          "type": "tuple"
        }
      ],
      "name": "createComposition",
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
          "internalType": "struct TradeCoinCompositionContract.Documents",
          "name": "_documents",
          "type": "tuple"
        }
      ],
      "name": "decomposition",
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
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "getIdsOfComposite",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
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
          "internalType": "uint256",
          "name": "_tokenIdComposition",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_indexTokenIdTC",
          "type": "uint256"
        }
      ],
      "name": "removeProductFromComposition",
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
      "inputs": [],
      "name": "tradeCoin",
      "outputs": [
        {
          "internalType": "contract TradeCoinContract",
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
      "name": "tradeCoinComposition",
      "outputs": [
        {
          "internalType": "string",
          "name": "composition",
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
          "internalType": "enum TradeCoinCompositionContract.State",
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
  "bytecode": "0x60806040523480156200001157600080fd5b506040516200479f3803806200479f833981016040819052620000349162000388565b33838381600090805190602001906200004f9291906200022f565b508051620000659060019060208401906200022f565b50620000779150600090508262000130565b620000a47fe70d28ebd9d7d9a3dd77d46ae2481f301c80806f395b08de31d8e095b1c46cee600062000140565b620000d17f7d516c105bee30cf3879df4b9a7cf2e17d81aa2e2cd673a2f488a1d6fadd45ec600062000140565b620000fe7f8da7d70244203c30977cc84bc73c56df770db659eae5eae031338bf752ed6b18600062000140565b506001600755600980546001600160a01b0319166001600160a01b0392909216919091179055505043600f5562000464565b6200013c82826200018b565b5050565b600082815260066020526040808220600101805490849055905190918391839186917fbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff9190a4505050565b60008281526006602090815260408083206001600160a01b038516845290915290205460ff166200013c5760008281526006602090815260408083206001600160a01b03851684529091529020805460ff19166001179055620001eb3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b8280546200023d9062000411565b90600052602060002090601f016020900481019282620002615760008555620002ac565b82601f106200027c57805160ff1916838001178555620002ac565b82800160010185558215620002ac579182015b82811115620002ac5782518255916020019190600101906200028f565b50620002ba929150620002be565b5090565b5b80821115620002ba5760008155600101620002bf565b600082601f830112620002e6578081fd5b81516001600160401b03808211156200030357620003036200044e565b604051601f8301601f19908116603f011681019082821181831017156200032e576200032e6200044e565b816040528381526020925086838588010111156200034a578485fd5b8491505b838210156200036d57858201830151818301840152908201906200034e565b838211156200037e57848385830101525b9695505050505050565b6000806000606084860312156200039d578283fd5b83516001600160401b0380821115620003b4578485fd5b620003c287838801620002d5565b94506020860151915080821115620003d8578384fd5b50620003e786828701620002d5565b604086015190935090506001600160a01b038116811462000406578182fd5b809150509250925092565b600181811c908216806200042657607f821691505b602082108114156200044857634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b61432b80620004746000396000f3fe608060405234801561001057600080fd5b50600436106103275760003560e01c80636f589053116101b85780639d4ba5ff11610104578063c87b56dd116100a2578063d58e36e01161007c578063d58e36e014610762578063e985e9c514610777578063e9e9a6b3146107b3578063f1ead071146107c857600080fd5b8063c87b56dd14610729578063d52c9a401461073c578063d547741f1461074f57600080fd5b8063a22cb465116100de578063a22cb465146106dd578063b88d4fde146106f0578063c29278f414610703578063c84eebd31461071657600080fd5b80639d4ba5ff146106af5780639e0bdea5146106c2578063a217fddf146106d557600080fd5b8063758b389111610171578063909592b81161014b578063909592b81461065c57806391d148541461068157806395d89b411461069457806397d0a85a1461069c57600080fd5b8063758b3891146106235780637aac74cc1461063657806385fb92ac1461064957600080fd5b80636f589053146105ab57806370480275146105ce57806370a08231146105e157806371fdc7ac146105f45780637314b0f71461060757806373fc84201461061a57600080fd5b80633a962a191161027757806357daa600116102305780636352211e1161020a5780636352211e1461052c578063682e67e81461053f57806368728f92146105625780636c3ec55a1461058b57600080fd5b806357daa600146104f357806358d6dd8f1461050657806362da725c1461051957600080fd5b80633a962a191461047457806342842e0e146104875780634406257a1461049a578063462be15d146104ad5780634b7d4fef146104c0578063542c7c0a146104d357600080fd5b80631785f53c116102e457806324d7806c116102be57806324d7806c146104285780632dd87e0f1461043b5780632f2ff15d1461044e57806336568abe1461046157600080fd5b80631785f53c146103df57806323b872dd146103f2578063248a9ca31461040557600080fd5b806301ffc9a71461032c5780630605a3341461035457806306fdde0314610377578063081812fc1461038c578063095ea7b3146103b757806315fc35ad146103cc575b600080fd5b61033f61033a36600461395a565b6107db565b60405190151581526020015b60405180910390f35b61036960008051602061427183398151915281565b60405190815260200161034b565b61037f6107ec565b60405161034b9190613ee1565b61039f61039a36600461391e565b61087e565b6040516001600160a01b03909116815260200161034b565b6103ca6103c536600461382c565b610918565b005b6103ca6103da3660046136eb565b610a2e565b6103ca6103ed3660046136eb565b610a6e565b6103ca61040036600461373f565b610a9e565b61036961041336600461391e565b60009081526006602052604090206001015490565b61033f6104363660046136eb565b610acf565b61037f610449366004613b60565b610adb565b6103ca61045c366004613936565b610bab565b6103ca61046f366004613936565b610bd1565b6103ca610482366004613857565b610c4f565b6103ca61049536600461373f565b610d2e565b6103ca6104a8366004613b1c565b610d49565b6103ca6104bb366004613bb2565b610e6a565b6103ca6104ce366004613abc565b6110c1565b6103696104e136600461391e565b600d6020526000908152604090205481565b6103ca610501366004613992565b61127d565b6103ca6105143660046136eb565b6116d9565b6103ca610527366004613b60565b611716565b61039f61053a36600461391e565b611a38565b61033f61054d36600461391e565b600e6020526000908152604090205460ff1681565b61039f61057036600461391e565b600c602052600090815260409020546001600160a01b031681565b61059e61059936600461391e565b611aaf565b60405161034b9190613e83565b6103696105b936600461391e565b6000908152600a602052604090206005015490565b6103ca6105dc3660046136eb565b611b11565b6103696105ef3660046136eb565b611b41565b61033f6106023660046136eb565b611bc8565b6103ca6106153660046136eb565b611bf3565b610369600f5481565b6103ca610631366004613b60565b611c30565b6103ca61064436600461389b565b611ded565b6103ca6106573660046136eb565b61204c565b61066f61066a36600461391e565b612089565b60405161034b96959493929190613ef4565b61033f61068f366004613936565b612156565b61037f612181565b61033f6106aa3660046136eb565b612190565b6103ca6106bd3660046136eb565b6121aa565b6103ca6106d0366004613b1c565b6121e7565b610369600081565b6103ca6106eb3660046137fb565b612402565b6103ca6106fe36600461377f565b61240d565b6103ca610711366004613b81565b612445565b60095461039f906001600160a01b031681565b61037f61073736600461391e565b6125a5565b61033f61074a3660046136eb565b612680565b6103ca61075d366004613936565b61269a565b6103696000805160206142b183398151915281565b61033f610785366004613707565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b61036960008051602061429183398151915281565b6103ca6107d63660046136eb565b6126c0565b60006107e6826126fd565b92915050565b6060600080546107fb90614199565b80601f016020809104026020016040519081016040528092919081815260200182805461082790614199565b80156108745780601f1061084957610100808354040283529160200191610874565b820191906000526020600020905b81548152906001019060200180831161085757829003601f168201915b5050505050905090565b6000818152600260205260408120546001600160a01b03166108fc5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600460205260409020546001600160a01b031690565b600061092382611a38565b9050806001600160a01b0316836001600160a01b031614156109915760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084016108f3565b336001600160a01b03821614806109ad57506109ad8133610785565b610a1f5760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c000000000000000060648201526084016108f3565b610a298383612722565b505050565b610a3733610acf565b610a535760405162461bcd60e51b81526004016108f390613fb7565b610a6b60008051602061429183398151915282610bab565b50565b610a7733610acf565b610a935760405162461bcd60e51b81526004016108f390613fb7565b610a6b60008261269a565b610aa83382612790565b610ac45760405162461bcd60e51b81526004016108f390614029565b610a29838383612887565b60006107e68183612156565b6000828152600a6020526040902060050180546060919083908110610b1057634e487b7160e01b600052603260045260246000fd5b906000526020600020018054610b2590614199565b80601f0160208091040260200160405190810160405280929190818152602001828054610b5190614199565b8015610b9e5780601f10610b7357610100808354040283529160200191610b9e565b820191906000526020600020905b815481529060010190602001808311610b8157829003601f168201915b5050505050905092915050565b600082815260066020526040902060010154610bc78133612a23565b610a298383612a87565b6001600160a01b0381163314610c415760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084016108f3565b610c4b8282612b0d565b5050565b60005b8251811015610a2957336001600160a01b0316610c95848381518110610c8857634e487b7160e01b600052603260045260246000fd5b6020026020010151611a38565b6001600160a01b031614610ceb5760405162461bcd60e51b815260206004820152601860248201527f596f7520617265206e6f742074686520617070726f766572000000000000000060448201526064016108f3565b610d1c82848381518110610d0f57634e487b7160e01b600052603260045260246000fd5b6020026020010151610918565b80610d26816141d4565b915050610c52565b610a298383836040518060200160405280600081525061240d565b338281610d5582611a38565b6001600160a01b031614610d7b5760405162461bcd60e51b81526004016108f390613f91565b610d8484612b74565b6000848152600a6020526040812090610d9d82826133b4565b610dab6001830160006133d2565b600060028301819055600383018190556004830180546001600160a81b0319169055610ddb90600584019061340c565b600682016000905550508260000151600081518110610e0a57634e487b7160e01b600052603260045260246000fd5b6020026020010151336001600160a01b0316857f4b5dc53104cae632721a6ff5439e47a34cd019bfeb778b0125b64d64c281b5c2866000015187602001518860400151604051610e5c93929190613da6565b60405180910390a450505050565b6000848152600a60205260409020600401543390859061010090046001600160a01b0316821480610eb45750816001600160a01b0316610ea982611a38565b6001600160a01b0316145b610ef45760405162461bcd60e51b81526020600482015260116024820152702737ba1027bbb732b917a430b7323632b960791b60448201526064016108f3565b600086816000828152600a602081905260409091206004015460ff1690811115610f2e57634e487b7160e01b600052602160045260246000fd5b1415610f6c5760405162461bcd60e51b815260206004820152600d60248201526c496e76616c696420537461746560981b60448201526064016108f3565b6000888152600a6020526040902060020154871115610fc35760405162461bcd60e51b8152602060048201526013602482015272496e76616c696420616d6f756e74206c6f737360681b60448201526064016108f3565b6000888152600a6020908152604082206005018054600181018255908352918190208851610ff893919091019189019061342a565b506000888152600a602052604081206002015461101690899061413f565b60008a8152600a60205260408082206002810184905590890151600690910155875180519293509161105857634e487b7160e01b600052603260045260246000fd5b6020026020010151336001600160a01b03168a7f0de5290eb91da735ef493eb75b75cb8398c596fc092f374beb7de0b279106ad589600001518a602001518b60400151878e6040516110ae959493929190613e32565b60405180910390a4505050505050505050565b3384816110cd82611a38565b6001600160a01b0316146110f35760405162461bcd60e51b81526004016108f390613f91565b600086816000828152600a602081905260409091206004015460ff169081111561112d57634e487b7160e01b600052602160045260246000fd5b141561116b5760405162461bcd60e51b815260206004820152600d60248201526c496e76616c696420537461746560981b60448201526064016108f3565b6000888152600a602081905260409091206004018054610100600160a81b031981166101006001600160a01b038c1602908117835589936001600160a81b031990921660ff19909116179060019084908111156111d857634e487b7160e01b600052602160045260246000fd5b021790555060408086015160008a8152600a602052918220600601558551805190919061121557634e487b7160e01b600052603260045260246000fd5b6020026020010151336001600160a01b0316897fedeee9aed78718d2a4fc664fe842d7a180deb1de9a8edc48901d213bd3244307886000015189602001518a604001518c8e60405161126b959493929190613ddc565b60405180910390a45050505050505050565b61128633611bc8565b6112a25760405162461bcd60e51b81526004016108f390613fe6565b8151600181116112e55760405162461bcd60e51b815260206004820152600e60248201526d092dcecc2d8d2c84098cadccee8d60931b60448201526064016108f3565b600880549060006112f5836141d4565b90915550506008546040805160008082526020820190925281611328565b60608152602001906001900390816113135790505b50905060008060005b8581101561152b5760095488516001600160a01b03909116906323b872dd90339030908c908690811061137457634e487b7160e01b600052603260045260246000fd5b60200260200101516040518463ffffffff1660e01b815260040161139a93929190613d45565b600060405180830381600087803b1580156113b457600080fd5b505af11580156113c8573d6000803e3d6000fd5b50506009548a516000935083925082916001600160a01b03169063a02de811908d908790811061140857634e487b7160e01b600052603260045260246000fd5b60200260200101516040518263ffffffff1660e01b815260040161142e91815260200190565b60006040518083038186803b15801561144657600080fd5b505afa15801561145a573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526114829190810190613a0b565b5050935093509350506000600b8111156114ac57634e487b7160e01b600052602160045260246000fd5b81600b8111156114cc57634e487b7160e01b600052602160045260246000fd5b14156115125760405162461bcd60e51b815260206004820152601560248201527450726f64756374207374696c6c2070656e64696e6760581b60448201526064016108f3565b61151c83876140f4565b95509093505050600101611331565b506115363385612c0f565b6040518061010001604052808881526020018981526020018381526020018281526020016001600a81111561157b57634e487b7160e01b600052602160045260246000fd5b815233602080830191909152604080830187905260006060909301839052878352600a82529091208251805191926115b8928492909101906134ae565b5060208281015180516115d1926001850192019061342a565b506040820151600282015560608201516003820155608082015160048201805460ff1916600183600a81111561161757634e487b7160e01b600052602160045260246000fd5b021790555060a08201516004820180546001600160a01b0390921661010002610100600160a81b031990921691909117905560c082015180516116649160058401916020909101906134e8565b5060e0820151816006015590505061167b84612c29565b336001600160a01b0316847f7ee0b3d05b9e35b398ae0d8b6e8ff4db9e42cdc0b0306eda426f30e128bd02488989600001518a602001518b604001516040516116c79493929190613e96565b60405180910390a35050505050505050565b6116e233610acf565b6116fe5760405162461bcd60e51b81526004016108f390613fb7565b610a6b6000805160206142918339815191528261269a565b61171f33611bc8565b61173b5760405162461bcd60e51b81526004016108f390613fe6565b6000828152600a60205260409020546002811161178c5760405162461bcd60e51b815260206004820152600f60248201526e496e76616c6964206c656e6774687360881b60448201526064016108f3565b8161179860018361413f565b10156117db5760405162461bcd60e51b8152602060048201526012602482015271496e646578206e6f7420696e2072616e676560701b60448201526064016108f3565b6000838152600a6020526040812080548490811061180957634e487b7160e01b600052603260045260246000fd5b6000918252602080832090910154868352600a9091526040822090925061183160018561413f565b8154811061184f57634e487b7160e01b600052603260045260246000fd5b6000918252602090912001546009546040516323b872dd60e01b81529192506001600160a01b0316906323b872dd9061189090309033908790600401613d45565b600060405180830381600087803b1580156118aa57600080fd5b505af11580156118be573d6000803e3d6000fd5b5050506000868152600a602052604090208054839250869081106118f257634e487b7160e01b600052603260045260246000fd5b6000918252602080832090910192909255868152600a9091526040902080548061192c57634e487b7160e01b600052603160045260246000fd5b600082815260208120600019908301810182905590910190915560095460405163a02de81160e01b8152600481018590526001600160a01b039091169063a02de8119060240160006040518083038186803b15801561198a57600080fd5b505afa15801561199e573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526119c69190810190613a0b565b5050505091505080600a600088815260200190815260200160002060020160008282546119f3919061413f565b9091555050604051858152339087907fc15dac3b745498f2617160ee90d8c3a5495e0e9bd039bc3acb27ea0cf0f7efcc906020015b60405180910390a3505050505050565b6000818152600260205260408120546001600160a01b0316806107e65760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201526832b73a103a37b5b2b760b91b60648201526084016108f3565b6000818152600a6020908152604091829020805483518184028101840190945280845260609392830182828015611b0557602002820191906000526020600020905b815481526020019060010190808311611af1575b50505050509050919050565b611b1a33610acf565b611b365760405162461bcd60e51b81526004016108f390613fb7565b610a6b600082610bab565b60006001600160a01b038216611bac5760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604482015269726f206164647265737360b01b60648201526084016108f3565b506001600160a01b031660009081526003602052604090205490565b6000611be260008051602061427183398151915283612156565b806107e657506107e6600083612156565b611bfc33610acf565b611c185760405162461bcd60e51b81526004016108f390613fb7565b610a6b6000805160206142b18339815191528261269a565b611c3933611bc8565b611c555760405162461bcd60e51b81526004016108f390613fe6565b6000611c6083611a38565b6001600160a01b03161415611c7457600080fd5b6009546040516323b872dd60e01b81526001600160a01b03909116906323b872dd90611ca890339030908690600401613d45565b600060405180830381600087803b158015611cc257600080fd5b505af1158015611cd6573d6000803e3d6000fd5b5050506000838152600a602090815260408083208054600181018255908452918320909101849055600954905163a02de81160e01b8152600481018590529192506001600160a01b03169063a02de8119060240160006040518083038186803b158015611d4257600080fd5b505afa158015611d56573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052611d7e9190810190613a0b565b5050505091505080600a60008581526020019081526020016000206002016000828254611dab91906140f4565b9091555050604051828152339084907fd8b9e784bbe5e805f838f6c3dedd247ea17dfe4897e4eb328be7d847c3c1ceec906020015b60405180910390a3505050565b611df633612680565b611e575760405162461bcd60e51b815260206004820152602c60248201527f5265737472696374656420746f20496e666f726d6174696f6e48616e646c657260448201526b399037b91030b236b4b7399760a11b60648201526084016108f3565b825181518114611e9a5760405162461bcd60e51b815260206004820152600e60248201526d092dcecc2d8d2c84098cadccee8d60931b60448201526064016108f3565b602083015151835151148015611ec357508251516002101580611ec35750600283602001515111155b611f005760405162461bcd60e51b815260206004820152600e60248201526d092dcecc2d8d2c840d8cadccee8d60931b60448201526064016108f3565b60005b8181101561204557828181518110611f2b57634e487b7160e01b600052603260045260246000fd5b6020026020010151600a6000878481518110611f5757634e487b7160e01b600052603260045260246000fd5b60200260200101518152602001908152602001600020600601819055508360000151600081518110611f9957634e487b7160e01b600052603260045260246000fd5b6020026020010151336001600160a01b0316868381518110611fcb57634e487b7160e01b600052603260045260246000fd5b60200260200101517ffdbdbc05573951e8f00387285b7bd65b2bdcf225715eb729087d35b35bc2fe9b8760000151886020015188878151811061201e57634e487b7160e01b600052603260045260246000fd5b602002602001015160405161203593929190613da6565b60405180910390a4600101611f03565b5050505050565b61205533610acf565b6120715760405162461bcd60e51b81526004016108f390613fb7565b610a6b6000805160206142718339815191528261269a565b600a6020526000908152604090206001810180546120a690614199565b80601f01602080910402602001604051908101604052809291908181526020018280546120d290614199565b801561211f5780601f106120f45761010080835404028352916020019161211f565b820191906000526020600020905b81548152906001019060200180831161210257829003601f168201915b505050506002830154600384015460048501546006909501549394919390925060ff82169161010090046001600160a01b03169086565b60009182526006602090815260408084206001600160a01b0393909316845291905290205460ff1690565b6060600180546107fb90614199565b6000611be26000805160206142b183398151915283612156565b6121b333610acf565b6121cf5760405162461bcd60e51b81526004016108f390613fb7565b610a6b60008051602061427183398151915282610bab565b336121f183611a38565b6001600160a01b0316146122335760405162461bcd60e51b81526020600482015260096024820152682737ba1027bbb732b960b91b60448201526064016108f3565b6000828152600a602090815260408083208054825181850281018501909352808352919290919083018282801561228957602002820191906000526020600020905b815481526020019060010190808311612275575b505083519394506000925050505b8181101561233d5760095483516001600160a01b03909116906323b872dd90309033908790869081106122da57634e487b7160e01b600052603260045260246000fd5b60200260200101516040518463ffffffff1660e01b815260040161230093929190613d45565b600060405180830381600087803b15801561231a57600080fd5b505af115801561232e573d6000803e3d6000fd5b50505050806001019050612297565b506000848152600a602052604081209061235782826133b4565b6123656001830160006133d2565b600060028301819055600383018190556004830180546001600160a81b031916905561239590600584019061340c565b600682016000905550506123a884612b74565b336001600160a01b0316847fe350879b7b0e7b9cb08fda8eba8a90fc60b21e79c16edfa2d1df946466292fd1848660000151876020015188604001516040516123f49493929190613e96565b60405180910390a350505050565b610c4b338383612cce565b6124173383612790565b6124335760405162461bcd60e51b81526004016108f390614029565b61243f84848484612d95565b50505050565b33848161245182611a38565b6001600160a01b0316146124775760405162461bcd60e51b81526004016108f390613f91565b600085116124b45760405162461bcd60e51b815260206004820152600a602482015269043616e277420626520360b41b60448201526064016108f3565b828414156124f95760405162461bcd60e51b815260206004820152601260248201527124b73b30b634b21021b7b73b32b939b4b7b760711b60448201526064016108f3565b6000868152600a6020526040902060030154841461254f5760405162461bcd60e51b8152602060048201526013602482015272125b9d985b1a590813585d18da0e881d5b9a5d606a1b60448201526064016108f3565b6000868152600a6020908152604091829020600281018890556003018590558151868152908101859052869188917f4e1f8601a03fdbbc86a16e28caede62143afc8f04f10a78f04b0d4ded0e69e869101611a28565b6000818152600260205260409020546060906001600160a01b03166126245760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201526e3732bc34b9ba32b73a103a37b5b2b760891b60648201526084016108f3565b600061262e612dc8565b9050600081511161264e5760405180602001604052806000815250612679565b8061265884612de8565b604051602001612669929190613ca1565b6040516020818303038152906040525b9392505050565b6000611be260008051602061429183398151915283612156565b6000828152600660205260409020600101546126b68133612a23565b610a298383612b0d565b6126c933610acf565b6126e55760405162461bcd60e51b81526004016108f390613fb7565b610a6b6000805160206142b183398151915282610bab565b60006001600160e01b03198216637965db0b60e01b14806107e657506107e682612f01565b600081815260046020526040902080546001600160a01b0319166001600160a01b038416908117909155819061275782611a38565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000818152600260205260408120546001600160a01b03166128095760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084016108f3565b600061281483611a38565b9050806001600160a01b0316846001600160a01b0316148061284f5750836001600160a01b03166128448461087e565b6001600160a01b0316145b8061287f57506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b949350505050565b826001600160a01b031661289a82611a38565b6001600160a01b0316146128fe5760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b60648201526084016108f3565b6001600160a01b0382166129605760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016108f3565b61296b600082612722565b6001600160a01b038316600090815260036020526040812080546001929061299490849061413f565b90915550506001600160a01b03821660009081526003602052604081208054600192906129c29084906140f4565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b612a2d8282612156565b610c4b57612a45816001600160a01b03166014612f51565b612a50836020612f51565b604051602001612a61929190613cd0565b60408051601f198184030181529082905262461bcd60e51b82526108f391600401613ee1565b612a918282612156565b610c4b5760008281526006602090815260408083206001600160a01b03851684529091529020805460ff19166001179055612ac93390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b612b178282612156565b15610c4b5760008281526006602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b6000612b7f82611a38565b9050612b8c600083612722565b6001600160a01b0381166000908152600360205260408120805460019290612bb590849061413f565b909155505060008281526002602052604080822080546001600160a01b0319169055518391906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b610c4b828260405180602001604052806000815250613132565b6000818152600260205260409020546001600160a01b0316612ca25760405162461bcd60e51b815260206004820152602c60248201527f4552433732314d657461646174613a2055524920736574206f66206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084016108f3565b612cab81612de8565b6000828152600b602090815260409091208251610c4b939192919091019061342a565b816001600160a01b0316836001600160a01b03161415612d305760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016108f3565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c319101611de0565b612da0848484612887565b612dac84848484613165565b61243f5760405162461bcd60e51b81526004016108f390613f3f565b60606040518060600160405280602581526020016142d160259139905090565b606081612e0c5750506040805180820190915260018152600360fc1b602082015290565b8160005b8115612e365780612e20816141d4565b9150612e2f9050600a8361410c565b9150612e10565b6000816001600160401b03811115612e5e57634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015612e88576020820181803683370190505b5090505b841561287f57612e9d60018361413f565b9150612eaa600a866141ef565b612eb59060306140f4565b60f81b818381518110612ed857634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350612efa600a8661410c565b9450612e8c565b60006001600160e01b031982166380ac58cd60e01b1480612f3257506001600160e01b03198216635b5e139f60e01b145b806107e657506301ffc9a760e01b6001600160e01b03198316146107e6565b60606000612f60836002614120565b612f6b9060026140f4565b6001600160401b03811115612f9057634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015612fba576020820181803683370190505b509050600360fc1b81600081518110612fe357634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350600f60fb1b8160018151811061302057634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a9053506000613044846002614120565b61304f9060016140f4565b90505b60018111156130e3576f181899199a1a9b1b9c1cb0b131b232b360811b85600f166010811061309157634e487b7160e01b600052603260045260246000fd5b1a60f81b8282815181106130b557634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a90535060049490941c936130dc81614182565b9050613052565b5083156126795760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016108f3565b61313c8383613272565b6131496000848484613165565b610a295760405162461bcd60e51b81526004016108f390613f3f565b60006001600160a01b0384163b1561326757604051630a85bd0160e11b81526001600160a01b0385169063150b7a02906131a9903390899088908890600401613d69565b602060405180830381600087803b1580156131c357600080fd5b505af19250505080156131f3575060408051601f3d908101601f191682019092526131f091810190613976565b60015b61324d573d808015613221576040519150601f19603f3d011682016040523d82523d6000602084013e613226565b606091505b5080516132455760405162461bcd60e51b81526004016108f390613f3f565b805181602001fd5b6001600160e01b031916630a85bd0160e11b14905061287f565b506001949350505050565b6001600160a01b0382166132c85760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f206164647265737360448201526064016108f3565b6000818152600260205260409020546001600160a01b03161561332d5760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016108f3565b6001600160a01b03821660009081526003602052604081208054600192906133569084906140f4565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b5080546000825590600052602060002090810190610a6b9190613541565b5080546133de90614199565b6000825580601f106133ee575050565b601f016020900490600052602060002090810190610a6b9190613541565b5080546000825590600052602060002090810190610a6b9190613556565b82805461343690614199565b90600052602060002090601f016020900481019282613458576000855561349e565b82601f1061347157805160ff191683800117855561349e565b8280016001018555821561349e579182015b8281111561349e578251825591602001919060010190613483565b506134aa929150613541565b5090565b82805482825590600052602060002090810192821561349e579160200282018281111561349e578251825591602001919060010190613483565b828054828255906000526020600020908101928215613535579160200282015b82811115613535578251805161352591849160209091019061342a565b5091602001919060010190613508565b506134aa929150613556565b5b808211156134aa5760008155600101613542565b808211156134aa57600061356a82826133d2565b50600101613556565b6000613586613581846140cd565b61407a565b905082815283838301111561359a57600080fd5b828260208301376000602084830101529392505050565b80516135bc81614245565b919050565b600082601f8301126135d1578081fd5b813560206135e1613581836140aa565b80838252828201915082860187848660051b8901011115613600578586fd5b855b8581101561361e57813584529284019290840190600101613602565b5090979650505050505050565b8051600c81106135bc57600080fd5b600082601f83011261364a578081fd5b61267983833560208501613573565b60006060828403121561366a578081fd5b604051606081016001600160401b03828210818311171561368d5761368d61422f565b8160405282935084359150808211156136a557600080fd5b6136b1868387016135c1565b835260208501359150808211156136c757600080fd5b506136d4858286016135c1565b602083015250604083013560408201525092915050565b6000602082840312156136fc578081fd5b813561267981614245565b60008060408385031215613719578081fd5b823561372481614245565b9150602083013561373481614245565b809150509250929050565b600080600060608486031215613753578081fd5b833561375e81614245565b9250602084013561376e81614245565b929592945050506040919091013590565b60008060008060808587031215613794578081fd5b843561379f81614245565b935060208501356137af81614245565b92506040850135915060608501356001600160401b038111156137d0578182fd5b8501601f810187136137e0578182fd5b6137ef87823560208401613573565b91505092959194509250565b6000806040838503121561380d578182fd5b823561381881614245565b915060208301358015158114613734578182fd5b6000806040838503121561383e578182fd5b823561384981614245565b946020939093013593505050565b60008060408385031215613869578182fd5b82356001600160401b0381111561387e578283fd5b61388a858286016135c1565b925050602083013561373481614245565b6000806000606084860312156138af578081fd5b83356001600160401b03808211156138c5578283fd5b6138d1878388016135c1565b945060208601359150808211156138e6578283fd5b6138f287838801613659565b93506040860135915080821115613907578283fd5b50613914868287016135c1565b9150509250925092565b60006020828403121561392f578081fd5b5035919050565b60008060408385031215613948578182fd5b82359150602083013561373481614245565b60006020828403121561396b578081fd5b81356126798161425a565b600060208284031215613987578081fd5b81516126798161425a565b6000806000606084860312156139a6578081fd5b83356001600160401b03808211156139bc578283fd5b6139c88783880161363a565b945060208601359150808211156139dd578283fd5b6139e9878388016135c1565b935060408601359150808211156139fe578283fd5b5061391486828701613659565b60008060008060008060c08789031215613a23578384fd5b86516001600160401b03811115613a38578485fd5b8701601f81018913613a48578485fd5b8051613a56613581826140cd565b8181528a6020838501011115613a6a578687fd5b613a7b826020830160208601614156565b8098505050506020870151945060408701519350613a9b6060880161362b565b9250613aa9608088016135b1565b915060a087015190509295509295509295565b60008060008060808587031215613ad1578182fd5b843593506020850135613ae381614245565b92506040850135600b8110613af6578283fd5b915060608501356001600160401b03811115613b10578182fd5b6137ef87828801613659565b60008060408385031215613b2e578182fd5b8235915060208301356001600160401b03811115613b4a578182fd5b613b5685828601613659565b9150509250929050565b60008060408385031215613b72578182fd5b50508035926020909101359150565b60008060008060808587031215613b96578182fd5b5050823594602084013594506040840135936060013592509050565b60008060008060808587031215613bc7578182fd5b843593506020850135925060408501356001600160401b0380821115613beb578384fd5b613bf78883890161363a565b93506060870135915080821115613c0c578283fd5b506137ef87828801613659565b6000815180845260208085019450808401835b83811015613c4857815187529582019590820190600101613c2c565b509495945050505050565b60008151808452613c6b816020860160208601614156565b601f01601f19169290920160200192915050565b600b8110613c9d57634e487b7160e01b600052602160045260246000fd5b9052565b60008351613cb3818460208801614156565b835190830190613cc7818360208801614156565b01949350505050565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351613d08816017850160208801614156565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351613d39816028840160208801614156565b01602801949350505050565b6001600160a01b039384168152919092166020820152604081019190915260600190565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090613d9c90830184613c53565b9695505050505050565b606081526000613db96060830186613c19565b8281036020840152613dcb8186613c19565b915050826040830152949350505050565b60a081526000613def60a0830188613c19565b8281036020840152613e018188613c19565b915050846040830152613e176060830185613c7f565b6001600160a01b039290921660809190910152949350505050565b60a081526000613e4560a0830188613c19565b8281036020840152613e578188613c19565b90508560408401528460608401528281036080840152613e778185613c53565b98975050505050505050565b6020815260006126796020830184613c19565b608081526000613ea96080830187613c19565b8281036020840152613ebb8187613c19565b90508281036040840152613ecf8186613c19565b91505082606083015295945050505050565b6020815260006126796020830184613c53565b60c081526000613f0760c0830189613c53565b9050866020830152856040830152613f226060830186613c7f565b6001600160a01b0393909316608082015260a00152949350505050565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6020808252600c908201526b2737ba1027232a27bbb732b960a11b604082015260600190565b6020808252601590820152742932b9ba3934b1ba32b2103a379030b236b4b7399760591b604082015260600190565b60208082526023908201527f5265737472696374656420746f2046546f6b656e697a6572206f722061646d6960408201526237399760e91b606082015260800190565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b604051601f8201601f191681016001600160401b03811182821017156140a2576140a261422f565b604052919050565b60006001600160401b038211156140c3576140c361422f565b5060051b60200190565b60006001600160401b038211156140e6576140e661422f565b50601f01601f191660200190565b6000821982111561410757614107614203565b500190565b60008261411b5761411b614219565b500490565b600081600019048311821515161561413a5761413a614203565b500290565b60008282101561415157614151614203565b500390565b60005b83811015614171578181015183820152602001614159565b8381111561243f5750506000910152565b60008161419157614191614203565b506000190190565b600181811c908216806141ad57607f821691505b602082108114156141ce57634e487b7160e01b600052602260045260246000fd5b50919050565b60006000198214156141e8576141e8614203565b5060010190565b6000826141fe576141fe614219565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114610a6b57600080fd5b6001600160e01b031981168114610a6b57600080fdfee70d28ebd9d7d9a3dd77d46ae2481f301c80806f395b08de31d8e095b1c46cee8da7d70244203c30977cc84bc73c56df770db659eae5eae031338bf752ed6b187d516c105bee30cf3879df4b9a7cf2e17d81aa2e2cd673a2f488a1d6fadd45ec687474703a2f2f7472616465636f696e436f6d706f736974696f6e2e6e6c2f7661756c742fa26469706673582212202df4ae837aa8c9935e7f33a94777e7c467a30b4bb81f33436556ff73ba426c6d64736f6c63430008040033",
  "deployedBytecode": "0x608060405234801561001057600080fd5b50600436106103275760003560e01c80636f589053116101b85780639d4ba5ff11610104578063c87b56dd116100a2578063d58e36e01161007c578063d58e36e014610762578063e985e9c514610777578063e9e9a6b3146107b3578063f1ead071146107c857600080fd5b8063c87b56dd14610729578063d52c9a401461073c578063d547741f1461074f57600080fd5b8063a22cb465116100de578063a22cb465146106dd578063b88d4fde146106f0578063c29278f414610703578063c84eebd31461071657600080fd5b80639d4ba5ff146106af5780639e0bdea5146106c2578063a217fddf146106d557600080fd5b8063758b389111610171578063909592b81161014b578063909592b81461065c57806391d148541461068157806395d89b411461069457806397d0a85a1461069c57600080fd5b8063758b3891146106235780637aac74cc1461063657806385fb92ac1461064957600080fd5b80636f589053146105ab57806370480275146105ce57806370a08231146105e157806371fdc7ac146105f45780637314b0f71461060757806373fc84201461061a57600080fd5b80633a962a191161027757806357daa600116102305780636352211e1161020a5780636352211e1461052c578063682e67e81461053f57806368728f92146105625780636c3ec55a1461058b57600080fd5b806357daa600146104f357806358d6dd8f1461050657806362da725c1461051957600080fd5b80633a962a191461047457806342842e0e146104875780634406257a1461049a578063462be15d146104ad5780634b7d4fef146104c0578063542c7c0a146104d357600080fd5b80631785f53c116102e457806324d7806c116102be57806324d7806c146104285780632dd87e0f1461043b5780632f2ff15d1461044e57806336568abe1461046157600080fd5b80631785f53c146103df57806323b872dd146103f2578063248a9ca31461040557600080fd5b806301ffc9a71461032c5780630605a3341461035457806306fdde0314610377578063081812fc1461038c578063095ea7b3146103b757806315fc35ad146103cc575b600080fd5b61033f61033a36600461395a565b6107db565b60405190151581526020015b60405180910390f35b61036960008051602061427183398151915281565b60405190815260200161034b565b61037f6107ec565b60405161034b9190613ee1565b61039f61039a36600461391e565b61087e565b6040516001600160a01b03909116815260200161034b565b6103ca6103c536600461382c565b610918565b005b6103ca6103da3660046136eb565b610a2e565b6103ca6103ed3660046136eb565b610a6e565b6103ca61040036600461373f565b610a9e565b61036961041336600461391e565b60009081526006602052604090206001015490565b61033f6104363660046136eb565b610acf565b61037f610449366004613b60565b610adb565b6103ca61045c366004613936565b610bab565b6103ca61046f366004613936565b610bd1565b6103ca610482366004613857565b610c4f565b6103ca61049536600461373f565b610d2e565b6103ca6104a8366004613b1c565b610d49565b6103ca6104bb366004613bb2565b610e6a565b6103ca6104ce366004613abc565b6110c1565b6103696104e136600461391e565b600d6020526000908152604090205481565b6103ca610501366004613992565b61127d565b6103ca6105143660046136eb565b6116d9565b6103ca610527366004613b60565b611716565b61039f61053a36600461391e565b611a38565b61033f61054d36600461391e565b600e6020526000908152604090205460ff1681565b61039f61057036600461391e565b600c602052600090815260409020546001600160a01b031681565b61059e61059936600461391e565b611aaf565b60405161034b9190613e83565b6103696105b936600461391e565b6000908152600a602052604090206005015490565b6103ca6105dc3660046136eb565b611b11565b6103696105ef3660046136eb565b611b41565b61033f6106023660046136eb565b611bc8565b6103ca6106153660046136eb565b611bf3565b610369600f5481565b6103ca610631366004613b60565b611c30565b6103ca61064436600461389b565b611ded565b6103ca6106573660046136eb565b61204c565b61066f61066a36600461391e565b612089565b60405161034b96959493929190613ef4565b61033f61068f366004613936565b612156565b61037f612181565b61033f6106aa3660046136eb565b612190565b6103ca6106bd3660046136eb565b6121aa565b6103ca6106d0366004613b1c565b6121e7565b610369600081565b6103ca6106eb3660046137fb565b612402565b6103ca6106fe36600461377f565b61240d565b6103ca610711366004613b81565b612445565b60095461039f906001600160a01b031681565b61037f61073736600461391e565b6125a5565b61033f61074a3660046136eb565b612680565b6103ca61075d366004613936565b61269a565b6103696000805160206142b183398151915281565b61033f610785366004613707565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b61036960008051602061429183398151915281565b6103ca6107d63660046136eb565b6126c0565b60006107e6826126fd565b92915050565b6060600080546107fb90614199565b80601f016020809104026020016040519081016040528092919081815260200182805461082790614199565b80156108745780601f1061084957610100808354040283529160200191610874565b820191906000526020600020905b81548152906001019060200180831161085757829003601f168201915b5050505050905090565b6000818152600260205260408120546001600160a01b03166108fc5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600460205260409020546001600160a01b031690565b600061092382611a38565b9050806001600160a01b0316836001600160a01b031614156109915760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084016108f3565b336001600160a01b03821614806109ad57506109ad8133610785565b610a1f5760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c000000000000000060648201526084016108f3565b610a298383612722565b505050565b610a3733610acf565b610a535760405162461bcd60e51b81526004016108f390613fb7565b610a6b60008051602061429183398151915282610bab565b50565b610a7733610acf565b610a935760405162461bcd60e51b81526004016108f390613fb7565b610a6b60008261269a565b610aa83382612790565b610ac45760405162461bcd60e51b81526004016108f390614029565b610a29838383612887565b60006107e68183612156565b6000828152600a6020526040902060050180546060919083908110610b1057634e487b7160e01b600052603260045260246000fd5b906000526020600020018054610b2590614199565b80601f0160208091040260200160405190810160405280929190818152602001828054610b5190614199565b8015610b9e5780601f10610b7357610100808354040283529160200191610b9e565b820191906000526020600020905b815481529060010190602001808311610b8157829003601f168201915b5050505050905092915050565b600082815260066020526040902060010154610bc78133612a23565b610a298383612a87565b6001600160a01b0381163314610c415760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084016108f3565b610c4b8282612b0d565b5050565b60005b8251811015610a2957336001600160a01b0316610c95848381518110610c8857634e487b7160e01b600052603260045260246000fd5b6020026020010151611a38565b6001600160a01b031614610ceb5760405162461bcd60e51b815260206004820152601860248201527f596f7520617265206e6f742074686520617070726f766572000000000000000060448201526064016108f3565b610d1c82848381518110610d0f57634e487b7160e01b600052603260045260246000fd5b6020026020010151610918565b80610d26816141d4565b915050610c52565b610a298383836040518060200160405280600081525061240d565b338281610d5582611a38565b6001600160a01b031614610d7b5760405162461bcd60e51b81526004016108f390613f91565b610d8484612b74565b6000848152600a6020526040812090610d9d82826133b4565b610dab6001830160006133d2565b600060028301819055600383018190556004830180546001600160a81b0319169055610ddb90600584019061340c565b600682016000905550508260000151600081518110610e0a57634e487b7160e01b600052603260045260246000fd5b6020026020010151336001600160a01b0316857f4b5dc53104cae632721a6ff5439e47a34cd019bfeb778b0125b64d64c281b5c2866000015187602001518860400151604051610e5c93929190613da6565b60405180910390a450505050565b6000848152600a60205260409020600401543390859061010090046001600160a01b0316821480610eb45750816001600160a01b0316610ea982611a38565b6001600160a01b0316145b610ef45760405162461bcd60e51b81526020600482015260116024820152702737ba1027bbb732b917a430b7323632b960791b60448201526064016108f3565b600086816000828152600a602081905260409091206004015460ff1690811115610f2e57634e487b7160e01b600052602160045260246000fd5b1415610f6c5760405162461bcd60e51b815260206004820152600d60248201526c496e76616c696420537461746560981b60448201526064016108f3565b6000888152600a6020526040902060020154871115610fc35760405162461bcd60e51b8152602060048201526013602482015272496e76616c696420616d6f756e74206c6f737360681b60448201526064016108f3565b6000888152600a6020908152604082206005018054600181018255908352918190208851610ff893919091019189019061342a565b506000888152600a602052604081206002015461101690899061413f565b60008a8152600a60205260408082206002810184905590890151600690910155875180519293509161105857634e487b7160e01b600052603260045260246000fd5b6020026020010151336001600160a01b03168a7f0de5290eb91da735ef493eb75b75cb8398c596fc092f374beb7de0b279106ad589600001518a602001518b60400151878e6040516110ae959493929190613e32565b60405180910390a4505050505050505050565b3384816110cd82611a38565b6001600160a01b0316146110f35760405162461bcd60e51b81526004016108f390613f91565b600086816000828152600a602081905260409091206004015460ff169081111561112d57634e487b7160e01b600052602160045260246000fd5b141561116b5760405162461bcd60e51b815260206004820152600d60248201526c496e76616c696420537461746560981b60448201526064016108f3565b6000888152600a602081905260409091206004018054610100600160a81b031981166101006001600160a01b038c1602908117835589936001600160a81b031990921660ff19909116179060019084908111156111d857634e487b7160e01b600052602160045260246000fd5b021790555060408086015160008a8152600a602052918220600601558551805190919061121557634e487b7160e01b600052603260045260246000fd5b6020026020010151336001600160a01b0316897fedeee9aed78718d2a4fc664fe842d7a180deb1de9a8edc48901d213bd3244307886000015189602001518a604001518c8e60405161126b959493929190613ddc565b60405180910390a45050505050505050565b61128633611bc8565b6112a25760405162461bcd60e51b81526004016108f390613fe6565b8151600181116112e55760405162461bcd60e51b815260206004820152600e60248201526d092dcecc2d8d2c84098cadccee8d60931b60448201526064016108f3565b600880549060006112f5836141d4565b90915550506008546040805160008082526020820190925281611328565b60608152602001906001900390816113135790505b50905060008060005b8581101561152b5760095488516001600160a01b03909116906323b872dd90339030908c908690811061137457634e487b7160e01b600052603260045260246000fd5b60200260200101516040518463ffffffff1660e01b815260040161139a93929190613d45565b600060405180830381600087803b1580156113b457600080fd5b505af11580156113c8573d6000803e3d6000fd5b50506009548a516000935083925082916001600160a01b03169063a02de811908d908790811061140857634e487b7160e01b600052603260045260246000fd5b60200260200101516040518263ffffffff1660e01b815260040161142e91815260200190565b60006040518083038186803b15801561144657600080fd5b505afa15801561145a573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526114829190810190613a0b565b5050935093509350506000600b8111156114ac57634e487b7160e01b600052602160045260246000fd5b81600b8111156114cc57634e487b7160e01b600052602160045260246000fd5b14156115125760405162461bcd60e51b815260206004820152601560248201527450726f64756374207374696c6c2070656e64696e6760581b60448201526064016108f3565b61151c83876140f4565b95509093505050600101611331565b506115363385612c0f565b6040518061010001604052808881526020018981526020018381526020018281526020016001600a81111561157b57634e487b7160e01b600052602160045260246000fd5b815233602080830191909152604080830187905260006060909301839052878352600a82529091208251805191926115b8928492909101906134ae565b5060208281015180516115d1926001850192019061342a565b506040820151600282015560608201516003820155608082015160048201805460ff1916600183600a81111561161757634e487b7160e01b600052602160045260246000fd5b021790555060a08201516004820180546001600160a01b0390921661010002610100600160a81b031990921691909117905560c082015180516116649160058401916020909101906134e8565b5060e0820151816006015590505061167b84612c29565b336001600160a01b0316847f7ee0b3d05b9e35b398ae0d8b6e8ff4db9e42cdc0b0306eda426f30e128bd02488989600001518a602001518b604001516040516116c79493929190613e96565b60405180910390a35050505050505050565b6116e233610acf565b6116fe5760405162461bcd60e51b81526004016108f390613fb7565b610a6b6000805160206142918339815191528261269a565b61171f33611bc8565b61173b5760405162461bcd60e51b81526004016108f390613fe6565b6000828152600a60205260409020546002811161178c5760405162461bcd60e51b815260206004820152600f60248201526e496e76616c6964206c656e6774687360881b60448201526064016108f3565b8161179860018361413f565b10156117db5760405162461bcd60e51b8152602060048201526012602482015271496e646578206e6f7420696e2072616e676560701b60448201526064016108f3565b6000838152600a6020526040812080548490811061180957634e487b7160e01b600052603260045260246000fd5b6000918252602080832090910154868352600a9091526040822090925061183160018561413f565b8154811061184f57634e487b7160e01b600052603260045260246000fd5b6000918252602090912001546009546040516323b872dd60e01b81529192506001600160a01b0316906323b872dd9061189090309033908790600401613d45565b600060405180830381600087803b1580156118aa57600080fd5b505af11580156118be573d6000803e3d6000fd5b5050506000868152600a602052604090208054839250869081106118f257634e487b7160e01b600052603260045260246000fd5b6000918252602080832090910192909255868152600a9091526040902080548061192c57634e487b7160e01b600052603160045260246000fd5b600082815260208120600019908301810182905590910190915560095460405163a02de81160e01b8152600481018590526001600160a01b039091169063a02de8119060240160006040518083038186803b15801561198a57600080fd5b505afa15801561199e573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526119c69190810190613a0b565b5050505091505080600a600088815260200190815260200160002060020160008282546119f3919061413f565b9091555050604051858152339087907fc15dac3b745498f2617160ee90d8c3a5495e0e9bd039bc3acb27ea0cf0f7efcc906020015b60405180910390a3505050505050565b6000818152600260205260408120546001600160a01b0316806107e65760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201526832b73a103a37b5b2b760b91b60648201526084016108f3565b6000818152600a6020908152604091829020805483518184028101840190945280845260609392830182828015611b0557602002820191906000526020600020905b815481526020019060010190808311611af1575b50505050509050919050565b611b1a33610acf565b611b365760405162461bcd60e51b81526004016108f390613fb7565b610a6b600082610bab565b60006001600160a01b038216611bac5760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604482015269726f206164647265737360b01b60648201526084016108f3565b506001600160a01b031660009081526003602052604090205490565b6000611be260008051602061427183398151915283612156565b806107e657506107e6600083612156565b611bfc33610acf565b611c185760405162461bcd60e51b81526004016108f390613fb7565b610a6b6000805160206142b18339815191528261269a565b611c3933611bc8565b611c555760405162461bcd60e51b81526004016108f390613fe6565b6000611c6083611a38565b6001600160a01b03161415611c7457600080fd5b6009546040516323b872dd60e01b81526001600160a01b03909116906323b872dd90611ca890339030908690600401613d45565b600060405180830381600087803b158015611cc257600080fd5b505af1158015611cd6573d6000803e3d6000fd5b5050506000838152600a602090815260408083208054600181018255908452918320909101849055600954905163a02de81160e01b8152600481018590529192506001600160a01b03169063a02de8119060240160006040518083038186803b158015611d4257600080fd5b505afa158015611d56573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052611d7e9190810190613a0b565b5050505091505080600a60008581526020019081526020016000206002016000828254611dab91906140f4565b9091555050604051828152339084907fd8b9e784bbe5e805f838f6c3dedd247ea17dfe4897e4eb328be7d847c3c1ceec906020015b60405180910390a3505050565b611df633612680565b611e575760405162461bcd60e51b815260206004820152602c60248201527f5265737472696374656420746f20496e666f726d6174696f6e48616e646c657260448201526b399037b91030b236b4b7399760a11b60648201526084016108f3565b825181518114611e9a5760405162461bcd60e51b815260206004820152600e60248201526d092dcecc2d8d2c84098cadccee8d60931b60448201526064016108f3565b602083015151835151148015611ec357508251516002101580611ec35750600283602001515111155b611f005760405162461bcd60e51b815260206004820152600e60248201526d092dcecc2d8d2c840d8cadccee8d60931b60448201526064016108f3565b60005b8181101561204557828181518110611f2b57634e487b7160e01b600052603260045260246000fd5b6020026020010151600a6000878481518110611f5757634e487b7160e01b600052603260045260246000fd5b60200260200101518152602001908152602001600020600601819055508360000151600081518110611f9957634e487b7160e01b600052603260045260246000fd5b6020026020010151336001600160a01b0316868381518110611fcb57634e487b7160e01b600052603260045260246000fd5b60200260200101517ffdbdbc05573951e8f00387285b7bd65b2bdcf225715eb729087d35b35bc2fe9b8760000151886020015188878151811061201e57634e487b7160e01b600052603260045260246000fd5b602002602001015160405161203593929190613da6565b60405180910390a4600101611f03565b5050505050565b61205533610acf565b6120715760405162461bcd60e51b81526004016108f390613fb7565b610a6b6000805160206142718339815191528261269a565b600a6020526000908152604090206001810180546120a690614199565b80601f01602080910402602001604051908101604052809291908181526020018280546120d290614199565b801561211f5780601f106120f45761010080835404028352916020019161211f565b820191906000526020600020905b81548152906001019060200180831161210257829003601f168201915b505050506002830154600384015460048501546006909501549394919390925060ff82169161010090046001600160a01b03169086565b60009182526006602090815260408084206001600160a01b0393909316845291905290205460ff1690565b6060600180546107fb90614199565b6000611be26000805160206142b183398151915283612156565b6121b333610acf565b6121cf5760405162461bcd60e51b81526004016108f390613fb7565b610a6b60008051602061427183398151915282610bab565b336121f183611a38565b6001600160a01b0316146122335760405162461bcd60e51b81526020600482015260096024820152682737ba1027bbb732b960b91b60448201526064016108f3565b6000828152600a602090815260408083208054825181850281018501909352808352919290919083018282801561228957602002820191906000526020600020905b815481526020019060010190808311612275575b505083519394506000925050505b8181101561233d5760095483516001600160a01b03909116906323b872dd90309033908790869081106122da57634e487b7160e01b600052603260045260246000fd5b60200260200101516040518463ffffffff1660e01b815260040161230093929190613d45565b600060405180830381600087803b15801561231a57600080fd5b505af115801561232e573d6000803e3d6000fd5b50505050806001019050612297565b506000848152600a602052604081209061235782826133b4565b6123656001830160006133d2565b600060028301819055600383018190556004830180546001600160a81b031916905561239590600584019061340c565b600682016000905550506123a884612b74565b336001600160a01b0316847fe350879b7b0e7b9cb08fda8eba8a90fc60b21e79c16edfa2d1df946466292fd1848660000151876020015188604001516040516123f49493929190613e96565b60405180910390a350505050565b610c4b338383612cce565b6124173383612790565b6124335760405162461bcd60e51b81526004016108f390614029565b61243f84848484612d95565b50505050565b33848161245182611a38565b6001600160a01b0316146124775760405162461bcd60e51b81526004016108f390613f91565b600085116124b45760405162461bcd60e51b815260206004820152600a602482015269043616e277420626520360b41b60448201526064016108f3565b828414156124f95760405162461bcd60e51b815260206004820152601260248201527124b73b30b634b21021b7b73b32b939b4b7b760711b60448201526064016108f3565b6000868152600a6020526040902060030154841461254f5760405162461bcd60e51b8152602060048201526013602482015272125b9d985b1a590813585d18da0e881d5b9a5d606a1b60448201526064016108f3565b6000868152600a6020908152604091829020600281018890556003018590558151868152908101859052869188917f4e1f8601a03fdbbc86a16e28caede62143afc8f04f10a78f04b0d4ded0e69e869101611a28565b6000818152600260205260409020546060906001600160a01b03166126245760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201526e3732bc34b9ba32b73a103a37b5b2b760891b60648201526084016108f3565b600061262e612dc8565b9050600081511161264e5760405180602001604052806000815250612679565b8061265884612de8565b604051602001612669929190613ca1565b6040516020818303038152906040525b9392505050565b6000611be260008051602061429183398151915283612156565b6000828152600660205260409020600101546126b68133612a23565b610a298383612b0d565b6126c933610acf565b6126e55760405162461bcd60e51b81526004016108f390613fb7565b610a6b6000805160206142b183398151915282610bab565b60006001600160e01b03198216637965db0b60e01b14806107e657506107e682612f01565b600081815260046020526040902080546001600160a01b0319166001600160a01b038416908117909155819061275782611a38565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000818152600260205260408120546001600160a01b03166128095760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084016108f3565b600061281483611a38565b9050806001600160a01b0316846001600160a01b0316148061284f5750836001600160a01b03166128448461087e565b6001600160a01b0316145b8061287f57506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b949350505050565b826001600160a01b031661289a82611a38565b6001600160a01b0316146128fe5760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b60648201526084016108f3565b6001600160a01b0382166129605760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016108f3565b61296b600082612722565b6001600160a01b038316600090815260036020526040812080546001929061299490849061413f565b90915550506001600160a01b03821660009081526003602052604081208054600192906129c29084906140f4565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b612a2d8282612156565b610c4b57612a45816001600160a01b03166014612f51565b612a50836020612f51565b604051602001612a61929190613cd0565b60408051601f198184030181529082905262461bcd60e51b82526108f391600401613ee1565b612a918282612156565b610c4b5760008281526006602090815260408083206001600160a01b03851684529091529020805460ff19166001179055612ac93390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b612b178282612156565b15610c4b5760008281526006602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b6000612b7f82611a38565b9050612b8c600083612722565b6001600160a01b0381166000908152600360205260408120805460019290612bb590849061413f565b909155505060008281526002602052604080822080546001600160a01b0319169055518391906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b610c4b828260405180602001604052806000815250613132565b6000818152600260205260409020546001600160a01b0316612ca25760405162461bcd60e51b815260206004820152602c60248201527f4552433732314d657461646174613a2055524920736574206f66206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084016108f3565b612cab81612de8565b6000828152600b602090815260409091208251610c4b939192919091019061342a565b816001600160a01b0316836001600160a01b03161415612d305760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016108f3565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c319101611de0565b612da0848484612887565b612dac84848484613165565b61243f5760405162461bcd60e51b81526004016108f390613f3f565b60606040518060600160405280602581526020016142d160259139905090565b606081612e0c5750506040805180820190915260018152600360fc1b602082015290565b8160005b8115612e365780612e20816141d4565b9150612e2f9050600a8361410c565b9150612e10565b6000816001600160401b03811115612e5e57634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015612e88576020820181803683370190505b5090505b841561287f57612e9d60018361413f565b9150612eaa600a866141ef565b612eb59060306140f4565b60f81b818381518110612ed857634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350612efa600a8661410c565b9450612e8c565b60006001600160e01b031982166380ac58cd60e01b1480612f3257506001600160e01b03198216635b5e139f60e01b145b806107e657506301ffc9a760e01b6001600160e01b03198316146107e6565b60606000612f60836002614120565b612f6b9060026140f4565b6001600160401b03811115612f9057634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015612fba576020820181803683370190505b509050600360fc1b81600081518110612fe357634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350600f60fb1b8160018151811061302057634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a9053506000613044846002614120565b61304f9060016140f4565b90505b60018111156130e3576f181899199a1a9b1b9c1cb0b131b232b360811b85600f166010811061309157634e487b7160e01b600052603260045260246000fd5b1a60f81b8282815181106130b557634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a90535060049490941c936130dc81614182565b9050613052565b5083156126795760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016108f3565b61313c8383613272565b6131496000848484613165565b610a295760405162461bcd60e51b81526004016108f390613f3f565b60006001600160a01b0384163b1561326757604051630a85bd0160e11b81526001600160a01b0385169063150b7a02906131a9903390899088908890600401613d69565b602060405180830381600087803b1580156131c357600080fd5b505af19250505080156131f3575060408051601f3d908101601f191682019092526131f091810190613976565b60015b61324d573d808015613221576040519150601f19603f3d011682016040523d82523d6000602084013e613226565b606091505b5080516132455760405162461bcd60e51b81526004016108f390613f3f565b805181602001fd5b6001600160e01b031916630a85bd0160e11b14905061287f565b506001949350505050565b6001600160a01b0382166132c85760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f206164647265737360448201526064016108f3565b6000818152600260205260409020546001600160a01b03161561332d5760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016108f3565b6001600160a01b03821660009081526003602052604081208054600192906133569084906140f4565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b5080546000825590600052602060002090810190610a6b9190613541565b5080546133de90614199565b6000825580601f106133ee575050565b601f016020900490600052602060002090810190610a6b9190613541565b5080546000825590600052602060002090810190610a6b9190613556565b82805461343690614199565b90600052602060002090601f016020900481019282613458576000855561349e565b82601f1061347157805160ff191683800117855561349e565b8280016001018555821561349e579182015b8281111561349e578251825591602001919060010190613483565b506134aa929150613541565b5090565b82805482825590600052602060002090810192821561349e579160200282018281111561349e578251825591602001919060010190613483565b828054828255906000526020600020908101928215613535579160200282015b82811115613535578251805161352591849160209091019061342a565b5091602001919060010190613508565b506134aa929150613556565b5b808211156134aa5760008155600101613542565b808211156134aa57600061356a82826133d2565b50600101613556565b6000613586613581846140cd565b61407a565b905082815283838301111561359a57600080fd5b828260208301376000602084830101529392505050565b80516135bc81614245565b919050565b600082601f8301126135d1578081fd5b813560206135e1613581836140aa565b80838252828201915082860187848660051b8901011115613600578586fd5b855b8581101561361e57813584529284019290840190600101613602565b5090979650505050505050565b8051600c81106135bc57600080fd5b600082601f83011261364a578081fd5b61267983833560208501613573565b60006060828403121561366a578081fd5b604051606081016001600160401b03828210818311171561368d5761368d61422f565b8160405282935084359150808211156136a557600080fd5b6136b1868387016135c1565b835260208501359150808211156136c757600080fd5b506136d4858286016135c1565b602083015250604083013560408201525092915050565b6000602082840312156136fc578081fd5b813561267981614245565b60008060408385031215613719578081fd5b823561372481614245565b9150602083013561373481614245565b809150509250929050565b600080600060608486031215613753578081fd5b833561375e81614245565b9250602084013561376e81614245565b929592945050506040919091013590565b60008060008060808587031215613794578081fd5b843561379f81614245565b935060208501356137af81614245565b92506040850135915060608501356001600160401b038111156137d0578182fd5b8501601f810187136137e0578182fd5b6137ef87823560208401613573565b91505092959194509250565b6000806040838503121561380d578182fd5b823561381881614245565b915060208301358015158114613734578182fd5b6000806040838503121561383e578182fd5b823561384981614245565b946020939093013593505050565b60008060408385031215613869578182fd5b82356001600160401b0381111561387e578283fd5b61388a858286016135c1565b925050602083013561373481614245565b6000806000606084860312156138af578081fd5b83356001600160401b03808211156138c5578283fd5b6138d1878388016135c1565b945060208601359150808211156138e6578283fd5b6138f287838801613659565b93506040860135915080821115613907578283fd5b50613914868287016135c1565b9150509250925092565b60006020828403121561392f578081fd5b5035919050565b60008060408385031215613948578182fd5b82359150602083013561373481614245565b60006020828403121561396b578081fd5b81356126798161425a565b600060208284031215613987578081fd5b81516126798161425a565b6000806000606084860312156139a6578081fd5b83356001600160401b03808211156139bc578283fd5b6139c88783880161363a565b945060208601359150808211156139dd578283fd5b6139e9878388016135c1565b935060408601359150808211156139fe578283fd5b5061391486828701613659565b60008060008060008060c08789031215613a23578384fd5b86516001600160401b03811115613a38578485fd5b8701601f81018913613a48578485fd5b8051613a56613581826140cd565b8181528a6020838501011115613a6a578687fd5b613a7b826020830160208601614156565b8098505050506020870151945060408701519350613a9b6060880161362b565b9250613aa9608088016135b1565b915060a087015190509295509295509295565b60008060008060808587031215613ad1578182fd5b843593506020850135613ae381614245565b92506040850135600b8110613af6578283fd5b915060608501356001600160401b03811115613b10578182fd5b6137ef87828801613659565b60008060408385031215613b2e578182fd5b8235915060208301356001600160401b03811115613b4a578182fd5b613b5685828601613659565b9150509250929050565b60008060408385031215613b72578182fd5b50508035926020909101359150565b60008060008060808587031215613b96578182fd5b5050823594602084013594506040840135936060013592509050565b60008060008060808587031215613bc7578182fd5b843593506020850135925060408501356001600160401b0380821115613beb578384fd5b613bf78883890161363a565b93506060870135915080821115613c0c578283fd5b506137ef87828801613659565b6000815180845260208085019450808401835b83811015613c4857815187529582019590820190600101613c2c565b509495945050505050565b60008151808452613c6b816020860160208601614156565b601f01601f19169290920160200192915050565b600b8110613c9d57634e487b7160e01b600052602160045260246000fd5b9052565b60008351613cb3818460208801614156565b835190830190613cc7818360208801614156565b01949350505050565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351613d08816017850160208801614156565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351613d39816028840160208801614156565b01602801949350505050565b6001600160a01b039384168152919092166020820152604081019190915260600190565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090613d9c90830184613c53565b9695505050505050565b606081526000613db96060830186613c19565b8281036020840152613dcb8186613c19565b915050826040830152949350505050565b60a081526000613def60a0830188613c19565b8281036020840152613e018188613c19565b915050846040830152613e176060830185613c7f565b6001600160a01b039290921660809190910152949350505050565b60a081526000613e4560a0830188613c19565b8281036020840152613e578188613c19565b90508560408401528460608401528281036080840152613e778185613c53565b98975050505050505050565b6020815260006126796020830184613c19565b608081526000613ea96080830187613c19565b8281036020840152613ebb8187613c19565b90508281036040840152613ecf8186613c19565b91505082606083015295945050505050565b6020815260006126796020830184613c53565b60c081526000613f0760c0830189613c53565b9050866020830152856040830152613f226060830186613c7f565b6001600160a01b0393909316608082015260a00152949350505050565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6020808252600c908201526b2737ba1027232a27bbb732b960a11b604082015260600190565b6020808252601590820152742932b9ba3934b1ba32b2103a379030b236b4b7399760591b604082015260600190565b60208082526023908201527f5265737472696374656420746f2046546f6b656e697a6572206f722061646d6960408201526237399760e91b606082015260800190565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b604051601f8201601f191681016001600160401b03811182821017156140a2576140a261422f565b604052919050565b60006001600160401b038211156140c3576140c361422f565b5060051b60200190565b60006001600160401b038211156140e6576140e661422f565b50601f01601f191660200190565b6000821982111561410757614107614203565b500190565b60008261411b5761411b614219565b500490565b600081600019048311821515161561413a5761413a614203565b500290565b60008282101561415157614151614203565b500390565b60005b83811015614171578181015183820152602001614159565b8381111561243f5750506000910152565b60008161419157614191614203565b506000190190565b600181811c908216806141ad57607f821691505b602082108114156141ce57634e487b7160e01b600052602260045260246000fd5b50919050565b60006000198214156141e8576141e8614203565b5060010190565b6000826141fe576141fe614219565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114610a6b57600080fd5b6001600160e01b031981168114610a6b57600080fdfee70d28ebd9d7d9a3dd77d46ae2481f301c80806f395b08de31d8e095b1c46cee8da7d70244203c30977cc84bc73c56df770db659eae5eae031338bf752ed6b187d516c105bee30cf3879df4b9a7cf2e17d81aa2e2cd673a2f488a1d6fadd45ec687474703a2f2f7472616465636f696e436f6d706f736974696f6e2e6e6c2f7661756c742fa26469706673582212202df4ae837aa8c9935e7f33a94777e7c467a30b4bb81f33436556ff73ba426c6d64736f6c63430008040033",
  "linkReferences": {},
  "deployedLinkReferences": {}
}
)