// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DocumentStorage {
    struct Document {
        string encryptedData; // Encrypted document data
        address owner; // Owner of the document
    }
    
    mapping(uint256 => Document) public documents;
    uint256 public docCount;

    event DocumentStored(uint256 indexed docId, string encryptedData, address owner);

    function storeDocument(string memory _encryptedData) public {
        documents[docCount] = Document(_encryptedData, msg.sender);
        emit DocumentStored(docCount, _encryptedData, msg.sender);
        docCount++;
    }

    function retrieveDocument(uint256 _docId) public view returns (string memory, address) {
        Document memory doc = documents[_docId];
        return (doc.encryptedData, doc.owner);
    }
}
