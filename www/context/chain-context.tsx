import { BrowserProvider, JsonRpcSigner } from "ethers";
import { createContext } from "react";

export type ChainContextType = {
	signer: JsonRpcSigner | null;
	provider: BrowserProvider | null;
	address: string;
	chainId: number;
	connectWallet: () => void;
};

export const ChainContext = createContext<ChainContextType | null>(null);
