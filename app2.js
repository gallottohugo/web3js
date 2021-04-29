// SPDX-License-Identifier: MIT
//Deploy Smart Contract with Web3 and Ethereumjs-tx

const Web3 = require('web3')
const EthereumTx = require('ethereumjs-tx').Transaction
const solc = require('solc')
const fs = require("fs")


const web3 = new Web3('https://ropsten.infura.io/v3/19beaa22507c40a4b0986bc5eebcf14c')


//Metamask ropsten address
const address1 = "0xA530c8A7c550486Ca6B96219D775A61e0c3F5BdA";
const address1Key = new Buffer.from('848f7e3e0ffbce3c0ed878027d9700b4d1fc3fa099ba8bc6a5667fc5aff13519', 'hex')


const content = fs.readFileSync("vehicles.sol").toString()
var objectSolc = {
	language: 'Solidity',
	sources: {
		'vehicles': {
			content: content
		}
	},
	settings: {
		outputSelection: {
			'*': {
				'*': ['*']
			}
		}
	}
}

const ouput = JSON.parse(solc.compile(JSON.stringify(objectSolc)))


const bytecodeContract = ouput.contracts.vehicles.Vehicles.evm.bytecode.object


web3.eth.getTransactionCount(address1, (err, _txCount) => {
	
	let trxObject = {
		nonce: web3.utils.toHex(_txCount) ,
		gasPrice: web3.utils.toHex(web3.utils.toWei('2', "gwei")),
		gasLimit: web3.utils.toHex(1000000),
		to: null,
		data: '0x' + bytecodeContract
	}

	let tx = new EthereumTx(trxObject, { chain:'ropsten', hardfork: 'petersburg' })
	tx.sign(address1Key);

	const serializedTx = tx.serialize().toString('hex');
	web3.eth.sendSignedTransaction('0x' + serializedTx).on('receipt', receipt => {
		console.log('Upload contract: ' + receipt.contractAddress)
	});
})