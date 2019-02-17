const platformAccountProviderJSON =  require('../../build/contracts/PlatformAccountProvider.json')
const Contract = require('truffle-contract')
const config = require('../../configs/config.js')
const { web3 } = require('../utils/getWeb3')

const contract = Contract(platformAccountProviderJSON)
console.log(config.rpcProviderURL)
contract.setProvider(config.rpcProviderURL)

module.exports = contract
