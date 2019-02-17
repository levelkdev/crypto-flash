const { infuraAPIKey } = require('../secrets.json')

const rpcProviderURL = 'https://rinkeby.infura.io/v3/' + infuraAPIKey

module.exports = {
  rpcProviderURL,
  accountProviderAddress: '0xA35d270f0586d99Bda2DD4CB3ED8DBa7051e445E'
}
