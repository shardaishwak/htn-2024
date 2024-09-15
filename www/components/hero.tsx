import React, { useContext } from "react";
import { Button } from "./ui/button";
import { ChainContext } from "@/context/chain-context";

export default function Hero() {


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

			</div>
		</div>
	);
}
