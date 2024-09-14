import hre, { ethers } from "hardhat";
import Deployer from "./Deployer";

async function main() {
	const [deployer, account1] = await ethers.getSigners();
	console.log(`Deployer: ${deployer.address}`);

	const myAddress = "0x18A47bA4400094B155E8C6a8F31d8113Ffa236F1";

	const usdc = await ethers.getContractAt(
		"MockUSDC",
		"0x948169dD9bF9e080E631F262894E54b6D1647F85"
	);
	const daoFactoryAddress = "0x6fC8404a68eff59df1eab9a26Cb1228643778579";

	const daoFactory = await ethers.getContractAt(
		"DAOFactory",
		daoFactoryAddress
	);

	await daoFactory.createDAO(await usdc.getAddress());

	const daoAddress = await daoFactory.daos(0);

	console.log(`DAO Address: ${daoAddress}`);
}

main()
	.then(() => {
		process.exit(0);
	})
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
