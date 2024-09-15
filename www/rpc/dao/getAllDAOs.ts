import { ethers } from "ethers";
import chainConfig from "../index.json";

export default async function getAllDAOs(provider: any) {
	try {
		const daoFactoryAddress = chainConfig.contracts.daofactory.address;
		const daoFactoryAbi = chainConfig.contracts.daofactory.abi;

		const daoFactory = new ethers.Contract(
			daoFactoryAddress,
			daoFactoryAbi,
			provider
		);

		const daosAddresses = await daoFactory.getDAOs();

		const daos: any[] = [];
		for (let i = 0; i < daosAddresses.length; i++) {
			const dao = new ethers.Contract(
				daosAddresses[i],
				chainConfig.contracts.dao.abi,
				provider
			);
			const details = await dao.getDetails();
			daos.push({
				address: daosAddresses[i],
				usdcToken: details[0],
				daoCreator: details[1],
				description: details[2],
				totalUSDCIn: details[3],
				totalTokensOut: details[4],
				name: details[5],
				symbol: details[6],
				lendersCount: details[7],
				assetsCount: details[8],
				proposalCount: details[9],
			});
		}

		console.log("[DAO]", "DAOs", daos);

		return daos;
	} catch (error) {
		console.error("Error getting all daos:", error);
		throw new Error(`Failed to get all daos: ${error.message}`);
	}
}
