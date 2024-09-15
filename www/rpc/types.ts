export type Proposal = {
	address: string;
	startupToken: string;
	dao: string;
	founder: string;
	description: string;
	requestedAmount: number;
	tokensOffered: number;
	fundingAddress: string;
	votesFor: number;
	votesAgainst: number;
	finalized: boolean;
	voted: boolean;
	voteSelection: boolean;
	canFinalize: boolean;
	votingPower: number;
};

export type DAO = {
	address: string;
	usdcToken: string;
	daoCreator: string;
	description: string;
	totalUSDCIn: number;
	totalTokensOut: number;
	symbol: string;
	name: string;
	lendersCount: number;
	assetsCount: number;
	proposalCount: number;
};

export type StartupToken = {
	address: string;
	name: string;
	symbol: string;
	totalSupply: number;
	maximumSupply: number;
	proposalCount: number;
	owner: string;
};
