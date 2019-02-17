const { getGuardianAccount } = require('./utils/getGuardianAccount')
const { web3 } = require('./utils/getWeb3')
const config = require('../configs/config.js')
const { computeCreate2Address } = require('@netgum/utils')
const platformAccountByteCode = require('./web3Contracts/PlatformAccount.bytecode.js')
const PlatformAccountProvider = require('./web3Contracts/PlatformAccountProvider')
const platformAccountProvider = PlatformAccountProvider(config.accountProviderAddress)
const PlatformAccountProvider2 = require('./web3Contracts/PlatformAccountProvider2')
const platformAccountProvider2 = PlatformAccountProvider.at(config.accountProviderAddress)

const express = require('express')
const app = express()
const port = 3000


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

app.get('/', (req, res) => res.send('Crypto Flash API'))

app.get('/accountForEnsSubdomain', function (req, res) {
  const ensSubdomain = req.query.ensSubdomain
  const salt = web3.utils.soliditySha3(ensSubdomain)
  const computedAddress = computeCreate2Address(
    config.accountProviderAddress,
    salt,
    platformAccountByteCode,
  );
  res.send(computedAddress)
})

// app.get('/signCreateAccount', function (req, res) {
//   const guardian = getGuardianAccount()
//   web3.eth.accounts.wallet.add(guardian)
//   const { ensSubdomain, refundAmount, deviceSignature } = req.query
//   console.log(guardian.address)
//   platformAccountProvider.methods.createAccount(
//     web3.utils.sha3(ensSubdomain),
//     refundAmount,
//     deviceSignature
//   ).send({ from: '0x8b7Ef646874bC10Fee989eE19fC5FE4E50AeD147', gas: 1000000,  gasPrice: 1000000000 }).then((tx) => {
//     console.log(tx)
//     res.send('SIIIGNED')
//   })//.catch((err) => {
//   //   console.error(err)
//   // })
// })


app.get('/signCreateAccount', function (req, res) {
  const guardian = getGuardianAccount()
  web3.eth.accounts.wallet.add(guardian)
  const { ensSubdomain, refundAmount, deviceSignature } = req.query
  console.log(guardian.address)
  platformAccountProvider2.createAccount(
    web3.utils.sha3(ensSubdomain),
    refundAmount,
    deviceSignature,
    { 
      from: '0x8b7Ef646874bC10Fee989eE19fC5FE4E50AeD147', 
      gas: 1000000,  
      gasPrice: 1000000000 
    }
  ).then((tx) => {
    console.log(tx)
    res.send('SIIIGNED')
  })//.catch((err) => {
  //   console.error(err)
  // })
})

app.listen(port, () => console.log(`Crypto Flash API listening on port ${port}`))
