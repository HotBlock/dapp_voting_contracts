var Platform = artifacts.require("./Platform.sol");
var Staff = artifacts.require("./Staff.sol");

module.exports = function(deployer) {
	deployer.deploy(Platform);
	deployer.deploy(Staff);
};
