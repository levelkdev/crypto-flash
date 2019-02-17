import web3 from './web3'
import Account from './web3Contracts/Account'
// const developmentAddr = '0x0f5Ea0A652E851678Ebf77B69484bFcD31F9459B'
// const developmentKey = '0x2bdd21761a483f71054e14f5b827213567971c676928d9a1808cbfa4b7501200'

async function getCredentials() {
  let privateKey, address

  if (localStorage.getItem('key')) {
    privateKey = localStorage.getItem('key')
    address =localStorage.getItem('walletAddress')
  } else {
    let generatedCredentials = await web3.eth.accounts.create(Date.now().toString())
    privateKey = generatedCredentials.privateKey
    address =generatedCredentials.address
  }

  let walletContract = await Account(address)

  return { privateKey, walletContract }
}

export default getCredentials
