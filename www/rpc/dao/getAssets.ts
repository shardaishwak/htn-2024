import { ethers } from "ethers";
import chainConfig from "../index.json";

export default async function getAssets(daoAddress: string, provider: any) {
	try {
		const daoAbi = chainConfig.contracts.dao.abi;

		const dao = new ethers.Contract(daoAddress, daoAbi, provider);
		const assetsAddresses = await dao.getAssets();

		// for each address we need to get the proposal
		const assets: any[] = [];
		for (let i = 0; i < assetsAddresses.length; i++) {
			const assetValue = await dao.lenders(assetsAddresses[i]);
			const startupTokenContract = new ethers.Contract(
				assetsAddresses[i],
				chainConfig.contracts.startuptoken.abi,
				provider
			);
			const startupTokenDetails = await startupTokenContract.getDetails();
			assets.push({
				address: assetsAddresses[i],
				valueAcquired: assetValue,
				...startupTokenDetails,
			});
		}

		console.log("[DAO]", "Assets", assets);

		return assets;
	} catch (error) {
		console.error("Error getting all assets:", error);
		throw new Error(`Failed to get all assets: ${error.message}`);
	}
}
