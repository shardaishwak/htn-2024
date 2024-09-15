import { ethers } from "ethers";
import chainConfig from "../index.json";

export default async function getUSDCBalance(provider) {
	try {
		const signer = await provider.getSigner();
		const address = await signer.getAddress();

		const usdcAddress = chainConfig.contracts.usdc.address;
		const usdcAbi = chainConfig.contracts.usdc.abi;
		const usdc = new ethers.Contract(usdcAddress, usdcAbi, provider);
		console.log(address);

		const balance = await usdc.balanceOf(address);

		console.log("[Wallet]", "USDC balance", balance.toString());

		return balance;
	} catch (error) {
		console.error("Error getting address:", error);
		throw new Error(`Failed to get address: ${error.message}`);
	}
}
