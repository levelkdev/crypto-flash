const { infuraAPIKey } = require('../secrets.json')

const rpcProviderURL = 'https://rinkeby.infura.io/v3/' + infuraAPIKey

module.exports = {
  rpcProviderURL,
  accountProviderAddress: '0x07fE5F68D2b9a9E478B10012a8D283Fa0e0F7A39'
}
