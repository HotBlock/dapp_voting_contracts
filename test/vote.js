const Web3 = require('web3');
const Reverter = require('./helpers/reverter');
const Asserts = require('./helpers/asserts');

const Staff = artifacts.require('./Staff.sol');
const Platform = artifacts.require('./Platform.sol');

const providerWeb3 = new Web3.providers.HttpProvider("http://localhost:8545");
const password = "dappvote";

var platformAbi = [{'constant': true, 'inputs': [], 'name': 'platformVoteModificator', 'outputs': [{'name': '', 'type': 'uint256'}], 'payable': false, 'stateMutability': 'view', 'type': 'function'}, {'constant': true, 'inputs': [], 'name': 'platformVoteEnd', 'outputs': [{'name': '', 'type': 'uint256'}], 'payable': false, 'stateMutability': 'view', 'type': 'function'}, {'constant': true, 'inputs': [], 'name': 'platformProposalEnd', 'outputs': [{'name': '', 'type': 'uint256'}], 'payable': false, 'stateMutability': 'view', 'type': 'function'}, {'constant': true, 'inputs': [], 'name': 'platformProposalModificator', 'outputs': [{'name': '', 'type': 'uint256'}], 'payable': false, 'stateMutability': 'view', 'type': 'function'}, {'constant': true, 'inputs': [{'name': '', 'type': 'uint256'}], 'name': 'proposalSenders', 'outputs': [{'name': '', 'type': 'address'}], 'payable': false, 'stateMutability': 'view', 'type': 'function'}, {'inputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'constructor'}, {'constant': false, 'inputs': [{'name': '_address', 'type': 'address'}], 'name': 'setStaffContract', 'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function'}, {'constant': false, 'inputs': [{'name': '_title', 'type': 'string'}, {'name': '_description', 'type': 'string'}, {'name': '_amount', 'type': 'uint256'}], 'name': 'addProposal', 'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function'}, {'constant': false, 'inputs': [{'name': '_address', 'type': 'address'}, {'name': '_vote', 'type': 'bool'}], 'name': 'vote', 'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function'}, {'constant': false, 'inputs': [], 'name': 'depositeMoney', 'outputs': [], 'payable': true, 'stateMutability': 'payable', 'type': 'function'}, {'constant': false, 'inputs': [{'name': '_address', 'type': 'address'}], 'name': 'selectWinner', 'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function'}, {'constant': false, 'inputs': [], 'name': 'openPlatform', 'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function'}, {'constant': false, 'inputs': [{'name': '_time', 'type': 'uint256'}], 'name': 'setVotePeriod', 'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function'}, {'constant': false, 'inputs': [{'name': '_time', 'type': 'uint256'}], 'name': 'setProposalPeriod', 'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function'}, {'constant': true, 'inputs': [], 'name': 'showBalance', 'outputs': [{'name': '', 'type': 'uint256'}], 'payable': false, 'stateMutability': 'view', 'type': 'function'}, {'constant': true, 'inputs': [{'name': '_address', 'type': 'address'}], 'name': 'showProposal', 'outputs': [{'name': '', 'type': 'string'}, {'name': '', 'type': 'string'}, {'name': '', 'type': 'uint256'}, {'name': '', 'type': 'uint256'}, {'name': '', 'type': 'uint8'}], 'payable': false, 'stateMutability': 'view', 'type': 'function'}, {'constant': true, 'inputs': [{'name': '_address', 'type': 'address'}], 'name': 'showProposalStatistic', 'outputs': [{'name': '', 'type': 'uint256'}, {'name': '', 'type': 'uint256'}], 'payable': false, 'stateMutability': 'view', 'type': 'function'}, {'constant': true, 'inputs': [], 'name': 'getPlatformState', 'outputs': [{'name': '', 'type': 'uint8'}], 'payable': false, 'stateMutability': 'view', 'type': 'function'}, {'constant': true, 'inputs': [{'name': '_number', 'type': 'uint256'}], 'name': 'getProposalSender', 'outputs': [{'name': '', 'type': 'address'}], 'payable': false, 'stateMutability': 'view', 'type': 'function'}, {'constant': false, 'inputs': [{'name': '_address', 'type': 'address'}], 'name': 'checkQuorum', 'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function'}, {'constant': false, 'inputs': [], 'name': 'kill', 'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function'}];
var staffAbi = [{'inputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'constructor'}, {'constant': false, 'inputs': [{'name': 'addr', 'type': 'address'}], 'name': 'setPlatform', 'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function'}, {'constant': false, 'inputs': [{'name': 'addr', 'type': 'address'}, {'name': '_token', 'type': 'uint8'}], 'name': 'setStaffBalance', 'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function'}, {'constant': true, 'inputs': [{'name': 'addr', 'type': 'address'}], 'name': 'getStaffBalance', 'outputs': [{'name': '', 'type': 'uint8'}], 'payable': false, 'stateMutability': 'view', 'type': 'function'}, {'constant': false, 'inputs': [{'name': 'addr', 'type': 'address'}, {'name': '_time', 'type': 'uint256'}], 'name': 'setTimeVote', 'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function'}, {'constant': true, 'inputs': [{'name': 'addr', 'type': 'address'}], 'name': 'getTimeVote', 'outputs': [{'name': '', 'type': 'uint256'}], 'payable': false, 'stateMutability': 'view', 'type': 'function'}, {'constant': false, 'inputs': [{'name': 'addr', 'type': 'address'}, {'name': '_time', 'type': 'uint256'}], 'name': 'setTimePropose', 'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function'}, {'constant': true, 'inputs': [{'name': 'addr', 'type': 'address'}], 'name': 'getTimePropose', 'outputs': [{'name': '', 'type': 'uint256'}], 'payable': false, 'stateMutability': 'view', 'type': 'function'}, {'constant': false, 'inputs': [], 'name': 'kill', 'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function'}];
var platformData = "0x60606040526001600860006101000a81548160ff0219169083600181111561002357fe5b0217905550341561003357600080fd5b33600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555062015180600681905550610e106007819055506121c9806100966000396000f300606060405260043610610112576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630c8986e41461011757806312856e6f1461017a578063211602af146101b357806329b3e42a1461025c5780633626a0be146102b05780633771416a146102d95780633f925f7a1461031257806341c0e1b51461031c578063678541b31461033157806367b116301461036a578063740261231461038d5780637726ca78146103b657806380f2f01e146103e557806381b2d07b146103fa5780638ae964b714610423578063bd041c4d1461044c578063c0295bc614610490578063c829c6b9146104b9578063cb3158a3146104dc578063ed763c011461053f575b600080fd5b341561012257600080fd5b6101386004808035906020019091905050610678565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561018557600080fd5b6101b1600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506106bc565b005b34156101be57600080fd5b61025a600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091908035906020019091905050610928565b005b341561026757600080fd5b610293600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610ede565b604051808381526020018281526020019250505060405180910390f35b34156102bb57600080fd5b6102c3611060565b6040518082815260200191505060405180910390f35b34156102e457600080fd5b610310600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050611066565b005b61031a611105565b005b341561032757600080fd5b61032f61120e565b005b341561033c57600080fd5b610368600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506112a5565b005b341561037557600080fd5b61038b6004808035906020019091905050611444565b005b341561039857600080fd5b6103a061153e565b6040518082815260200191505060405180910390f35b34156103c157600080fd5b6103c9611544565b604051808260ff1660ff16815260200191505060405180910390f35b34156103f057600080fd5b6103f8611566565b005b341561040557600080fd5b61040d6116a2565b6040518082815260200191505060405180910390f35b341561042e57600080fd5b6104366116c1565b6040518082815260200191505060405180910390f35b341561045757600080fd5b61048e600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803515159060200190919050506116c7565b005b341561049b57600080fd5b6104a3611c1f565b6040518082815260200191505060405180910390f35b34156104c457600080fd5b6104da6004808035906020019091905050611c25565b005b34156104e757600080fd5b6104fd6004808035906020019091905050611d1f565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561054a57600080fd5b610576600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050611d5e565b6040518080602001806020018681526020018581526020018460ff1660ff168152602001838103835288818151815260200191508051906020019080838360005b838110156105d25780820151818401526020810190506105b7565b50505050905090810190601f1680156105ff5780820380516001836020036101000a031916815260200191505b50838103825287818151815260200191508051906020019080838360005b8381101561063857808201518184015260208101905061061d565b50505050905090810190601f1680156106655780820380516001836020036101000a031916815260200191505b5097505050505050505060405180910390f35b600060028281548110151561068957fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60016000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663dfc9dd50336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b151561078257600080fd5b6102c65a03f1151561079357600080fd5b5050506040518051905060ff161415156107ac57600080fd5b600554600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600501541415156107fe57600080fd5b60018081111561080a57fe5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060060160009054906101000a900460ff16600181111561086557fe5b14151561087157600080fd5b6002600061087f9190612097565b6001600860006101000a81548160ff0219169083600181111561089e57fe5b02179055508073ffffffffffffffffffffffffffffffffffffffff166108fc600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201549081150290604051600060405180830381858888f19350505050151561092557600080fd5b50565b60026000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663dfc9dd50336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b15156109ee57600080fd5b6102c65a03f115156109ff57600080fd5b5050506040518051905060ff16141515610a1857600080fd5b6004546000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166325898c6b336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b1515610adf57600080fd5b6102c65a03f11515610af057600080fd5b50505060405180519050101515610b0657600080fd5b42600454118015610b3c575060006001811115610b1f57fe5b600860009054906101000a900460ff166001811115610b3a57fe5b145b15610eb45760028054806001018281610b5591906120b8565b9160005260206000209001600033909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550506000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c10a2de7336004546040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050600060405180830381600087803b1515610c6957600080fd5b6102c65a03f11515610c7a57600080fd5b50505082600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000019080519060200190610cd39291906120e4565b5081600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001019080519060200190610d2a9291906120e4565b5080600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201819055506000600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600301819055506000600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060040181905550600554600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600501819055506000600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060060160006101000a81548160ff02191690836001811115610eaa57fe5b0217905550610ed9565b6001600860006101000a81548160ff02191690836001811115610ed357fe5b02179055505b505050565b60008060016000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663dfc9dd50336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b1515610fa757600080fd5b6102c65a03f11515610fb857600080fd5b5050506040518051905060ff16141515610fd157600080fd5b600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030154600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206004015491509150915091565b60065481565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156110c257600080fd5b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60016000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663dfc9dd50336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b15156111cb57600080fd5b6102c65a03f115156111dc57600080fd5b5050506040518051905060ff161415156111f557600080fd5b670de0b6b3a7640000341015151561120c57600080fd5b565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561126a57600080fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b600080600554421115156112b857600080fd5b61130e6064600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206003015461202390919063ffffffff16565b9150611365600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600401548361205e90919063ffffffff16565b90506046811015156113da576001600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060060160006101000a81548160ff021916908360018111156113d057fe5b021790555061143f565b6000600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060060160006101000a81548160ff0219169083600181111561143957fe5b02179055505b505050565b60016000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663dfc9dd50336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b151561150a57600080fd5b6102c65a03f1151561151b57600080fd5b5050506040518051905060ff1614151561153457600080fd5b8060068190555050565b60055481565b6000600860009054906101000a900460ff16600181111561156157fe5b905090565b60016000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663dfc9dd50336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b151561162c57600080fd5b6102c65a03f1151561163d57600080fd5b5050506040518051905060ff1614151561165657600080fd5b600260006116649190612097565b6000600860006101000a81548160ff0219169083600181111561168357fe5b0217905550600754420160048190555060065460045401600581905550565b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b60045481565b60026000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663dfc9dd50336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b151561178d57600080fd5b6102c65a03f1151561179e57600080fd5b5050506040518051905060ff161415156117b757600080fd5b600454421115156117c757600080fd5b6005546000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663681631d8336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b151561188e57600080fd5b6102c65a03f1151561189f57600080fd5b505050604051805190501015156118b557600080fd5b8173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515156118f057600080fd5b600554600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206005015414151561194257600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663f01b6851336005546040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050600060405180830381600087803b1515611a0757600080fd5b6102c65a03f11515611a1857600080fd5b505050426005541115611c1157600115158115151415611b6f57611a886001600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206003015461207990919063ffffffff16565b600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030181905550611b246001600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206004015461207990919063ffffffff16565b600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060040181905550611c0c565b611bc56001600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206004015461207990919063ffffffff16565b600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600401819055505b611c1b565b611c1a826112a5565b5b5050565b60075481565b60016000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663dfc9dd50336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b1515611ceb57600080fd5b6102c65a03f11515611cfc57600080fd5b5050506040518051905060ff16141515611d1557600080fd5b8060078190555050565b600281815481101515611d2e57fe5b90600052602060002090016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b611d66612164565b611d6e612164565b6000806000600360008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001600360008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101600360008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020154600360008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060050154600360008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060060160009054906101000a900460ff166001811115611ed857fe5b848054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015611f6d5780601f10611f4257610100808354040283529160200191611f6d565b820191906000526020600020905b815481529060010190602001808311611f5057829003601f168201915b50505050509450838054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156120095780601f10611fde57610100808354040283529160200191612009565b820191906000526020600020905b815481529060010190602001808311611fec57829003601f168201915b505050505093509450945094509450945091939590929450565b60008060008414156120385760009150612057565b828402905082848281151561204957fe5b0414151561205357fe5b8091505b5092915050565b600080828481151561206c57fe5b0490508091505092915050565b600080828401905083811015151561208d57fe5b8091505092915050565b50805460008255906000526020600020908101906120b59190612178565b50565b8154818355818115116120df578183600052602060002091820191016120de9190612178565b5b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061212557805160ff1916838001178555612153565b82800160010185558215612153579182015b82811115612152578251825591602001919060010190612137565b5b5090506121609190612178565b5090565b602060405190810160405280600081525090565b61219a91905b8082111561219657600081600090555060010161217e565b5090565b905600a165627a7a72305820c56f295a0b39784deb0ef208f6ce75b2d249ef52ef1cc3f5f8cc6f4ef92c1f240029";
var staffData = "0x6060604052341561000f57600080fd5b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061083d8061005e6000396000f30060606040526004361061008e576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806312a8c63e1461009357806325898c6b146100d857806341c0e1b514610125578063681631d81461013a5780636945c5ea14610187578063c10a2de7146101c0578063dfc9dd5014610202578063f01b685114610255575b600080fd5b341561009e57600080fd5b6100d6600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803560ff16906020019091905050610297565b005b34156100e357600080fd5b61010f600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506103ea565b6040518082815260200191505060405180910390f35b341561013057600080fd5b610138610436565b005b341561014557600080fd5b610171600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506104cb565b6040518082815260200191505060405180910390f35b341561019257600080fd5b6101be600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610517565b005b34156101cb57600080fd5b610200600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080359060200190919050506105f2565b005b341561020d57600080fd5b610239600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506106d5565b604051808260ff1660ff16815260200191505060405180910390f35b341561026057600080fd5b610295600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061072e565b005b6001600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160009054906101000a900460ff1660ff16148061034457506000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b151561034f57600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415151561038b57600080fd5b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160006101000a81548160ff021916908360ff1602179055505050565b6000600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101549050919050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561049157600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b6000600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001549050919050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561057257600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141515156105ae57600080fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561064e57600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415151561068a57600080fd5b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101819055505050565b6000600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160009054906101000a900460ff169050919050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561078a57600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141515156107c657600080fd5b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000018190555050505600a165627a7a723058204f700e9a1d2c43348d4bcc0353a2c44fe1063262fc4751efa6fdded3d231001e0029";

Staff.setProvider(providerWeb3);

contract('Staff', function(accounts) {
  const reverter = new Reverter(web3);
  afterEach('revert', reverter.revert);

  const asserts = Asserts(assert);
  const OWNER = accounts[0];
  
  const Director = accounts[1];
  
  const Staff1 = accounts[2];
  const Staff2 = accounts[3];
  const Staff3 = accounts[4];
  const Staff4 = accounts[5];
  const Staff5 = accounts[6];
  
  let staff;
  let platform;

  before('setup', () => {
    return Staff.deployed()
    .then(instance => staff = instance)
    .then(reverter.snapshot);
  });

  before('setup', () => {
    return Platform.deployed()
    .then(instance => platform = instance)
    .then(reverter.snapshot);
  });

  const platformAddress = Platform.address;
  const staffAddress = Staff.address;

  it('set address staff and platform', () => {
    return Promise.resolve()    
    .then(() => setAddressesStaffAndPlatform());    
  });

  it('default platform is close status 1', () => {        
    return Promise.resolve()
    .then(() => staff.setPlatform(platformAddress))
    .then(() => platform.setStaffContract(staffAddress))
    .then(() => platform.getPlatformState())
    .then(result => {      
      assert.equal(result.c[0], 1);
    });
  });

  it('open platform, status 0', () => {       
    return Promise.resolve()
    .then(() => setAddressesStaffAndPlatform())
  	.then(() => addDirectorFromOWNER())
  	.then(() => send1EtherToPlatform())  	
  	.then(() => addFiveStaffFromDirector())
    .then(() => openPlatform());
  });

  it('send 1 ether to platform from Director', () => {      
    return Promise.resolve()
    .then(() => setAddressesStaffAndPlatform())
  	.then(() => addDirectorFromOWNER())    
    .then(() => send1EtherToPlatform());
  });
  
  it('add director to platform from OWNER, token 1', () => {
    return Promise.resolve().then(() => addDirectorFromOWNER());    
  });

  it('add five staff to platform from Director, token 2', () => {
    return Promise.resolve()
    .then(() => addDirectorFromOWNER())
    .then(() => addFiveStaffFromDirector());
  });
  
it('add five proposals on platform', () => {
  	return Promise.resolve()
  	.then(() => setAddressesStaffAndPlatform())
  	.then(() => addDirectorFromOWNER())
  	.then(() => send1EtherToPlatform())  	
  	.then(() => addFiveStaffFromDirector())
  	.then(() => openPlatform())
    .then(() => addFiveProposals());
});  	

  it('get address who send proposals on platform', () => {
  	return Promise.resolve()
  	.then(() => setAddressesStaffAndPlatform())
  	.then(() => addDirectorFromOWNER())
  	.then(() => send1EtherToPlatform())  	
  	.then(() => addFiveStaffFromDirector())
  	.then(() => openPlatform())
  	.then(() => addFiveProposals())
    .then(() => platform.getProposalSender(0))   
    .then(result => {
    	assert.equal(result, Staff1);    
    })
    .then(() => platform.getProposalSender(1))   
    .then(result => {
    	assert.equal(result, Staff2);    
    })
    .then(() => platform.getProposalSender(2))   
    .then(result => {
    	assert.equal(result, Staff3);    
    })
    .then(() => platform.getProposalSender(3))   
    .then(result => {
    	assert.equal(result, Staff4);    
    })
    .then(() => platform.getProposalSender(4))   
    .then(result => {
    	assert.equal(result, Staff5);    
    });
  });
  
  it('vote five proposals', () => { 	
  	return Promise.resolve()
  	.then(() => setAddressesStaffAndPlatform())
  	.then(() => addDirectorFromOWNER())
  	.then(() => send1EtherToPlatform())  	
  	.then(() => addFiveStaffFromDirector())
  	.then(() => openPlatform())
  	.then(() => addFiveProposals())
    .then(() => voteFiveProposals());     
  });

  it('select winner and close platform', () => {
  	return Promise.resolve()
  	.then(() => setAddressesStaffAndPlatform())
  	.then(() => addDirectorFromOWNER())
  	.then(() => send1EtherToPlatform())  	
  	.then(() => addFiveStaffFromDirector())
  	.then(() => openPlatform())
  	.then(() => addFiveProposals())
    .then(() => voteFiveProposals())
    .then(() => platform.showProposalStatistic(Staff1, {from: Director}))    
    .then(() => timeSleep(20))
    .then(() => platform.checkQuorum(Staff1))
    .then(() => platform.checkQuorum(Staff2))
    .then(() => platform.checkQuorum(Staff3))
    .then(() => platform.checkQuorum(Staff3))        
    .then(() => platform.selectWinner(Staff2, {from: Director}));
  });

  let addDirectorFromOWNER = function(){
  	return Promise.resolve()
    .then(() => staff.setStaffBalance(Director, 1, {from: OWNER}))
    .then(() => staff.getStaffBalance(Director))
    .then(result => {    	
    	assert.equal(result.c[0], 1);
    });
  }

  let addFiveStaffFromDirector = function(){
  	return Promise.resolve()    
    .then(() => staff.setStaffBalance(Staff1, 2, {from: Director}))
    .then(() => staff.getStaffBalance(Staff1))
    .then(result => {      
      assert.equal(result.c[0], 2);
    })
    .then(() => staff.setStaffBalance(Staff2, 2, {from: Director}))
    .then(() => staff.getStaffBalance(Staff2))
    .then(result => {      
      assert.equal(result.c[0], 2);
    })
    .then(() => staff.setStaffBalance(Staff3, 2, {from: Director}))
    .then(() => staff.getStaffBalance(Staff3))
    .then(result => {      
      assert.equal(result.c[0], 2);
    })
    .then(() => staff.setStaffBalance(Staff4, 2, {from: Director}))
    .then(() => staff.getStaffBalance(Staff4))
    .then(result => {      
      assert.equal(result.c[0], 2);
    })
    .then(() => staff.setStaffBalance(Staff5, 2, {from: Director}))
    .then(() => staff.getStaffBalance(Staff5))
    .then(result => {            
      assert.equal(result.c[0], 2);
    });
  }
  
  let openPlatform = function(){
  	return Promise.resolve()    
    .then(() => platform.setProposalPeriod(20, {from: Director}))
    .then(() => platform.setVotePeriod(15, {from: Director}))
    .then(() => platform.openPlatform({from: Director}))
    .then(() => platform.getPlatformState())
    .then(result => {     
      assert.equal(result.c[0], 0);
    });
  }

  let send1EtherToPlatform = function(){
  	var _value = web3.toWei(1, 'ether'); 

    return Promise.resolve()
    .then(() => platform.showBalance())
    .then(result => {       
      assert.equal(result.toNumber(), 0);
    })
    .then(() => platform.depositeMoney({value: _value, from: Director}))
    .then(() => platform.showBalance())
    .then(result => {
      assert.equal(web3.fromWei(result.toNumber(), 'wei'), _value);
    });
  }

  let setAddressesStaffAndPlatform = function(){
  	return Promise.resolve()
    .then(() => staff.setPlatform(platformAddress))
    .then(() => platform.setStaffContract(staffAddress));
  }

  let addFiveProposals = function(){
  	var title = ["title 1", "title 2", "title 3", "title 4", "title 5"];
  	var description = ["description 1", "description 2", "description 3", "description 4", "description 5"];
  	var amount = [0.1, 0.2, 0.3, 0.4, 0.5];
	var _value = web3.toWei(1, 'ether'); 

  	return Promise.resolve()   
    // 1
    .then(() => platform.addProposal(title[0], description[0], web3.toWei(amount[0], 'ether'), {from: Staff1}))
    .then(() => platform.showProposal(Staff1))
    .then(result => {
    	assert.equal(result[0], title[0]);
    	assert.equal(result[1], description[0]);
    	assert.equal(web3.fromWei(result[2].toNumber(), 'ether'), amount[0]);
   	    assert.equal(result[4].toNumber(), 0);
    })
    // 2
    .then(() => platform.addProposal(title[1], description[1], web3.toWei(amount[1], 'ether'), {from: Staff2}))
    .then(() => platform.showProposal(Staff2))
    .then(result => {    	
    	assert.equal(result[0], title[1]);
    	assert.equal(result[1], description[1]);
    	assert.equal(web3.fromWei(result[2].toNumber(), 'ether'), amount[1]);
   	    assert.equal(result[4].toNumber(), 0);  
    })
    // 3 
    .then(() => platform.addProposal(title[2], description[2], web3.toWei(amount[2], 'ether'), {from: Staff3}))
    .then(() => platform.showProposal(Staff3))
    .then(result => {    	
    	assert.equal(result[0], title[2]);
    	assert.equal(result[1], description[2]);
    	assert.equal(web3.fromWei(result[2].toNumber(), 'ether'), amount[2]);
   	    assert.equal(result[4].toNumber(), 0);  
    })
    // 4
    .then(() => platform.addProposal(title[3], description[3], web3.toWei(amount[3], 'ether'), {from: Staff4}))
    .then(() => platform.showProposal(Staff4))
    .then(result => {    	
    	assert.equal(result[0], title[3]);
    	assert.equal(result[1], description[3]);
    	assert.equal(web3.fromWei(result[2].toNumber(), 'ether'), amount[3]);
   	    assert.equal(result[4].toNumber(), 0);  
    })
    // 5
    .then(() => platform.addProposal(title[4], description[4], web3.toWei(amount[4], 'ether'), {from: Staff5}))
    .then(() => platform.showProposal(Staff5))
    .then(result => {    	
    	assert.equal(result[0], title[4]);
    	assert.equal(result[1], description[4]);
    	assert.equal(web3.fromWei(result[2].toNumber(), 'ether'), amount[4]);
   	    assert.equal(result[4].toNumber(), 0);  
    });
  }

let voteFiveProposals = function(){
	timesleep = 22;
  	return Promise.resolve()
  	.then(() => timeSleep(timesleep))
  	.then(() => platform.vote(Staff1, true, {from: Staff2}))
  	.then(() => platform.vote(Staff2, true, {from: Staff1}))
  	.then(() => platform.vote(Staff2, true, {from: Staff3}))
  	.then(() => platform.vote(Staff3, false, {from: Staff5}))
  	.then(() => platform.vote(Staff2, true, {from: Staff4}));     
}

let timeSleep = function (time) {
  return new Promise((resolve, reject) => {
    web3.currentProvider.sendAsync({
      jsonrpc: "2.0",
      method: "evm_increaseTime",
      params: [time],
      id: new Date().getTime()
    }, (err, result) => {
      if(err){ return reject(err) }
      return resolve(result)
    });
  })
}

});