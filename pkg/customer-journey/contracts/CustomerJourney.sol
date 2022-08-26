// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

import {Mortal} from "@deliver/contracts-notary/contracts/Mortal.sol";
import {Notary} from "@deliver/contracts-notary/contracts/Notary.sol";

/// @notice CustomerJourney links assets that are part of a journey together.
///         Someone that has access to an asset can use that asset to find
///         other assets that are linked to the journey.
contract CustomerJourney is Mortal {
    /// raised when a new journey is started.
    event JourneyStart(bytes32 indexed hash, uint8 typ, string key, address indexed initiator);
    
    /// raised when a new asset is linked to 
    event AssetLinked(bytes32 indexed parent, bytes32 indexed hash, uint8 typ, string key);

    /// raised when a new document type is registered
    event DocumentTypeRegistered(uint8 indexed docType, string description);
    
    /// @dev notary that is used to check asset ownership.
    Notary notary;
    
    /// collection of addresses that are allowed to interact.
    mapping(address => bool) public allowed;
    
    /// @dev collection of assets that are part of 1 or more journey's.
    mapping(bytes32 => bool) private journeyAssets;

    /// block number in which the contract was deployed.
    uint public deployedOn;

    /// holds the collection with registered document types
    mapping(uint8 => string) public documents;

    /// maps the registered document description to its unique identifier
    mapping(string => uint8) public documentDescriptionMapping;
    
    /// @notice create new instance of this smart contract.
    constructor(address notaryAddress) public {
        notary = Notary(notaryAddress);
        deployedOn = block.number;
        allowed[msg.sender] = true;
    }
    
    /// @notice add user to the list of allowed users.
    function addUser(address user) external isAllowed {
        allowed[user] = true;
    }
    
    /// @notice remote user from the list of allowed users.
    function delUser(address user) external isAllowed {
        delete(allowed[user]);
    }

    function RegisterDocument(uint8 docType, string calldata description) external isAllowed {
        require(bytes(documents[docType]).length == 0, "document already registered");

        documents[docType]  = description;
        documentDescriptionMapping[description] = docType;

        emit DocumentTypeRegistered(docType, description);
    }
    
    /// @notice begin a customer journey. It will ensure that the given
    ///         hash is currently owner by the transaction signer.
    /// @param  hash    hash of the first asset that indicated the
    ///                 start of the journey, e.g. booking request.
    function Start(bytes32 hash, uint8 docType, string calldata key) external
    isAllowed
    assetOwned(hash, msg.sender)
    assetIsNotInTransfer(hash)
    knownDocumentType(docType)
    {
        require(!journeyAssets[hash], "asset already part of another journey");

        journeyAssets[hash] = true;
        emit JourneyStart(hash, docType, key, msg.sender);
    }
    
    /// @notice Add an asset into an existing customer journey by linking it to an existing asset.
    ///         It will ensure that the asset to be linked is currently owned and not marked for
    ///         ownership transfer.
    function Link(bytes32 parent, bytes32 hash, uint8 docType, string calldata key) external
    isAllowed
    assetOwned(hash, msg.sender)
    assetIsNotInTransfer(hash)
    knownDocumentType(docType)
    {
        require(journeyAssets[parent], "parent hash is not part of journey");
        
        journeyAssets[hash] = true;
        emit AssetLinked(parent, hash, docType, key);
    }
    
    /// @notice ensure that the given address is allowed to interact with the contract.
    modifier isAllowed() {
        require(allowed[msg.sender], "not allowed");
        _;
    }
    
    /// @notice ensure that the asset identified by the given hash is
    ///         owned by the given address according to the notary.
    modifier assetOwned(bytes32 hash, address addr) {
        address owner;
        (,owner,,,) = notary.assets(hash);
        require(owner == addr, "asset not owned");
        _;
    }
    
    /// @notice ensure that the asset is not marked for transfer in the notary.
    modifier assetIsNotInTransfer(bytes32 hash) {
        uint256 timestamp = notary.pendingTransfersTimestamp(hash);
        require(timestamp == 0, "asset marked for transfer");
        _;
    }

    modifier knownDocumentType(uint8 docTyp) {
        require(bytes(documents[docTyp]).length > 0, "unknown document");
        _;
    }
}
