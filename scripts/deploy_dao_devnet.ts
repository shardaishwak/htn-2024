import { ethers } from "hardhat";

const daoFactoryAddress = "0x200D4f7AA401C681CC5cc3BBCAB249bccf620c3e";
const description = "FinTech DAO.";
const usdcAddress = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";

async function main() {
	const [deployer] = await ethers.getSigners();
	console.log(`Deployer: ${deployer.address}`);

	const daoFactory = await ethers.getContractAt(
		"DAOFactory",
		daoFactoryAddress
	);

	const tx = await daoFactory.createDAO(usdcAddress, description);
	await tx.wait();

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
