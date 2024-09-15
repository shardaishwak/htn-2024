import { ethers } from "ethers";
import chainConfig from "../index.json";

export default async function getStartupTokens(provider: any) {
	try {
		const stkAddress = chainConfig.contracts.startuptokenfactory.address;
		const stkAbi = chainConfig.contracts.startuptokenfactory.abi;

		const stk = new ethers.Contract(stkAddress, stkAbi, provider);
		const stkAddresses = await stk.getStartupTokens();

		console.log("[STK]", "Startup Token Addresses", stkAddresses);

		const startups: any[] = [];
		for (let i = 0; i < stkAddresses.length; i++) {
			const startup = new ethers.Contract(
				stkAddresses[i],
				chainConfig.contracts.startuptoken.abi,
				provider
			);
			const details = await startup.getDetails();
			startups.push({
				address: stkAddresses[i],
				name: details[0],
				symbol: details[1],
				totalSupply: details[2],
				maximumSupply: details[3],
				proposalCount: details[4],
				owner: details[5],
			});
		}

		console.log("[STK]", "Startups", startups);

		return startups;
	} catch (error) {
		console.error("Error getting all startups:", error);
		throw new Error(`Failed to get all startups: ${error.message}`);
	}
}
