require('dotenv').config();

const tradeCoinERC721 = require('./contracts/TradeCoinERC721').default;
const tradeCoinCompositionERC721 = require('./contracts/TradeCoinCompositionERC721').default;
const tradeCoinCompositionSales = require('./contracts/TradeCoinCompositionSales').default;

const {
  REACT_APP_TRADECOIN_CONTRACT_ADDRESS,
  REACT_APP_TRADECOIN_COMPOSITION_CONTRACT_ADDRESS,
  REACT_APP_TRADECOIN_COMPOSITION_SALES_CONTRACT_ADDRESS,
  REACT_APP_ETHEREUM_PASSWORD,
  REACT_APP_ETHEREUM_PROVIDER_IP,
  REACT_APP_CONTRACT_OWNER,
  REACT_APP_GEOLOCATION_KEY
} = process.env;

if (!REACT_APP_ETHEREUM_PASSWORD) {
  console.log('[WARNING] ETHEREUM_PASSWORD is empty')
}

if (!REACT_APP_TRADECOIN_CONTRACT_ADDRESS) {
  console.log('[WARNING] TRADECOIN_CONTRACT_ADDRESS is empty');
}

if (!REACT_APP_TRADECOIN_COMPOSITION_CONTRACT_ADDRESS) {
  console.log('[WARNING] TRADECOIN_COMPOSITION_CONTRACT_ADDRESS is empty');
}

if (!REACT_APP_TRADECOIN_COMPOSITION_SALES_CONTRACT_ADDRESS) {
  console.log('[WARNING] REACT_APP_TRADECOIN_COMPOSITION_SALES_CONTRACT_ADDRESS is empty');
}

if (!REACT_APP_ETHEREUM_PROVIDER_IP) {
  console.log('[WARNING] ETHEREUM_PROVIDER_IP is empty');
}

if (!REACT_APP_CONTRACT_OWNER) {
  console.log('[WARNING] CONTRACT_OWNER is empty')
}

if (!REACT_APP_GEOLOCATION_KEY) {
  console.log('[WARNING] GEOLOCATION_KEY is empty');
}

const YOUR_ETH_NODE_ADDRESS = REACT_APP_ETHEREUM_PROVIDER_IP;

const YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS = REACT_APP_TRADECOIN_CONTRACT_ADDRESS;
const YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS_ABI = tradeCoinERC721(REACT_APP_TRADECOIN_CONTRACT_ADDRESS).abi;

const YOUR_TOKENIZATION_TOKEN_COMPOSITION_CONTRACT_ADDRESS = REACT_APP_TRADECOIN_COMPOSITION_CONTRACT_ADDRESS;
const YOUR_TOKENIZATION_TOKEN_COMPOSITION_CONTRACT_ADDRESS_ABI = tradeCoinCompositionERC721(REACT_APP_TRADECOIN_COMPOSITION_CONTRACT_ADDRESS).abi;

const YOUR_TOKENIZATION_TOKEN_COMPOSITION_SALES_CONTRACT_ADDRESS = REACT_APP_TRADECOIN_COMPOSITION_SALES_CONTRACT_ADDRESS;
const YOUR_TOKENIZATION_TOKEN_COMPOSITION_SALES_CONTRACT_ADDRESS_ABI = tradeCoinCompositionSales(REACT_APP_TRADECOIN_COMPOSITION_SALES_CONTRACT_ADDRESS).abi;

const YOUR_CONTRACT_OWNER = REACT_APP_CONTRACT_OWNER;

const ETHEREUM_PASSWORD = REACT_APP_ETHEREUM_PASSWORD;
const GEOLOCATION_KEY = REACT_APP_GEOLOCATION_KEY;

export default {
  YOUR_ETH_NODE_ADDRESS,
  YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS,
  YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS_ABI,
  YOUR_TOKENIZATION_TOKEN_COMPOSITION_CONTRACT_ADDRESS,
  YOUR_TOKENIZATION_TOKEN_COMPOSITION_CONTRACT_ADDRESS_ABI,
  YOUR_TOKENIZATION_TOKEN_COMPOSITION_SALES_CONTRACT_ADDRESS,
  YOUR_TOKENIZATION_TOKEN_COMPOSITION_SALES_CONTRACT_ADDRESS_ABI,
  ETHEREUM_PASSWORD,
  YOUR_CONTRACT_OWNER,
  GEOLOCATION_KEY
};
