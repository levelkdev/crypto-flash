import AccountABI from './Account.json'
import Contract from 'truffle-contract'
import config from '../../configs/config.js'

const contract = Contract(AccountABI)

contract.setProvider(config.rpcProviderURL)

export default contract
