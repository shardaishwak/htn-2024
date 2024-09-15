import { ethers } from "ethers";
import chainConfig from "../index.json";

export default async function getLenders(daoAddress: string, provider: any) {
	try {
		const daoAbi = chainConfig.contracts.dao.abi;

		const dao = new ethers.Contract(daoAddress, daoAbi, provider);
		const lendersAddresses = await dao.getLenders();

		// for each address we need to get the proposal
		const lenders: any[] = [];
		for (let i = 0; i < lendersAddresses.length; i++) {
			const lenderValue = await dao.lenders(lendersAddresses[i]);
			lenders.push({
				address: lendersAddresses[i],
				value: ethers.formatUnits(lenderValue, 6),
				token: "USDC",
			});
		}

		console.log("[DAO]", "Lenders", lenders);
		return lenders;
	} catch (error) {
		console.error("Error getting all lenders:", error);
		throw new Error(`Failed to get all lenders: ${error.message}`);
	}
}
