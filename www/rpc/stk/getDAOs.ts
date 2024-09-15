// get all the daos throught he getDaos() -> daoAddress and totalFundingReceived;
import { ethers } from "ethers";
import chainConfig from "../index.json";

export default async function getDAOs(
	startupTokenAddress: string,
	provider: any
) {
	try {
		const startupTokenAbi = chainConfig.contracts.startuptoken.abi;

		const startupTokenContract = new ethers.Contract(
			startupTokenAddress,
			startupTokenAbi,
			provider
		);
		const daos = await startupTokenContract.getDaos();

		// for each address we need to get the proposal
		const daosList: any[] = [];
		for (let i = 0; i < daos.length; i++) {
			const dao = new ethers.Contract(
				daos[i].daoAddress,
				chainConfig.contracts.dao.abi,
				provider
			);
			const details = await dao.getDetails();
			daosList.push({
				address: daos[i].daoAddress,
				totalFundingReceived: daos[i].totalFundingReceived,
				symbol: details[6],
			});
		}

		console.log("[STK]", "DAOs", daosList);

		return daosList;
	} catch (error) {
		console.error("Error getting all daos for STK:", error);
		throw new Error(`Failed to get all daos for STK: ${error.message}`);
	}
}
