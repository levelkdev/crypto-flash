import Web3 from 'web3';

let web3 = "undefined"
try {
	web3 = new Web3('http://localhost:8545');
} catch(err) {
	web3 = "undefined";
}

export default web3;
