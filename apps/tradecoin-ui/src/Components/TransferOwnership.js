import React from "react";
import { useState } from "react";
import { ethers } from "ethers";

const config = require("../config");
const {
  YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS,
  YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS_ABI
} = config.default;
function TransferOwnershipComponent() {
  const [tokenId, setTokenIdVal] = useState(0);
  const [address1, setAddress1Val] = useState("");

  async function transferOwnership() {
    if (!tokenId && !address1) return;
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS, YOUR_TOKENIZATION_TOKEN_CONTRACT_ADDRESS_ABI, signer);
        const transaction = await contract.transferOwnership(tokenId, address1);
        await transaction.wait();
      } catch (err) {
        console.log("Error: ", err.data.message);
        window.alert(err.data.message);
      }
    }
  }

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  return (
    <div>
      <button onClick={transferOwnership}>Transfer ownership of Product</button>
      <input
        onChange={(e) => setTokenIdVal(e.target.value)}
        placeholder="Token ID of Product"
      />
      <input
        onChange={(e) => setAddress1Val(e.target.value)}
        placeholder="Address of new Owner"
      />
    </div>
  );
}

export default TransferOwnershipComponent;
