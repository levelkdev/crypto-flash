const Web3 = require('web3')
const { infuraAPIKey } = require('../../secrets.json')

const web3 = new Web3('https://rinkeby.infura.io/v3/' + infuraAPIKey)

module.exports = {
  web3
}
