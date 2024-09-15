import { ethers } from "ethers";
import chainConfig from "../index.json";

export default async function createStartupToken(
	initialSupply: number = 100000,
	provider: any
) {
	try {
		const signer = await provider.getSigner();
		const address = await signer.getAddress();

		const startupTokenFactoryAddress =
			chainConfig.contracts.startuptokenfactory.address;
		const startupTokenFactoryAbi =
			chainConfig.contracts.startuptokenfactory.abi;

		const startupTokenFactory = new ethers.Contract(
			startupTokenFactoryAddress,
			startupTokenFactoryAbi,
			provider
		);

		const startupTokenFactorySigner = startupTokenFactory.connect(signer);

		const tx = await startupTokenFactorySigner.createStartupToken(
			initialSupply,
			address
		);
		await tx.wait();

		console.log("[STK]", "Created startup token", tx.hash);
	} catch (error) {
		console.error("Error creating startup token:", error);
		throw new Error(`Failed to create startup token: ${error.message}`);
	}
}
