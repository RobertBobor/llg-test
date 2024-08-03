const express = require('express');
const { Web3 } = require('web3');
const router = express.Router();
const web3config = require('../config/config.js');

let web3;
let contract;
let account;

async function initWeb3() {
    try {
        web3 = new Web3(web3config.providerUrl);
        console.log('Web3 initialized successfully');

        // Create account from private key
        account = web3.eth.accounts.privateKeyToAccount(web3config.privateKey);
        web3.eth.accounts.wallet.add(account);
        console.log('Account added:', account.address);

    } catch (error) {
        console.error('Failed to initialize Web3:', error);
    }
}

async function initContract() {
    if (web3) {
        contract = new web3.eth.Contract(web3config.contractABI, web3config.contractAddress);
        console.log('Contract initialized successfully');
    } else {
        console.error('Web3 is not initialized, cannot create contract instance');
    }
}

(async () => {
    await initWeb3();
    await initContract();
})();

function serialize(obj) {
    return JSON.parse(JSON.stringify(obj, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value
    ));
}

// New endpoint for blockchain interaction
router.post('/', async function(req, res) {
    if (!web3 || !contract) {
        return res.status(500).json({ success: false, error: 'Web3 or contract not initialized' });
    }

    try {
        const { method, params, isWrite } = req.body;

        if (isWrite) {
            // For write operations
            const data = contract.methods[method](...params).encodeABI();
            const gasEstimate = await contract.methods[method](...params).estimateGas({ from: account.address });

            const tx = {
                from: account.address,
                to: web3config.contractAddress,
                data: data,
                gas: Math.round(gasEstimate * 1.2), // 20% buffer
                gasPrice: await web3.eth.getGasPrice(),
                nonce: await web3.eth.getTransactionCount(account.address)
            };

            const signedTx = await web3.eth.accounts.signTransaction(tx, account.privateKey);
            const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

            res.json({ success: true, result: serialize(result) });
        } else {
            // For read operations
            const result = await contract.methods[method](...params).call();
            res.json({ success: true, result: serialize(result) });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;