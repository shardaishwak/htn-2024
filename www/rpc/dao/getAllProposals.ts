import { ethers } from "ethers";
import chainConfig from "../index.json";

export default async function getAllProposals(
	daoAddress: string,
	provider: any
) {
	try {
		const abi = chainConfig.contracts.dao.abi;

		const dao = new ethers.Contract(daoAddress, abi, provider);
		const proposals = await dao.getAllProposals();

		console.log(proposals);
	} catch (error) {
		console.error("Error getting all proposals:", error);
		throw new Error(`Failed to get all proposals: ${error.message}`);
	}
}
