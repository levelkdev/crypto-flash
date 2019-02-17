const globalArtifacts = this.artifacts

const {
  getEnsNameHash,
  getEnsLabelHash
} = require('@netgum/utils');

module.exports = async (
  truffleExecCallback,
  {
    artifacts = globalArtifacts
  } = {}
) => {
  try {
    const accounts = await web3.eth.getAccounts()

    const Account = artifacts.require('Account')
    const PlatformAccount = artifacts.require('PlatformAccount')
    const ENSRegistry = artifacts.require('ENSRegistry');
    const PlatformAccountProvider = artifacts.require('PlatformAccountProvider');

    let addr = accounts[0]

    const accountWallet = await Account.new(addr)
    await web3.eth.sendTransaction({to: accountWallet.address, from: accounts[0], value: 7 * 10 ** 18})
    console.log('Deployed: ')
    console.log(`Account ${accountWallet.address} with ${ 7 * 10 ** 18} ether`)

    const platformAccount = await PlatformAccount.new()
    console.log(`PlatformAccount ${platformAccount.address}`)

    // Deploy account provider

    ens = await ENSRegistry.new();
    console.log(`ENSRegistry ${ens.address}`)
    const DEVICES = {
      guardian: accounts[0],
      accountProxy: accounts[8]
    };

    platformAccountProvider = await PlatformAccountProvider.new(
      ens.address,
      getEnsNameHash('test'),
      DEVICES.guardian,
      DEVICES.accountProxy,
      PlatformAccount.binary,
    );
    console.log(`PlatformAccountProvider ${platformAccountProvider.address}`)
    console.log(`guardian: ${DEVICES.guardian}`)

    await ens.setSubnodeOwner('0x00', getEnsLabelHash('test'), platformAccountProvider.address);

  } catch (err) {
    console.log('err: ', err)
  }
}
