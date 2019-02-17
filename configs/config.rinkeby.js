const { infuraAPIKey } = require('../secrets.json')

const rpcProviderURL = 'https://rinkeby.infura.io/v3/' + infuraAPIKey

module.exports = {
  rpcProviderURL
}
