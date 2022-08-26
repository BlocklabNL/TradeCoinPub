// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

import {Mortal} from "./Mortal.sol";
import {AbstractNotary} from "./AbstractNotary.sol";

contract Notary is Mortal, AbstractNotary {

    /// block number in which the contract was deployed.
    uint public deployedOn;

    constructor() public {
        deployedOn = block.number;
        whitelist[msg.sender] = true;
    }

    function registerAsset(bytes32 hash, uint32 expiresAt) external override
    ValidHashMod(hash)
    AssetNotRegisteredMod(hash)
    ValidExpiresAtMod(expiresAt)
    {
        assets[hash] = Asset({
            owner : msg.sender,
            expiresAt : expiresAt
        });

        emit AssetRegistered(hash, msg.sender);
    }

    function registerAssetOnBehalf(uint8 v, bytes32 r, bytes32 s, bytes16 nonce, bytes32 fileHash, uint32 expiresAt, address signer) external override
    ValidHashMod(fileHash)
    AssetNotRegisteredMod(fileHash)
    ValidExpiresAtMod(expiresAt)
    {
        //signature verification
        address owner = ecrecover(generateAssetHash(fileHash, expiresAt, nonce), v, r, s);

        require(owner != address(0), "ECDSA: invalid signature");
        require(owner == signer, "signer of message and recovered owner do not match");
        

        assets[fileHash] = Asset({
            owner : owner,
            expiresAt : expiresAt
        });

        emit AssetRegistered(fileHash, owner);
    }

    function updateAsset(bytes32 currentHash, bytes32 newHash, uint32 expiresAt) external override
    AssetOwnedMod(currentHash, msg.sender)
    ValidExpiresAtMod(expiresAt)
    AssetNotRegisteredMod(newHash)
    {
        // Solidity only allows a stack depth of 16 which is hit due to the many
        // modifiers for this function therefore 2 of the modifiers are inlined
        require(currentHash != 0x0, "invalid current hash");
        require(newHash != 0x0, "invalid new hash");

        assets[newHash] = Asset({
            owner : msg.sender,
            expiresAt : expiresAt
        });

        emit AssetUpdated(newHash, currentHash);
    }

    /// @notice delete an asset from the notary.
    // function deleteAsset(bytes32 hash, Network myNetwork) external;
    function deleteAsset(bytes32 hash) external override
    AssetOwnedMod(hash, msg.sender)
    {
        delete assets[hash];

        emit AssetDeleted(hash);
    }
}
