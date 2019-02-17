const { infuraAPIKey } = require('../secrets.json')

const rpcProviderURL = 'https://rinkeby.infura.io/v3/' + infuraAPIKey

module.exports = {
  rpcProviderURL,
  accountProviderAddress: '0x06865A07d8D42B884E15a7A82db04d429E63d0B1'
}
