import hre, { ethers } from "hardhat";
import Deployer from "./Deployer";

async function main() {
	const [deployer, account1] = await ethers.getSigners();
	console.log(`Deployer: ${deployer.address}`);

	const usdc = await ethers.getContractAt(
		"MockUSDC",
		"0x9314Bfe3242B33daC1e7D1B9BdC9198B5045556D"
	);

	const daoFactory = await ethers.getContractAt(
		"DAOFactory",
		"0x9B3D341cd79fb5A9Ed85fBD06DC5CAbF48D6f16d"
	);

	const tx = await daoFactory.createDAO(await usdc.getAddress(), "FinTech DAO");
	await tx.wait();

	const daoAddress = await daoFactory.daos(0);

	console.log(`DAO Address: ${daoAddress}`);
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
