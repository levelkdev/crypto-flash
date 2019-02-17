const { web3 } = require('../utils/getWeb3')
const platformAccountProviderJSON = require('./PlatformAccountProvider.json')
const config = require('../../configs/config.js')

module.exports = function (address) {
  return new web3.eth.Contract(platformAccountProviderJSON.abi, address);
}
