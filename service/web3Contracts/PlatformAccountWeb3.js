const { web3 } = require('../utils/getWeb3')
const platformAccountJSON = require('../../build/contracts/PlatformAccount.json')
const config = require('../../configs/config.js')

module.exports = function (address) {
  return new web3.eth.Contract(platformAccountJSON.abi, address);
}
