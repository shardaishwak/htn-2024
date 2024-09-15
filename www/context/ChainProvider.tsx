"use client";

import React from "react";
import { ChainContext, ChainContextType } from "./chain-context";
import { BrowserProvider, ethers, JsonRpcSigner } from "ethers";

const ChainProvider = ({ children }: { children: never }) => {
	const [signer, setSigner] = React.useState<JsonRpcSigner | null>(null);
	const [provider, setProvider] = React.useState<BrowserProvider | null>(null);
	const [address, setAddress] = React.useState<string>("");
	const [chainId, setChainId] = React.useState<number>(8545);

	const connectWallet = async () => {
		if (typeof window.ethereum !== "undefined") {
			const provider = new ethers.BrowserProvider(window.ethereum);
			const signer = await provider.getSigner();
			const address = await signer.getAddress();
			const chainId = (await provider.getNetwork()).chainId as never;
			setSigner(signer);
			setProvider(provider);
			setAddress(address);
			setChainId(chainId);
		}
	};
	const value: ChainContextType = {
		signer,
		provider,
		address,
		chainId,
		connectWallet,
	};

	return (
		<ChainContext.Provider value={value}>{children}</ChainContext.Provider>
	);
};

export default ChainProvider;
