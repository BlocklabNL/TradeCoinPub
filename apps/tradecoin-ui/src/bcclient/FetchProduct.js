import { ethers } from "ethers";

const config = require("../config.js");
const {
  YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS,
  YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS_ABI
} = config.default;

export default class FetchProduct {
    async printListners() {
        console.log("--------printListners");
        if (typeof window.ethereum !== "undefined") {
            await requestAccount();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS, YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS_ABI, provider);
            try {
                console.log("printListners--------contract", contract);
                contract.listeners("InitialTokenizationEvent", (listeners) => {
                    console.log("printListners************--------listeners", listeners);
                })
            } catch (err) {
                console.log("Error: ", err);
                // window.alert(err.data.message);
            }
        }
    }

    async fetchProduct(tokenId) {
        var productData = {
            tokenURI:'',
        }
        if (!tokenId) return;
        if (typeof window.ethereum !== "undefined") {
            await requestAccount();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS, YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS_ABI, provider);
            try {
                const tokenURI = await contract.tokenURI(tokenId);
                const dataTransformationsLength = await contract.getTransformationsLength(tokenId);
                let dataTransformations = [];
                if (dataTransformationsLength) {
                    for (var i = 0; i < dataTransformationsLength.toNumber(); i++) {
                        var data = await contract.getTransformationsbyIndex(tokenId, i);
                        dataTransformations.push(data);
                    }
                }
                productData.tokenURI = tokenURI;
            } catch (err) {
                console.log("Error: ", err);
                // window.alert(err.data.message);
            }
        }

        console.log("-------", productData);
        return productData;
    }
}
async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
}