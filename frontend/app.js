// Import Web3
let web3;
let contract;
const contractAddress = '0x13317a3fd9FFF511ca80d24E983b2F56Da2700E8'; // Replace with your contract address
const abi = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "docId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "encryptedData",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "DocumentStored",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "docCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "documents",
      "outputs": [
        {
          "internalType": "string",
          "name": "encryptedData",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_encryptedData",
          "type": "string"
        }
      ],
      "name": "storeDocument",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_docId",
          "type": "uint256"
        }
      ],
      "name": "retrieveDocument",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ];

async function init() {
    // Check for MetaMask
    if (typeof window.ethereum !== 'undefined') {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        web3 = new Web3(window.ethereum);
        contract = new web3.eth.Contract(abi, contractAddress);
        console.log('Web3 is connected.');
    } else {
        alert('Please install MetaMask!');
    }
}

document.getElementById('documentForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const documentContent = document.getElementById('document').value;

    try {
        // Call the upload function
        const accounts = await web3.eth.getAccounts();
        const result = await contract.methods.storeDocument(documentContent).send({ from: accounts[0] });
        document.getElementById('result').innerText = 'Document uploaded successfully. Transaction: ' + result.transactionHash;
    } catch (error) {
        console.error('Error uploading document:', error);
        document.getElementById('result').innerText = 'Error uploading document: ' + error.message;
    }
});

// Initialize Web3
init();
