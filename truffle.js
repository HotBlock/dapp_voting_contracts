// const Web3 = require('web3');
// const lightwallet = require('./eth-lightwallet');

// console.log(Web3);

// var provider = new Web3.providers.HttpProvider("http://localhost:8545");


module.exports = {
	networks: {
		development: {
			host: "127.0.0.1",
			port: 7545,
			network_id: "*" // Match any network id
		}
	}
};
