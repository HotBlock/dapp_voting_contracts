var Platform = artifacts.require("./Platform.sol");
var Staff = artifacts.require("./Staff.sol");

module.exports = function (deployer) {
	let P = Platform.deployed();
	let S = Staff.deployed();

	P.then(a => {
		let Paddr = a.address;
		S.then(s => s.setPlatform(Paddr))
	});

	S.then(a => {
		let Saddr = a.address;
		P.then(s => s.setStaffContract(Saddr))
	});
};
