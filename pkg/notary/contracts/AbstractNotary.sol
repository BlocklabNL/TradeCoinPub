// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

/// @title  Notary defines the interface for a Deliver Notary service.
/// @author Bas van kervel (bas.van.kervel@nl.abnamro.com)
/// @notice It keeps track of current registed asset in the smart contract state.
///         Past assets that have been delete can be traced through logs.
abstract contract AbstractNotary {
    /// @notice raised then a new asset is registed.
    /// @param hash     sha256 digest of the registered asset
    /// @param network  owner network
    /// @param owner    owner address
    event AssetRegistered(bytes32 indexed hash, Network network, address owner);

    /// @notice raised then a new version of an existing asset is registed.
    /// @param newHash      hash of the new updated version of the document
    /// @param previousHash hash of the asset where this asset is an update of
    /// @param network      network of the sender
    event AssetUpdated(bytes32 indexed newHash, bytes32 indexed previousHash, Network network);

    /// @notice initiate the transfer of ownership.
    /// @param hash     sha256 digest of the asset
    /// @param addr     party that can process the claim by approving or rejecting it (depending wo initiated the transfer of ownership this can be either the current or the presumably new owner)
    /// @param network  network of owner
    event AssetNewClaim(bytes32 hash, address indexed addr, Network indexed network);

    /// @notice raised when the current owner of an assets rejected an ownership claim.
    /// @param hash     sha256 digest of the asset
    event AssetClaimRejected(bytes32 indexed hash);

    /// @notice raised when the asset transfer is accepted by all parties.
    /// @param hash         sha256 digest of the asset
    /// @param oldNetwork   network where the asset was previously owned by
    /// @param oldOwner     entity that previously owner the asset
    /// @param newNetwork   network where the asset current is owner by
    /// @param newOwner     entity that currently owns the asset
    event AssetOwnershipTransferred(bytes32 indexed hash, Network oldNetwork, address oldOwner, Network newNetwork, address newOwner);

    /// @notice raised then the registration of an asset is deleted.
    /// @param hash         sha256 digest of the asset
    event AssetDeleted(bytes32 indexed hash);

    /// @notice raised when a new application is registered.
    /// @param appId        application identifier
    /// @param description  application description
    event ApplicationRegistered(uint8 indexed appId, string description);

    /// @notice Asset is the digital representation to trace an asset.
    struct Asset {
        Network network;
        address owner;
        uint8 app;
        string pathSpec;
        uint32 expiresAt;
    }

    /// @notice Network indicates which network the asset is currently administrated.
    enum Network {UNKNOWN, CELLO, DELIVER}

    /// @notice keep track of the on behalf of action.
    enum OnBehalfOfAction {REGISTER, TRANSFER_OWNERSHIP}

    /// @notice keeps track of registed assets.
    mapping(bytes32 => Asset) public assets;

    /// @notice keep track of assets that are currently marked for ownership transfer.
    mapping(bytes32 => Asset) public pendingTransfers;

    /// @notice keep track of when a ownership transfer was started
    mapping(bytes32 => uint256) public pendingTransfersTimestamp;

    /// @notice holds the list of registered applications known by the notary
    mapping(uint8 => string) public applications;

    /// @notice find the application identifier by its description
    mapping(string => uint8) public applicationByDescription;

    /// @notice holds the list of accounts that can manage the application list
    mapping(address => bool) public whitelist;

    function addToWhitelist(address admin) external {
        require(whitelist[msg.sender], "caller not on whitelist");
        whitelist[admin] = true;
    }

    function deleteFromWhitelist(address admin) external {
        require(whitelist[msg.sender], "caller not on whitelist");
        whitelist[admin] = false;
    }

    function registerApplication(uint8 appId, string calldata description) external {
        require(whitelist[msg.sender], "caller not on whitelist");
        require(bytes(description).length > 0, "description cannot be empty");
        require(bytes(applications[appId]).length == 0, "application already registered");

        applications[appId] = description;
        applicationByDescription[description] = appId;

        emit ApplicationRegistered(appId, description);
    }

    /// @notice Register a new asset onto the blockchain. It will ensure that the asset is not
    /// already registred. If necessary it must be deleted first.
    /// It will emit the AssetRegistered event.
    ///
    /// @param myNetwork    the network of the sender
    /// @param hash         sha256 digest of the asset
    /// @param app          application where the asset can be retrieved from
    /// @param pathSpec     path fragments to assemble the endpoint where to retrieve the asset from
    /// @param expiresAt    unix timestamp until the owner guarantees that the asset can be fetch from the endpoint
    function registerAsset(Network myNetwork, bytes32 hash, uint8 app, string calldata pathSpec, uint32 expiresAt) external virtual;

    /// @notice Register a new asset onto the blockchain on behalf of someone else.
    /// It will ensure that the asset is not already registred. If necessary it must be deleted first.
    /// It will emit the AssetRegistered event.
    ///
    /// @param v            the v part of the ecdsa signature of the entity to register on behalf of
    /// @param r            the r part of the ecdsa signature of the entity to register on behalf of
    /// @param s            the s part of the ecdsa signature of the entity to register on behalf of
    /// @param myNetwork    the network of the sender
    /// @param hash         sha256 digest of the asset
    /// @param app          application where the asset can be retrieved from
    /// @param pathSpec     path fragments to assemble the endpoint where to retrieve the asset from
    /// @param expiresAt    unix timestamp until the owner guarantees that the asset can be fetch from the endpoint
    function registerAssetOnBehalf(uint8 v, bytes32 r, bytes32 s, bytes16 nonce, Network myNetwork, bytes32 hash, uint8 app,
        string calldata pathSpec, uint32 expiresAt) external virtual;

    /// @notice Calculate a hash to be signed by an entity that orders someone else to register an
    /// asset on behalf.
    ///
    /// @param assetHash    hash of the asset to register
    /// @param nonce        unique random nonce
    function onBehalfOfSignHash(bytes32 assetHash, bytes16 nonce) public view returns (bytes32) {
        return keccak256(abi.encode(this, OnBehalfOfAction.REGISTER, assetHash, nonce));
    }

    /// @notice Update an existing asset when a new version is available. It will ensure that the update
    /// is send by the current owner. It will emit the AssetUpdated event.
    ///
    /// @param myNetwork    the network of the sender
    /// @param currentHash  hash of the asset to update
    /// @param newHash      hash of the updated version
    /// @param app          application where the asset can be retrieved from
    /// @param pathSpec     path fragments to assemble the endpoint where to retrieve the asset from
    /// @param expiresAt    unix timestamp until the owner guarantees that the updated asset can be fetched from the endpoint
    function updateAsset(Network myNetwork, bytes32 currentHash, bytes32 newHash, uint8 app, string calldata pathSpec, uint32 expiresAt) external virtual;

    /// @notice Initiate the transfer of ownership.
    /// Will raise the AssetNewClaim event.
    /// @param hash         the asset hash to move
    /// @param myNetwork    the network of the sender
    /// @param newNetwork   the network the asset is moved to
    /// @param newOwner     address of the new owner
    function transferOwnership(bytes32 hash, Network myNetwork, Network newNetwork, address newOwner) external virtual;

    /// @notice Called by the new owner when it accepts ownership of the asset.
    /// Will raise the AssetOwnershipTransferred event.
    /// @param hash         the asset hash to claim
    /// @param myNetwork    the network of the sender
    /// @param app          application where the asset can be retrieved from
    /// @param pathSpec     path fragments to assemble the endpoint where to retrieve the asset from
    /// @param expiresAt    unix timestamp until the owner guarantees that the updated asset can be fetched from the endpoint
    function acceptOwnership(bytes32 hash, Network myNetwork, uint8 app, string calldata pathSpec, uint32 expiresAt) external virtual;

    /// @notice Called by the new owner when it rejects ownership of the asset.
    /// Will raise the AssetClaimRejected event.
    /// @param hash         the asset hash to claim
    /// @param myNetwork    the network of the sender
    function rejectOwnership(bytes32 hash, Network myNetwork) external virtual;

    /// @notice Called by someone that wants to claim the asset.
    /// Will raise the AssetNewClaim event.
    /// @param hash         the asset hash to claim
    /// @param myNetwork    the network of the sender
    /// @param app          application where the asset can be retrieved from
    /// @param pathSpec     path fragments to assemble the endpoint where to retrieve the asset from
    /// @param expiresAt    unix timestamp until the owner guarantees that the updated asset can be fetched from the endpoint
    function claimAsset(bytes32 hash, Network myNetwork, uint8 app, string calldata pathSpec, uint32 expiresAt) external virtual;

    /// @notice Called by the current owner in case it grands an ownership claim.
    /// Will raise the AssetOwnershipTransferred event.
    /// @param hash         the asset hash to claim
    /// @param myNetwork    the network of the sender
    function acceptClaim(bytes32 hash, Network myNetwork) external virtual;

    /// @notice Called by the current owner in case it doesn't want to grand an ownership claim.
    /// Will raise the AssetClaimRejected event.
    /// @param hash         the asset hash to claim
    /// @param myNetwork    the network of the sender
    function rejectClaim(bytes32 hash, Network myNetwork) external virtual;

    /// @notice Delete the registration from an asset. This can only be done by the asset owner.
    /// It will emit the AssetDeleted event.
    /// @param hash         hash of the asset to delete
    function deleteAsset(bytes32 hash, Network myNetwork) external virtual;

    /// @notice finialise transfer of ownership.
    function transferOwnership(bytes32 hash) internal {
        assert(assets[hash].owner != address(0x0));
        assert(pendingTransfers[hash].owner != address(0x0));

        Asset storage asset = assets[hash];
        Asset storage pAsset = pendingTransfers[hash];

        emit AssetOwnershipTransferred(hash, asset.network, asset.owner, pAsset.network, pAsset.owner);

        delete assets[hash];
        assets[hash] = Asset({
            network : pAsset.network,
            owner : pAsset.owner,
            app : pAsset.app,
            pathSpec : pAsset.pathSpec,
            expiresAt : pAsset.expiresAt
            });

        delete pendingTransfers[hash];
        delete pendingTransfersTimestamp[hash];
    }

    /// @notice let anyone cleanup pending claims that have not been approved/rejects within 3 days.
    /// @param hashes   list with asset hashes for claims that can be cleaned up
    function cancelTransferOwnership(bytes32[] memory hashes) public {
        for (uint i = 0; i < hashes.length; i++) {
            if (block.timestamp > pendingTransfersTimestamp[hashes[i]] + 3 * 1 days) {
                delete pendingTransfers[hashes[i]];
                delete pendingTransfersTimestamp[hashes[i]];
            }
        }
    }

    /// @notice ensure that the given hash is not the 0x0 hash.
    modifier ValidHashMod(bytes32 hash) {
        require(hash != 0x0, "invalid hash");
        _;
    }

    /// @notice ensure that the given addr is not the 0x0 address.
    modifier ValidAddressMod(address addr) {
        require(addr != address(0x0), "invalid address");
        _;
    }

    /// @notice ensure that the given hash point to a registered hash.
    modifier AssetRegisteredMod(bytes32 hash) {
        require(assets[hash].owner != address(0x0), "asset not registered");
        _;
    }

    /// @notice ensure that the hash doesn't point to an already registered asset.
    modifier AssetNotRegisteredMod(bytes32 hash) {
        require(assets[hash].owner == address(0x0), "asset already registered");
        _;
    }

    /// @notice ensure that the given pathSpec is valid.
    modifier ValidPathSpecMod(string memory pathSpec) {
        require(bytes(pathSpec).length > 5, "invalid pathSpec");
        _;
    }

    /// @notice ensure that the given expiresAt is in the future.
    modifier ValidExpiresAtMod(uint32 expiresAt) {
        require(block.timestamp < expiresAt, "expiresAt must be in the future");
        _;
    }

    /// @notice ensure that the given asset has a pending claim.
    modifier AssetClaimedMod(bytes32 hash) {
        require(pendingTransfers[hash].owner != address(0x0), "asset not claimed");
        _;
    }

    /// @notice ensure that the given asset has no pending claim.
    modifier AssetNotClaimedMod(bytes32 hash) {
        require(pendingTransfers[hash].owner == address(0x0), "asset already claimed");
        _;
    }

    /// @notice ensure that the asset is owner by network/addr.
    modifier AssetOwnedMod(bytes32 hash, Network network, address addr) {
        require(assets[hash].network == network, "asset not owned by the network");
        require(assets[hash].owner == addr, "asset not owned");
        _;
    }

    /// @notice ensure that the asset is currently not owned by the network/addr.
    modifier AssetNotOwnedMod(bytes32 hash, Network network, address addr) {
        require(assets[hash].owner != addr, "asset owned");
        _;
    }

    /// @notice ensure that the asset identified by the given hash is owned by
    /// the given network/addr and there is no pending for ownership transfer.
    modifier AssetOwnedAndNotClaimedMod(bytes32 hash, Network network, address addr) {
        require(assets[hash].network == network, "asset not owned by the network");
        require(assets[hash].owner == addr, "asset not owned");
        require(pendingTransfers[hash].owner == address(0x0), "asset already claimed");
        _;
    }

    modifier RegisteredApplication(uint8 appId) {
        require(bytes(applications[appId]).length != 0, "application not registered");
        _;
    }
}


