// import AccountABI from './Account.json'
// import Contract from 'truffle-contract'
// import config from '../../configs/config.js'

// const contract = Contract(AccountABI)

// contract.setProvider(config.rpcProviderURL)

// export default contract

import Web3 from 'web3'
import abi from './Account.abi.json'

const web3 = new Web3(
  new Web3.providers.HttpProvider('http://localhost:8545')
)

export default function (address) {
  return new web3.eth.Contract(abi, address);
}
