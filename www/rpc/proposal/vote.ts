import { ethers } from "ethers";
import chainConfig from "../index.json";

export default async function vote(
	proposalAddress: string,
	value: boolean,
	provider: any
) {
	try {
		const signer = await provider.getSigner();
		const proposalContract = new ethers.Contract(
			proposalAddress,
			chainConfig.contracts.proposal.abi,
			signer
		);

		const proposalContractSigner = proposalContract.connect(signer);

		const tx = await proposalContractSigner.vote(value);
		await tx.wait();

		console.log(
			"[PROPOSAL]",
			"Voted on proposal",
			proposalAddress,
			"tx",
			tx.hash
		);
	} catch (error) {
		console.error("Error voting proposal:", error);
		throw new Error(`Failed to get all proposals: ${error.message}`);
	}
}
