const { getGuardianAccount } = require('./utils/getGuardianAccount')
const { web3 } = require('./utils/getWeb3')
const config = require('../configs/config.js')
const { computeCreate2Address, getEnsLabelHash, sha3 } = require('@netgum/utils')
const platformAccountByteCode = require('../build/contracts/PlatformAccount.json').bytecode
const PlatformAccountProvider = require('./web3Contracts/PlatformAccountProvider')
const PlatformAccount = require('./web3Contracts/PlatformAccount')
const PlatformAccountProviderW3 = require('./web3Contracts/PlatformAccountProviderWeb3')
const PlatformAccountW3 = require('./web3Contracts/PlatformAccountWeb3')


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
  const platformAccountProviderW3 = PlatformAccountProviderW3(config.accountProviderAddress)
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
    const txData = platformAccountProviderW3.methods.createAccount(
      getEnsLabelHash(ensSubdomain),
      refundAmount,
      deviceSignature
    ).encodeABI()
    
    return web3.eth.accounts.signTransaction({
      from: guardian.address,
      to: config.accountProviderAddress,
      gas: estimateGas,
      gasPrice: 10000000000,
      data: txData
    }, '0x0c6ee92fc2d221265004e1692607fd7db5f132836ec0c84a7313ceae6306f546')
    
    // return instance.createAccount(
    //   getEnsLabelHash(ensSubdomain),
    //   refundAmount,
    //   deviceSignature,
    //   { 
    //     from: guardian.address,
    //     gas: estimateGas,
    //     gasPrice: 10000000000 
    //   }
    // )
  }).then((tx) => {
    return web3.eth.sendSignedTransaction(tx.rawTransaction)
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
  console.log('sendFunds requested: ' + account + ', ' + to + ', ' + value )
  const guardian = getGuardianAccount()
  const platformAccountW3 = PlatformAccountW3(account)

  let instance
  PlatformAccount.at(account).then((_instance) => {
    console.log('PlatformAccount instance')
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
    const txData = platformAccountW3.methods.executeTransaction(
      to,
      value,
      web3.utils.utf8ToHex(''),
    ).encodeABI()

    return web3.eth.accounts.signTransaction({
      from: guardian.address,
      to: account,
      gas: estimateGas,
      gasPrice: 10000000000,
      data: txData
    }, '0x0c6ee92fc2d221265004e1692607fd7db5f132836ec0c84a7313ceae6306f546')

    // return instance.executeTransaction(
    //   to,
    //   value,
    //   web3.utils.utf8ToHex(''),
    //   { 
    //     from: guardian.address,
    //     gas: estimateGas,
    //     gasPrice: 10000000000 
    //   }
    // )
  }).then((tx) => {
    return web3.eth.sendSignedTransaction(tx.rawTransaction)
  }).then((tx) => {
    res.send('Sent: ' + value + ' wei')
  })
})

app.listen(port, () => console.log(`Crypto Flash API listening on port ${port}`))
