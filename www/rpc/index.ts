import getAllProposals from "./dao/getAllProposals";
import getAddress from "./wallet/getAddress";

export default class RPCProvider {
	wallet = {
		getAddress: getAddress,
	};
	dao = {
		getAllProposals: getAllProposals,
	};
}

export const rpcProvider = new RPCProvider();
