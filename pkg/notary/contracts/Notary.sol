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

    // function registerAsset(Network myNetwork, bytes32 hash, uint8 app, string calldata pathSpec, uint32 expiresAt) external;
    function registerAsset(Network myNetwork, bytes32 hash, uint8 app, string calldata pathSpec, uint32 expiresAt) external override
    ValidHashMod(hash)
    AssetNotRegisteredMod(hash)
    ValidPathSpecMod(pathSpec)
    ValidExpiresAtMod(expiresAt)
    RegisteredApplication(app)
    {
        assets[hash] = Asset({
            network : myNetwork,
            owner : msg.sender,
            app : app,
            pathSpec : pathSpec,
            expiresAt : expiresAt
            });

        emit AssetRegistered(hash, myNetwork, msg.sender);
    }

    function registerAssetOnBehalf(uint8 v, bytes32 r, bytes32 s, bytes16 nonce,
        Network myNetwork, bytes32 hash, uint8 app,
        string calldata pathSpec, uint32 expiresAt) external override
        //ValidHashMod(hash) due to stack too deep error moved to explicit in line check
    AssetNotRegisteredMod(hash)
    ValidPathSpecMod(pathSpec)
    ValidExpiresAtMod(expiresAt)
    {
        require(hash != 0x0, "invalid hash");
        require(bytes(applications[app]).length != 0, "unknown application");

        address owner = ecrecover(onBehalfOfSignHash(hash, nonce), v, r, s);
        require(owner != address(0x0), "invalid signature");

        assets[hash] = Asset({
            network : myNetwork,
            owner : owner,
            app : app,
            pathSpec : pathSpec,
            expiresAt : expiresAt
            });

        emit AssetRegistered(hash, myNetwork, owner);
    }

    // function updateAsset(Network myNetwork, bytes32 currentHash, bytes32 newHash, uint8 app, string calldata pathSpec, uint32 expiresAt) external;
    function updateAsset(Network myNetwork, bytes32 currentHash, bytes32 newHash, uint8 app, string calldata pathSpec, uint32 expiresAt) external override
    ValidPathSpecMod(pathSpec)
    ValidExpiresAtMod(expiresAt)
    AssetOwnedAndNotClaimedMod(currentHash, myNetwork, msg.sender)
    AssetNotRegisteredMod(newHash)
    {
        // Solidity only allows a stack depth of 16 which is hit due to the many
        // modifiers for this function therefore 2 of the modifiers are inlined
        require(currentHash != 0x0, "invalid current hash");
        // ValidHashMod(currentHash)
        require(newHash != 0x0, "invalid new hash");
        // ValidHashMod(newHash)
        require(bytes(applications[app]).length != 0, "unknown application");
        // RegisteredApplication

        assets[newHash] = Asset({
            network : myNetwork,
            owner : msg.sender,
            app : app,
            pathSpec : pathSpec,
            expiresAt : expiresAt
            });

        emit AssetUpdated(newHash, currentHash, myNetwork);
    }

    // function transferOwnership(bytes32 hash, Network myNetwork, Network newNetwork, address newOwner) external;
    function transferOwnership(bytes32 hash, Network myNetwork, Network newNetwork, address newOwner) external override
    ValidAddressMod(newOwner)
    AssetOwnedMod(hash, myNetwork, msg.sender)
    AssetNotClaimedMod(hash)
    {
        require(msg.sender != newOwner, "asset cannot be transfered to current owner");

        pendingTransfers[hash] = Asset({
            network : newNetwork,
            owner : newOwner,
            app : 255,
            pathSpec : "",
            expiresAt : 0
            });

        pendingTransfersTimestamp[hash] = block.timestamp;

        emit AssetNewClaim(hash, pendingTransfers[hash].owner, pendingTransfers[hash].network);
    }

    // function acceptOwnership(bytes32 hash, Network myNetwork, uint8 app, string calldata pathSpec, uint32 expiresAt) external;
    function acceptOwnership(bytes32 hash, Network myNetwork, uint8 app, string calldata pathSpec, uint32 expiresAt) external override
    ValidPathSpecMod(pathSpec)
    ValidExpiresAtMod(expiresAt)
    AssetNotOwnedMod(hash, myNetwork, msg.sender)
    RegisteredApplication(app)
    {
        require(pendingTransfers[hash].owner == msg.sender, "asset is not marked for ownership transfer to sender");

        pendingTransfers[hash].app = app;
        pendingTransfers[hash].pathSpec = pathSpec;
        pendingTransfers[hash].expiresAt = expiresAt;

        transferOwnership(hash);
    }


    // function rejectOwnership(bytes32 hash, Network myNetwork) external;
    function rejectOwnership(bytes32 hash, Network myNetwork) external override {
        require(pendingTransfers[hash].owner == msg.sender, "asset is not marked for ownership transfer to sender");
        require(pendingTransfers[hash].network == myNetwork, "asset is not marked for ownership transfer to sender");

        delete pendingTransfers[hash];
        delete pendingTransfersTimestamp[hash];

        emit AssetClaimRejected(hash);
    }

    // function claimAsset(bytes32 hash, Network myNetwork, uint8 app, string calldata pathSpec, uint32 expiresAt) external;
    function claimAsset(bytes32 hash, Network myNetwork, uint8 app, string calldata pathSpec, uint32 expiresAt) external override
    ValidPathSpecMod(pathSpec)
    ValidExpiresAtMod(expiresAt)
    AssetRegisteredMod(hash)
    AssetNotClaimedMod(hash)
    RegisteredApplication(app)
    {
        pendingTransfers[hash] = Asset({network : myNetwork, owner : msg.sender, app : app, pathSpec : pathSpec, expiresAt : expiresAt});
        pendingTransfersTimestamp[hash] = block.timestamp;

        emit AssetNewClaim(hash, assets[hash].owner, assets[hash].network);
    }

    /// @notice Called by the current owner in case it grands an ownership claim.
    //function acceptClaim(bytes32 hash, Network myNetwork) external;
    function acceptClaim(bytes32 hash, Network myNetwork) external override
    AssetOwnedMod(hash, myNetwork, msg.sender)
    AssetClaimedMod(hash)
    {
        transferOwnership(hash);
    }

    /// @notice Called by the current owner in case it doesn't want to grand an ownership claim.
    // function rejectClaim(bytes32 hash, Network myNetwork) external;
    function rejectClaim(bytes32 hash, Network myNetwork) external override
    AssetOwnedMod(hash, myNetwork, msg.sender)
    AssetClaimedMod(hash)
    {
        delete pendingTransfers[hash];
        delete pendingTransfersTimestamp[hash];

        emit AssetClaimRejected(hash);
    }

    /// @notice delete an asset from the notary.
    // function deleteAsset(bytes32 hash, Network myNetwork) external;
    function deleteAsset(bytes32 hash, Network myNetwork) external override
    AssetOwnedMod(hash, myNetwork, msg.sender)
    AssetNotClaimedMod(hash)
    {
        delete assets[hash];

        emit AssetDeleted(hash);
    }
}
