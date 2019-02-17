const { getGuardianAccount } = require('./utils/getGuardianAccount')
const { web3 } = require('./utils/getWeb3')

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

app.get('/signCreateAccount', function (req, res) {
  const guardian = getGuardianAddress()
  
  res.send('SIIIGNED')
})

app.listen(port, () => console.log(`Crypto Flash API listening on port ${port}`))
