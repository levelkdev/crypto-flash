const { mnemonic } = require('../../secrets.json')
const { web3 } = require('./getWeb3')

function getGuardianAccount() {
  let bip39 = require('bip39');
  let hdkey = require('ethereumjs-wallet/hdkey');
  let hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));
  let wallet_hdpath = "m/44'/60'/0'/0/";
  let wallet = hdwallet.derivePath(wallet_hdpath + 0).getWallet();
  let privateKey = wallet.getPrivateKey().toString("hex")
  let guardian = web3.eth.accounts.privateKeyToAccount("0x" + privateKey)
  return guardian
}

module.exports = {
  getGuardianAccount
}
