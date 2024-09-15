import { ethers } from "ethers";
import chainConfig from "../index.json";

export default async function lend(
	daoAddress: string,
	provider: any,
	signer: any,
	value: number
) {
	try {
		const daoAbi = chainConfig.contracts.dao.abi;

		const dao = new ethers.Contract(daoAddress, daoAbi, provider);
		const daoSigner = dao.connect(signer);

		const lendingUSDCAmount = ethers.parseUnits(value.toString(), 6);

		// need to approve the transaction
		const usdcAddress = chainConfig.contracts.usdc.address;
		const usdcAbi = chainConfig.contracts.usdc.abi;
		const usdc = new ethers.Contract(usdcAddress, usdcAbi, provider);
		const usdcSigner = usdc.connect(signer);

		const approveTx = await usdcSigner.approve(daoAddress, lendingUSDCAmount);
		await approveTx.wait();

		// lend the amount
		const lendTx = await daoSigner.lend(lendingUSDCAmount);
		await lendTx.wait();

		console.log(
			"[DAO",
			"Lent",
			value,
			"USDC to DAO",
			daoAddress,
			"Tx:",
			lendTx.hash
		);
	} catch (error) {
		console.error("Error when lending:", error);
		throw new Error(`Failed to lend: ${error.message}`);
	}
}
