const abi =  require('./PlatformAccountProvider.abi.json')
const { web3 } = require('../utils/getWeb3')

module.exports = function(address) {
  return new web3.eth.Contract(abi, address);
}
