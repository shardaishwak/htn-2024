import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ChainContextType, ChainContext } from "@/context/chain-context";
import { rpcProvider } from "@/rpc";
import { StartupToken, StartupTokenDAO } from "@/rpc/types";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

type DAOSStartupTableRowProps = {
	dao_address: string;
	dao_token: string;
	token_given: number;
};

const DAOSStartupTableRow = (props: DAOSStartupTableRowProps) => {
	return (
		<TableRow className={"cursor-pointer"}>
			<TableCell>
				<div className="font-medium">{props.dao_token}</div>
			</TableCell>
			<TableCell>
				<div className="text-sm">{props.dao_address}</div>
			</TableCell>
			<TableCell>
				<div className="text-sm">{props.token_given.toLocaleString()}</div>
			</TableCell>
		</TableRow>
	);
};

export default function DAOSDataTable() {
	const router = useRouter(); // Initialize useRouter
	const startupid = router?.query?.startupid as string;
	const { provider, startupTokens } =
		useContext<ChainContextType>(ChainContext);

	const [daos, setDaos] = useState<StartupTokenDAO[]>([]);

	const startupToken = startupTokens.find(
		(token) => token.symbol === startupid
	);

	useEffect(() => {
		if (startupToken) {
			(async () => {
				const address = startupToken.address;
				const daos = await rpcProvider.startupToken.getDAOs(address, provider);
				setDaos(daos);
			})();
		}
	}, [daos]);
	return (
		<Tabs defaultValue="week" className="shadow-lg h-[500px]">
			<div className="flex flex-col">
				<TabsContent value="week">
					<Card x-chunk="dashboard-05-chunk-3">
						<CardHeader className="px-7 justify-between flex-col md:flex-row">
							<div className="space-y-2">
								<CardTitle>DAO Contributions to Startups</CardTitle>
								<CardDescription>
									Explore which DAOs have contributed funding to this startup
									and where the funds went.
								</CardDescription>
							</div>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>DAO Token</TableHead>
										<TableHead>DAO Address</TableHead>
										<TableHead>Token Given</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{daos.map((dao) => (
										<DAOSStartupTableRow
											key={dao.address}
											dao_address={dao.address}
											dao_token={dao.symbol}
											token_given={dao.totalFundingReceived}
										/>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</TabsContent>
			</div>
		</Tabs>
	);
}
