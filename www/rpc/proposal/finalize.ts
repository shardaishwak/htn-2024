import { ethers } from "ethers";
import chainConfig from "../index.json";

export default async function finalize(proposalAddress: string, provider: any) {
	try {
		const signer = await provider.getSigner();
		const proposalContract = new ethers.Contract(
			proposalAddress,
			chainConfig.contracts.proposal.abi,
			signer
		);

		const proposalContractSigner = proposalContract.connect(signer);

		const tx = await proposalContractSigner.finalize();
		await tx.wait();

		console.log(
			"[PROPOSAL]",
			"Finalized proposal",
			proposalAddress,
			"tx",
			tx.hash
		);
	} catch (error) {
		console.error("Error voting finalize:", error);
		throw new Error(`Failed to get all finalize: ${error.message}`);
	}
}
