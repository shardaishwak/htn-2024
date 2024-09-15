import { ethers } from "ethers";
import chainConfig from "../index.json";

export default async function getAllProposals(
	daoAddress: string,
	provider: any
) {
	try {
		const daoAbi = chainConfig.contracts.dao.abi;

		const dao = new ethers.Contract(daoAddress, daoAbi, provider);
		const proposalsAddresses = await dao.getAllProposals();

		// for each address we need to get the proposal
		const proposals: any[] = [];
		for (let i = 0; i < proposalsAddresses.length; i++) {
			const proposal = new ethers.Contract(
				proposalsAddresses[i],
				chainConfig.contracts.proposal.abi,
				provider
			);
			const details = await proposal.getDetails();
			proposals.push({
				address: proposalsAddresses[i],
				...details,
			});
		}

		console.log("[DAO]", "Proposals", proposals);

		return proposals;
	} catch (error) {
		console.error("Error getting all proposals:", error);
		throw new Error(`Failed to get all proposals: ${error.message}`);
	}
}
