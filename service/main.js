const { getGuardianAccount } = require('./utils/getGuardianAccount')
const { web3 } = require('./utils/getWeb3')
const { config } = require('../configs/config.js')
const { computeCreate2Address } = require('@netgum/utils')
const platformAccountByteCode = require('./web3Contracts/PlatformAccount.bytecode.js')

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

app.get('/signCreateAccount', function (req, res) {
  const guardian = getGuardianAccount()
  
  res.send('SIIIGNED')
})

app.listen(port, () => console.log(`Crypto Flash API listening on port ${port}`))
