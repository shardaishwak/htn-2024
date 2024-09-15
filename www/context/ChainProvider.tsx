"use client";

import React, { useEffect } from "react";
import { ChainContext, ChainContextType } from "./chain-context";
import { BrowserProvider, ethers, JsonRpcSigner } from "ethers";
import { rpcProvider } from "@/rpc";

const ChainProvider = ({ children }: { children: never }) => {
	const [signer, setSigner] = React.useState<JsonRpcSigner | null>(null);
	const [provider, setProvider] = React.useState<BrowserProvider | null>(null);
	const [address, setAddress] = React.useState<string>("");
	const [chainId, setChainId] = React.useState<number>(8545);

	const [daos, setDaos] = React.useState<any[]>([]);
	const [startupTokens, setStartupTokens] = React.useState<any[]>([]);

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

	useEffect(() => {
		if (typeof window.ethereum !== "undefined") {
			window.ethereum.on("accountsChanged", (accounts) => {
				const newAccount = accounts[0] || null;
				setAddress(newAccount);
				console.log(`accountsChanged: ${newAccount}`);
			});
		}
	}, []);

	const callbackDaos = async () => {
		const daos = await rpcProvider.dao.getAllDAOs(provider);
		setDaos(daos);
	};

	const callbackStartupTokens = async () => {
		const startupTokens = await rpcProvider.startupToken.getStartupTokens(
			provider
		);
		setStartupTokens(startupTokens);
	};

	useEffect(() => {
		(async () => {
			await callbackDaos();
			await callbackStartupTokens();
		})();
	}, [signer]);

	useEffect(() => {
		(async () => {
			if (typeof window.ethereum !== "undefined") {
				const provider = new ethers.BrowserProvider(window.ethereum);
				const network = await provider.getNetwork();
				setChainId(network.chainId as any);
				const accounts = await provider.listAccounts();
				if (accounts.length > 0) {
					const signer = await provider.getSigner();
					setSigner(signer);
					setAddress(accounts[0]);
				}
			}
		})();
	}, []);

	const value: ChainContextType = {
		signer,
		provider,
		address,
		chainId,
		connectWallet,
		daos,
		startupTokens,
		callbackDaos,
		callbackStartupTokens,
	};

	console.log("[ChainProvider] state", value);

	return (
		<ChainContext.Provider value={value}>{children}</ChainContext.Provider>
	);
};

export default ChainProvider;
