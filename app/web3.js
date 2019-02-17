import Web3 from 'web3';

let web3 = "undefined"
try {
	web3 = new Web3(window.web3.currentProvider);
} catch(err) {
	web3 = "undefined";
}
console.log('web3!!!! ', web3)
export default web3;
