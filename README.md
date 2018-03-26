# DApp_Voting contracts repo

This repository contains example of decentralized voting application and deploying scripts to local network

* [Contracts review]()
* [Additional script]() for [dapp frontend]()

Requirements: 

* [**truffle**](http://truffleframework.com/)
* ethereum local test network (test-rpc or ganache)

## Setup
Just clone this repo
```bash
git clone http://this.repo.com
cd dapp_voting_contracts
```
change `host` and `port` in `truffle.js` if you need, `localhost:7545` set as default

then compile and deploy contracts
```bash
truffle compile
truffle migrate 
```

## Testing
You can run the tests by executing the command
```bash
truffle test
```
