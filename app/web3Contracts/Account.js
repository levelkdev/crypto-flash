// import AccountABI from './Account.json'
// import Contract from 'truffle-contract'
// import config from '../../configs/config.js'

// const contract = Contract(AccountABI)

// contract.setProvider(config.rpcProviderURL)

// export default contract

import Web3 from 'web3'
import abi from './Account.abi.json'
import config from '../../configs/config.js'

const web3 = new Web3(
  new Web3.providers.HttpProvider(config.rpcProviderURL)
)

export default function (address) {
  return new web3.eth.Contract(abi, address);
}
