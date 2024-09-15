import hre, { ethers } from "hardhat";
import Deployer from "./Deployer";

async function main() {
	const [deployer, account1] = await ethers.getSigners();
	console.log(`Deployer: ${deployer.address}`);

	const myAddress = "0x7060e9C8b18568c2831Ada51C934fA8E0e2E1Dc7";

	const usdc = await ethers.getContractAt(
		"MockUSDC",
		"0x948169dD9bF9e080E631F262894E54b6D1647F85"
	);
	const usdcBalance = await usdc.balanceOf(myAddress);

	console.log(`USDC Balance: ${ethers.formatUnits(usdcBalance, 6)}`);

	// add funds
	const usdcAmount = ethers.parseUnits("10000", 6);
	await usdc.transfer(myAddress, usdcAmount);

	const usdcBalanceAfter = await usdc.balanceOf(myAddress);
	console.log(`USDC Balance After: ${ethers.formatUnits(usdcBalanceAfter, 6)}`);
}

main()
	.then(() => {
		process.exit(0);
	})
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
