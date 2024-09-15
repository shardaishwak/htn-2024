import { DAO, StartupToken } from "@/rpc/types";
import { BrowserProvider, JsonRpcSigner } from "ethers";
import { createContext } from "react";

export type ChainContextType = {
	signer: JsonRpcSigner | null;
	provider: BrowserProvider | null;
	address: string;
	chainId: number;
	connectWallet: () => void;

	daos: DAO[];
	startupTokens: StartupToken[];
	callbackDaos: () => void;
	callbackStartupTokens: () => void;
};

export const ChainContext = createContext<ChainContextType | null>(null);
