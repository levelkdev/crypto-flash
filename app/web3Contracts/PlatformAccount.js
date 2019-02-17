const abi =  require('./PlatformAccount.abi.json')
import web3 from '../web3'

export default function(address) {
  return new web3.eth.Contract(abi, address);
}
