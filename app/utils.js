import web3 from './web3'
import Account from './web3Contracts/Account'
// const developmentAddr = '0x0f5Ea0A652E851678Ebf77B69484bFcD31F9459B'
// const developmentKey = '0x2bdd21761a483f71054e14f5b827213567971c676928d9a1808cbfa4b7501200'

async function getCredentials() {
  let privateKey, deviceAddress, ensName, walletAddress, walletContract

  if (localStorage.getItem('key')) {
    privateKey = localStorage.getItem('key')
    deviceAddress = localStorage.getItem('deviceAddress')
  } else {
    let generatedCredentials = await web3.eth.accounts.create(Date.now().toString())
    privateKey = generatedCredentials.privateKey
    deviceAddress = generatedCredentials.address
    localStorage.setItem('key', privateKey)
    localStorage.setItem('deviceAddress', deviceAddress)
  }

  ensName = localStorage.getItem('ensName') || null
  walletAddress = localStorage.getItem('walletAddress')
  if (walletAddress) {
    // walletContract = await Account.at(walletAddress)
    walletContract = Account(walletAddress)
  }

  return {
    privateKey,
    deviceAddress,
    walletAddress,
    walletContract,
    ensName
  }
}

export default getCredentials
