# DApp_Voting contracts repo

This repository contains example contracts of decentralized voting application

## Case
Task - create voting platform with Staff and Moderator roles

#### Staff features:

* Can send one proposal per cycle, it contains:
	* Title
	* Description
	* ETH request _(maximum 0.5 ETH)_
* proposal can be sended only if requsted ETH is lower than platform ETH
* may vote once per cycle for any proposal or against it _(except for his proposal)_

#### Moderator features:

* Can deposite money to platform _(minumum 1 ETH)_
* Can change time for voting and adding proposals
* Can see proposals statistics
* Can choose a winning proposal, once per cycle _(platform will send requested ETH to sender address)_
	* it's quorum must be greater than 70%
* Can 'open platform' _(create new cycle)_


**Structure**: 

* **Platform.sol** - contract for managing voting and proposals
* **Staff.sol** - contract for managing user accounts
* **SafeMath.sol** - SafeMath library

## Functions description
### Staff functions

#### `setPlatform(address addr)`
linking with platform contract

#### `setStaffBalance(address addr, uint8 _token)`
change user role: 1 - moderator, 2 - staff, other - fired

#### `getStaffBalance(address addr)`
get user role value by

#### `setTimeVote (address addr, uint _time)` , _(external)_
change time of user last vote

#### `getTimeVote(address addr)` , _(external)_
get time of user last vote

#### `setTimePropose(address addr, uint _time)` , _(external)_
change time of user last propose

#### `getTimePropose(address addr)` , _(external)_
get time of user last propose

#### `kill()`
remove contract


### Platform functions

#### `setStaffContract(address _address)`
linking Staff contact

#### `addProposal(string _title, string _description, uint _amount)`
add proposal to platform

#### `vote(address _address, bool _vote)`
vote for or against proposal

#### `depositeMoney()`
deposite money to platform

#### `selectWinner(address _address)`
select winning proposal

#### `openPlatform()`
create new platform cycle

#### `setVotePeriod(uint _time)`
change time for voting

#### `setProposalPeriod(uint _time)`
change time for adding proposal

#### `showBalance()`
show platform balance

#### `showProposal(address _address)`
show proposal:

* title
* description
* ETH requested
* time until this proposal is valid
* proposal state _(voting state or quorum accepted)_

#### `showProposalStatistic(address _address)`
show proposal :

* votes for
* total votes

#### `getPlatformState()`
show current platform state _(opened, closed)_

#### `checkQuorum(address _address)`
check if proposal quorum achieved and change it's state

#### `kill()`
delete contract
