// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

import {Mortal} from "@deliver/contracts-new-notary/contracts/Mortal.sol";
import {Notary} from "@deliver/contracts-new-notary/contracts/Notary.sol";

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

    /// raised when a document type is deleted
    event DocumentTypeDeleted(uint8 docType, string description);
    
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

    /// @notice adds a document type and its description.
    /// @param  docType     identifier of document type to add
    /// @param  description description of document type
    function RegisterDocument(uint8 docType, string calldata description) external isAllowed {
        require(bytes(documents[docType]).length == 0, "document already registered");

        documents[docType]  = description;
        documentDescriptionMapping[description] = docType;

        emit DocumentTypeRegistered(docType, description);
    }

    /// @notice removes a document type and its description.
    /// @param  docType    identifier of document type to delete
    function RemoveDocument(uint8 docType) external isAllowed {
        require(bytes(documents[docType]).length > 0, "document does not exist");

        string memory description = documents[docType];

        delete documents[docType];
        delete documentDescriptionMapping[description];

        emit DocumentTypeDeleted(docType, description);
    }
    
    /// @notice begin a customer journey. It will ensure that the given
    ///         hash is currently owner by the transaction signer.
    /// @param  docHash hash of the first asset that indicated the
    ///                 start of the journey, e.g. booking request.
    /// @param  docType type of the document. Document type has to be registered
    ///                 beforehand and has to exist in documents mapping.
    /// @param  key     key is a string that may be used to descirbe document.
    ///                 it allows key word searching on journeys.
    function Start(bytes32 docHash, uint8 docType, string calldata key) external
    isAllowed
    assetOwned(docHash, msg.sender)
    knownDocumentType(docType)
    {
        require(!journeyAssets[docHash], "asset already part of another journey");

        journeyAssets[docHash] = true;
        emit JourneyStart(docHash, docType, key, msg.sender);
    }

    function StartOnBehalf(uint8 v, bytes32 r, bytes32 s, bytes32 docHash, uint8 docType, string calldata key, address signer) external
    assetOwned(docHash, signer) 
    knownDocumentType(docType)
    {

        //signature verification
        address owner = ecrecover(getEthSignedMessageHash(onBehalfOfHashStart(docHash, docType, key)), v, r, s);

        require(owner != address(0), "ECDSA: invalid signature");
        require(owner == signer, "signer of message and recovered owner do not match");
        

        require(!journeyAssets[docHash], "asset already part of another journey");

        journeyAssets[docHash] = true;
        emit JourneyStart(docHash, docType, key, owner);

    }
    
    /// @notice Add an asset into an existing customer journey by linking it to an existing asset.
    ///         It will ensure that the asset to be linked is currently owned and not marked for
    ///         ownership transfer.
    function Link(bytes32 parent, bytes32 docHash, uint8 docType, string calldata key) external
    isAllowed
    assetOwned(docHash, msg.sender)
    knownDocumentType(docType)
    {
        require(journeyAssets[parent], "parent document has not started a journey");
        
        journeyAssets[docHash] = true;
        emit AssetLinked(parent, docHash, docType, key);
    }

    function LinkOnBehalf(uint8 v, bytes32 r, bytes32 s, bytes32 parent, bytes32 docHash, uint8 docType, string calldata key, address signer) external
    assetOwned(docHash, signer) 
    knownDocumentType(docType)
    {

        //signature verification
        address owner = ecrecover(getEthSignedMessageHash(onBehalfOfHashLink(parent, docHash, docType, key)), v, r, s);

        require(owner != address(0), "ECDSA: invalid signature");
        require(owner == signer, "signer of message and recovered owner do not match");
        

        require(journeyAssets[parent], "parent document has not started a journey");
        
        journeyAssets[docHash] = true;
        emit AssetLinked(parent, docHash, docType, key);

    }

    /// @notice creates an on behalf of hash that can be signed by 
    ///         the key owner to authorize starting a journey.
    function onBehalfOfHashStart(bytes32 docHash, uint8 docType, string memory key) public view returns (bytes32) {
        return keccak256(abi.encode(address(this), docHash, docType, key));
    }

    /// @notice creates an on behalf of hash that can be signed by 
    //          the key owner to authorize starting a journey.
    function onBehalfOfHashLink(bytes32 parent, bytes32 docHash, uint8 docType, string memory key) public view returns (bytes32) {
        return keccak256(abi.encode(address(this), parent, docHash, docType, key));
    }

    function getEthSignedMessageHash(bytes32 messageHash) public pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash));
    }
    
    /// @notice ensure that the given address is allowed to interact with the contract.
    modifier isAllowed() {
        require(allowed[msg.sender], "not allowed");
        _;
    }
    
    /// @notice ensure that the asset identified by the given hash is
    ///         owned by the given address according to the notary.
    modifier assetOwned(bytes32 docHash, address addr) {
        address owner;
        (owner,) = notary.assets(docHash);
        require(owner == addr, "asset not owned");
        _;
    }

    modifier knownDocumentType(uint8 docTyp) {
        require(bytes(documents[docTyp]).length > 0, "unknown document");
        _;
    }
}
