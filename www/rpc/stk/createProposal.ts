import { ethers } from "ethers";
import chainConfig from "../index.json";

export default async function createProposal(
	startupTokenAddress: string,
	description: string,
	requestedAmount: number,
	tokensOffered: number,
	fundingAddress: string,
	daoAddress: string,
	provider: any
) {
	try {
		const signer = await provider.getSigner();
		const startupTokenAbi = chainConfig.contracts.startuptoken.abi;

		const startupToken = new ethers.Contract(
			startupTokenAddress,
			startupTokenAbi,
			provider
		);

		const startupTokenSigner = startupToken.connect(signer);
		const requestAmountUSDC = ethers.parseUnits(requestedAmount.toString(), 6);
		const tx = await startupTokenSigner.createProposal(
			description,
			requestAmountUSDC,
			tokensOffered,
			fundingAddress,
			daoAddress
		);
		await tx.wait();

		console.log("[STK]", "Created proposal", tx.hash);
	} catch (error) {
		console.error("Error getting all startups:", error);
		throw new Error(`Failed to get all startups: ${error.message}`);
	}
}
