const { infuraAPIKey } = require('../secrets.json')

const rpcProviderURL = 'https://rinkeby.infura.io/v3/' + infuraAPIKey

module.exports = {
  rpcProviderURL,
  accountProviderAddress: '0xb6B114959f8380A520dd158C9158728664081c35'
}
