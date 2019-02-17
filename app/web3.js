import Web3 from 'web3';
import config from '../configs/config.js'

let web3 = "undefined"
try {
	web3 = new Web3(config.rpcProviderURL);
} catch(err) {
	web3 = "undefined";
}

export default web3;
