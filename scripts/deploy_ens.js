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

    const PlatformAccount = artifacts.require('PlatformAccount')
    const ENSRegistry = artifacts.require('ENSRegistry');
    const PlatformAccountProvider = artifacts.require('PlatformAccountProvider');

    // Deploy account provider

    ens = await ENSRegistry.new();
    console.log(`ENSRegistry ${ens.address}`)
    const DEVICES = {
      guardian: accounts[0],
      accountProxy: accounts[0]
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
