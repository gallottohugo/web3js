// SPDX-License-Identifier: MIT
//Send signed transaction with Web3 and Ethereumjs-tx

const Web3 = require('web3')
const EthereumTx = require('ethereumjs-tx').Transaction

const web3 = new Web3("https://ropsten.infura.io/v3/19beaa22507c40a4b0986bc5eebcf14c")

//Metamask ropsten address
const address1 = "0xA530c8A7c550486Ca6B96219D775A61e0c3F5BdA";
const address2 = "0x7A917e1D08329AbeDd29B4b08dd3598EA9a624f2";

const address1Key = new Buffer.from('848f7e3e0ffbce3c0ed878027d9700b4d1fc3fa099ba8bc6a5667fc5aff13519', 'hex')
const address2Key = new Buffer.from('704107bedff8bb1c53f7957ead59c8e78eca7a7d4d6bc2f2eb25f7fa2d504afa', 'hex')


//balance address 1
//web3.eth.getBalance(address1, (err, _balance) => {
//	console.log("Balance address1: " + web3.utils.fromWei(_balance, "ether"))
//})


//balance address 2
//web3.eth.getBalance(address2, (err, _balance) => {
//	console.log("Balance address2: " + web3.utils.fromWei(_balance, "ether"))
//})


//get address trx count & send signed trx 
web3.eth.getTransactionCount(address2, (err, _txCount) => {

	// trx object
	let rawTx = {
		nonce: web3.utils.toHex(_txCount) ,
		gasPrice: web3.utils.toHex(web3.utils.toWei('2', "gwei")),
		gasLimit: web3.utils.toHex(21000),
		to: address1,
		value: Web3.utils.toHex(web3.utils.toWei("0.1", "ether")),
		//data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057'
	}

	let tx = new EthereumTx(rawTx, {chain:'ropsten', hardfork: 'petersburg'});
	
	tx.sign(address2Key);

	const serializedTx = tx.serialize().toString('hex');

	console.log(" ")
	console.log("serialized trx")
	console.log(serializedTx);

	web3.eth.sendSignedTransaction('0x' + serializedTx).on('receipt', console.log);
})

