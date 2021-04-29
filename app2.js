const Web3 = require('web3')
const EthereumTx = require('ethereumjs-tx').Transaction
const solc = require('solc')


const web3 = new Web3('https://ropsten.infura.io/v3/19beaa22507c40a4b0986bc5eebcf14c')


//Metamask ropsten address
const address1 = "0xA530c8A7c550486Ca6B96219D775A61e0c3F5BdA";
const address1Key = new Buffer.from('848f7e3e0ffbce3c0ed878027d9700b4d1fc3fa099ba8bc6a5667fc5aff13519', 'hex')

const address2 = "0x7A917e1D08329AbeDd29B4b08dd3598EA9a624f2";
const address2Key = new Buffer.from('704107bedff8bb1c53f7957ead59c8e78eca7a7d4d6bc2f2eb25f7fa2d504afa', 'hex')




