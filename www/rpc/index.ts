import getAllDAOs from "./dao/getAllDAOs";
import getAllProposals from "./dao/getAllProposals";
import getAssets from "./dao/getAssets";
import getLenders from "./dao/getLenders";
import lend from "./dao/lend";
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
}

export const rpcProvider = new RPCProvider();
