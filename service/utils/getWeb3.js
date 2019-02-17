const Web3 = require('web3')
const config = require('../../configs/config')

const web3 = new Web3(config.rpcProviderURL)

module.exports = {
  web3
}
