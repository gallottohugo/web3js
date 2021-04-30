// SPDX-License-Identifier: MIT
// Create Ethereum wallet with web3

const Web3 = require('web3');
const web3 = new Web3()



const entropy = web3.utils.sha3(Math.random(0, 1000000).toString(16) + web3.utils.randomHex(32))
console.log(" ")
console.log('Random text: ' + entropy);
console.log(" ")
const wallet = web3.eth.accounts.create([entropy]);
console.log("Wallet")
console.log(wallet)
console.log(" ")

const privateKeyEncrypted = web3.eth.accounts.encrypt(wallet.privateKey, "MyPassword");
console.log("PrivateKey encrypted")
console.log(privateKeyEncrypted)
console.log(" ")


const privateKey = web3.eth.accounts.decrypt(privateKeyEncrypted, "MyPassword");
console.log("privateKey decrypted")
console.log(privateKey)

