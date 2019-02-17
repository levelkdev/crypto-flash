const { getGuardianAccount } = require('./utils/getGuardianAccount')
const { web3 } = require('./utils/getWeb3')
const config = require('../configs/config.js')
const { computeCreate2Address, getEnsLabelHash, sha3 } = require('@netgum/utils')
const platformAccountByteCode = require('../build/contracts/PlatformAccount.json').bytecode
const PlatformAccountProvider = require('./web3Contracts/PlatformAccountProvider')
const PlatformAccount = require('./web3Contracts/PlatformAccount')


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

app.get('/accountForDevice', function (req, res) {
  const device = req.query.device
  const salt = web3.utils.sha3(device)
  const computedAddress = computeCreate2Address(
    config.accountProviderAddress,
    salt,
    platformAccountByteCode,
  );
  console.log("computed address: " + computedAddress)
  res.send(computedAddress)
})

app.get('/signCreateAccount', function (req, res) {
  const guardian = getGuardianAccount()
  web3.eth.accounts.wallet.add(guardian)
  const { ensSubdomain, refundAmount, deviceSignature } = req.query
  let instance
  PlatformAccountProvider.at(config.accountProviderAddress).then((_instance) => {
    instance = _instance
    return instance.createAccount.estimateGas(
      getEnsLabelHash(ensSubdomain),
      refundAmount,
      deviceSignature,
      { 
        from: guardian.address, 
        gasPrice: 10000000000 
      }
    )
  }).then((estimateGas) => {
    return instance.createAccount(
      getEnsLabelHash(ensSubdomain),
      refundAmount,
      deviceSignature,
      { 
        from: guardian.address,
        gas: estimateGas,
        gasPrice: 10000000000 
      }
    )
  }).then((tx) => {
    console.log('TX: ', tx)
    console.log("actual address: " + tx.logs[0].args.accountAddress)
    res.send('SIIIGNED')
  }).catch((err) => {
    console.error(err)
    res.err(err)
  })
})

app.get('/sendFunds', function (req, res) {
  const { account, to , value } = req.query
  const guardian = getGuardianAccount()

  let instance
  PlatformAccount.at(account).then((_instance) => {
    instance = _instance
    return instance.executeTransaction.estimateGas(
      to,
      value,
      web3.utils.utf8ToHex(''),
      { 
        from: guardian.address,
        gasPrice: 10000000000 
      }
    )
  }).then((estimateGas) => {
    return instance.executeTransaction(
      to,
      value,
      web3.utils.utf8ToHex(''),
      { 
        from: guardian.address,
        gas: estimateGas,
        gasPrice: 10000000000 
      }
    )
  }).then((tx) => {
    res.send('Sent: ' + value + ' wei')
  })
})

app.listen(port, () => console.log(`Crypto Flash API listening on port ${port}`))
