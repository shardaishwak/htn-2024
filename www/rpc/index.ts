import getAllDAOs from "./dao/getAllDAOs";
import getAllProposals from "./dao/getAllProposals";
import getAssets from "./dao/getAssets";
import getLenders from "./dao/getLenders";
import lend from "./dao/lend";
import finalize from "./proposal/finalize";
import vote from "./proposal/vote";
import createProposal from "./stk/createProposal";
import createStartupToken from "./stk/createStartupToken";
import getStartupTokens from "./stk/getStartupTokens";
import getAddress from "./wallet/getAddress";
import getUSDCBalance from "./wallet/getUSDCBalance";

export default class RPCProvider {
	wallet = {
		getAddress: getAddress,
		getUSDCBalance: getUSDCBalance,
	};
	dao = {
		getAllProposals: getAllProposals,
		getAllDAOs: getAllDAOs,
		getAssets: getAssets,
		getLenders: getLenders,
		lend: lend,
	};
	startupToken = {
		getStartupTokens: getStartupTokens,
		getAllProposals: getAllProposals,
		createProposal: createProposal,
		createStartupToken: createStartupToken,
	};
	proposal = {
		vote: vote,
		finalize: finalize,
	};
}

export const rpcProvider = new RPCProvider();
