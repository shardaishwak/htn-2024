import React, { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ChainContext } from "@/context/chain-context";
import { rpcProvider } from "@/rpc";
import { ethers } from "ethers";
import Image from "next/image";

export default function Hero() {
	const { connectWallet, address, provider, signer } = useContext(ChainContext);

	const [usdcBalance, setUsdcBalance] = useState(0);

	useEffect(() => {
		(async () => {
			if (signer) {
				const balance = await rpcProvider.wallet.getUSDCBalance(provider);
				setUsdcBalance(balance);
			}
		})();
	}, [signer]);

	return (
		<div className="flex flex-col items-center bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900">
			<div className="mt-12 flex flex-col items-center px-4">
				{/* Main Title */}
				<h1 className="text-5xl lg:text-7xl font-bold text-white mb-4 px-3 text-center">
					Decentralized Investment Platform
				</h1>

				{/* Subheading */}
				<h3 className="text-4xl lg:text-6xl font-medium lg:font-bold px-3 text-center text-gray-300">
					Empowering Startups and Investors
				</h3>

				{/* Project Description */}
				<p className="text-md lg:text-lg text-gray-400 mt-6 text-center max-w-2xl">
					Startups raise funding globally, investors gain secure opportunities.
					Join a decentralized ecosystem today.
				</p>

				{/* Connect Wallet Button */}
				{(!address && (
					<Button
						onClick={connectWallet}
						className="bg-white text-gray-900 py-3 px-6 shadow-lg mt-8"
					>
						Connect to Wallet
					</Button>
				)) || (
					<div className="flex flex-row gap-2 item-center justify-center">
						<Image
							src={"https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=034"}
							className="w-12 h-12"
							width={20}
							height={20}
							objectFit="cover"
							alt="USDC Logo"
							style={{
								width: 30,
								height: 30,
								marginTop: 20,
							}}
						/>
						<h1 className="text-md font-bold lg:text-lg text-gray-400 mt-6 text-center max-w-2xl">
							USDC Balance: {ethers.formatUnits(usdcBalance, 6)}
						</h1>
					</div>
				)}
			</div>
		</div>
	);
}
