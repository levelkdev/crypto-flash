const globalArtifacts = this.artifacts

module.exports = async (
  truffleExecCallback,
  {
    artifacts = globalArtifacts
  } = {}
) => {
  try {

    const Account = artifacts.require('Account')
    const PlatformAccount = artifacts.require('PlatformAccount')

    let addr = (await web3.eth.getAccounts())[0]

    const accountWallet = await Account.new(addr)
    await web3.eth.sendTransaction({to: accountWallet.address, from: (await web3.eth.getAccounts())[0], value: 7 * 10 ** 18})
    console.log('Deployed: ')
    console.log(`Account ${accountWallet.address} with ${ 7 * 10 ** 18} ether`)

    const platformAccount = await PlatformAccount.new()
    console.log(`PlatformAccount ${platformAccount.address}`)


  } catch (err) {
    console.log('err: ', err)
  }
}
