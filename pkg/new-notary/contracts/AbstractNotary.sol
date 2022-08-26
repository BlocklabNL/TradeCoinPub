// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

/// @title  Notary defines the interface for a Deliver Notary service.
/// @author Bas van kervel (bas.van.kervel@nl.abnamro.com)
/// @notice It keeps track of current registed asset in the smart contract state.
///         Past assets that have been delete can be traced through logs.
abstract contract AbstractNotary {
    /// @notice raised then a new asset is registed.
    /// @param hash     sha256 digest of the registered asset
    /// @param owner    owner address
    event AssetRegistered(bytes32 indexed hash, address owner);

    /// @notice raised then a new version of an existing asset is registed.
    /// @param newHash      hash of the new updated version of the document
    /// @param previousHash hash of the asset where this asset is an update of
    event AssetUpdated(bytes32 indexed newHash, bytes32 indexed previousHash);

    /// @notice raised then the registration of an asset is deleted.
    /// @param hash         sha256 digest of the asset
    event AssetDeleted(bytes32 indexed hash);
    
    /// @notice Asset is the digital representation to trace an asset.
    struct Asset {
        address owner;
        uint32 expiresAt;
    }

    // @notice keep track of the on behalf of action.
    //enum OnBehalfOfAction {REGISTER, TRANSFER_OWNERSHIP}

    /// @notice keeps track of registed assets.
    mapping(bytes32 => Asset) public assets;

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

    /// @notice Register a new asset onto the blockchain. It will ensure that the asset is not
    /// already registred. If necessary it must be deleted first.
    /// It will emit the AssetRegistered event.
    ///
    /// @param hash         sha256 digest of the asset
    /// @param expiresAt    unix timestamp until the owner guarantees that the asset can be fetch from the endpoint
    function registerAsset(bytes32 hash, uint32 expiresAt) external virtual;

    /// @notice Register a new asset onto the blockchain on behalf of someone else.
    /// It will ensure that the asset is not already registred. If necessary it must be deleted first.
    /// It will emit the AssetRegistered event.
    ///
    /// @param v            the v part of the ecdsa signature of the entity to register on behalf of
    /// @param r            the r part of the ecdsa signature of the entity to register on behalf of
    /// @param s            the s part of the ecdsa signature of the entity to register on behalf of
    /// @param nonce        transaction nonce of entity to register on behalf of
    /// @param hash         sha256 digest of the asset
    /// @param expiresAt    unix timestamp until the owner guarantees that the asset can be fetch from the endpoint
    function registerAssetOnBehalf(uint8 v, bytes32 r, bytes32 s, bytes16 nonce, bytes32 hash, uint32 expiresAt, address signer) external virtual;

    /// @notice Calculate a hash to be signed by an entity that orders someone else to register an
    /// asset on behalf.
    ///
    /// @param dataHash     the hash of the items to be registered
    /// @param nonce        unique random nonce
    function onBehalfOfSignHash(bytes32 dataHash, bytes16 nonce) public view returns (bytes32) {
        return keccak256(abi.encode(address(this), dataHash, nonce));
    }

    /// @notice Calculate a hash to be signed by an entity that orders someone else to register an
    /// asset on behalf.
    ///
    /// @param docHash   the keccak256 hash of a document           
    /// @param expiresAt expiry of document
    function hashDocData(bytes32 docHash, uint32 expiresAt) public pure returns (bytes32) {
        return keccak256(abi.encode(docHash, expiresAt));
    }

    /// @notice Calculate hash of a message and complies with standards supported
    /// by web3js. Signature is produced by signing a keccak256 hash with the following format:
    /// "\x19Ethereum Signed Message\n" + len(msg) + msg. In this case a hash is signed
    /// hence message length is by design 32 since all hashes have a lenght of 32 hex characters.
    ///
    /// @param messageHash a keccak246 hash of a message
    function getEthSignedMessageHash(bytes32 messageHash) public pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash));
    }


    /// @notice generateAssetHash is a helper function that generates
    /// a hashed ethereum message with the data that corresponds to an
    /// asset.
    ///
    /// @param fileHash a keccak256 hash of a file
    /// @param expiresAt an expiry date in unix time
    /// @param nonce a 16 byte randomely gnereated hex number
    function generateAssetHash(bytes32 fileHash, uint32 expiresAt, bytes16 nonce) public view returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", keccak256(abi.encode(address(this), keccak256(abi.encode(fileHash, expiresAt)), nonce))));
    }


    /// @notice Update an existing asset when a new version is available. It will ensure that the update
    /// is send by the current owner. It will emit the AssetUpdated event.
    ///
    /// @param currentHash  hash of the asset to update
    /// @param newHash      hash of the updated version
    /// @param expiresAt    unix timestamp until the owner guarantees that the updated asset can be fetched from the endpoint
    function updateAsset(bytes32 currentHash, bytes32 newHash, uint32 expiresAt) external virtual;

    /// @notice Delete the registration from an asset. This can only be done by the asset owner.
    /// It will emit the AssetDeleted event.
    /// @param hash         hash of the asset to delete
    function deleteAsset(bytes32 hash) external virtual;

    /// @notice ensure that the asset is owned by addr.
    modifier AssetOwnedMod(bytes32 hash, address addr) {
        require(assets[hash].owner == addr, "asset not owned");
        _;
    }

    /// @notice ensure that the asset is currently not owned by the network/addr.
    modifier AssetNotOwnedMod(bytes32 hash, address addr) {
        require(assets[hash].owner != addr, "asset owned");
        _;
    }

    /// @notice ensure that the hash doesn't point to an already registered asset.
    modifier AssetNotRegisteredMod(bytes32 hash) {
        require(assets[hash].owner == address(0x0), "asset already registered");
        _;
    }

    /// @notice ensure that the given hash point to a registered hash.
    modifier AssetRegisteredMod(bytes32 hash) {
        require(assets[hash].owner != address(0x0), "asset not registered");
        _;
    }

    /// @notice ensure that the given addr is not the 0x0 address.
    modifier ValidAddressMod(address addr) {
        require(addr != address(0x0), "invalid address");
        _;
    }

     /// @notice ensure that the given hash is not the 0x0 hash.
    modifier ValidHashMod(bytes32 hash) {
        require(hash != 0x0, "not a valid hash used");
        _;
    }

    /// @notice ensure that the given expiresAt is in the future.
    modifier ValidExpiresAtMod(uint32 expiresAt) {
        require(block.timestamp < expiresAt, "expiresAt must be in the future");
        _;
    }
}


