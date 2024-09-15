import { ethers } from "hardhat";

const daoFactoryAddress = "0x";
const description = "0x";
const usdcAddress = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";

async function main() {
	const [deployer, account1] = await ethers.getSigners();
	console.log(`Deployer: ${deployer.address}`);

	const daoFactory = await ethers.getContractAt(
		"DAOFactory",
		daoFactoryAddress
	);

	await daoFactory.createDAO(usdcAddress, description);

	const daoAddress = await daoFactory.daos(0);

	console.log(`Deployed DAO Address: ${daoAddress}`);
}
9;

main()
	.then(() => {
		process.exit(0);
	})
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
