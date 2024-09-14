import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

const deploymentNetworks = {
	sepolia: {},
};

if (process.env.SEPOLIA_RPC_URL && process.env.DEPLOYER_PRIVATE_KEY) {
	deploymentNetworks.sepolia = {
		url: process.env.SEPOLIA_RPC_URL,
		accounts: [process.env.DEPLOYER_PRIVATE_KEY],
	};
}

const config: HardhatUserConfig = {
	solidity: {
		version: "0.8.24",
		settings: {
			optimizer: {
				enabled: true,
				runs: 200,
				details: {
					yul: true,
				},
			},
			viaIR: false,
		},
	},

	networks: {
		hardhat: {
			chainId: 8545, // Local network
			forking: {
				url: process.env.BASE_RPC_URL as string,
			},
			gasPrice: 20000000000, // 20 gwei
		},
		devnet: {
			url: "http://0.0.0.0:8545",
			chainId: 8453,
		},
		// ...deploymentNetworks,
	},
};

export default config;
