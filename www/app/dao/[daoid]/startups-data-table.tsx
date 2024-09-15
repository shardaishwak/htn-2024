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
import { Lender, StartupToken } from "@/rpc/types";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

type StartupsTableRowProps = {
	name: string;
	symbol: string;
	address: string;
	maximumSupply: string;
	totalSupply: string;
	proposalCount: string;
};

const StartupsTableRow = (props: StartupsTableRowProps) => {
	return (
		<TableRow>
			<TableCell>{props.name}</TableCell>
			<TableCell>{props.symbol}</TableCell>
			<TableCell>{props.address}</TableCell>
			<TableCell>{props.maximumSupply}</TableCell>
			<TableCell>{props.totalSupply}</TableCell>
			<TableCell>{props.proposalCount}</TableCell>
		</TableRow>
	);
};

export default function StartupsDataTable() {
	const router = useRouter(); // Initialize useRouter
	const daoid = router?.query?.daoid as string;
	const { daos, provider, startupTokens } =
		useContext<ChainContextType>(ChainContext);

	const [assets, setAssets] = useState<StartupToken[]>([]);

	const dao = daos.find((dao) => dao.symbol === daoid);

	useEffect(() => {
		if (dao) {
			(async () => {
				const address = dao.address;
				const assets = await rpcProvider.dao.getAssets(address, provider);
				setAssets(assets);
			})();
		}
	}, [dao]);
	return (
		<Tabs defaultValue="week" className="shadow-lg h-[500px]">
			<div className="flex flex-col">
				<TabsContent value="week">
					<Card x-chunk="dashboard-05-chunk-3">
						<CardHeader className="px-7 justify-between flex-col md:flex-row">
							<div className="space-y-2">
								<CardTitle>Startups List</CardTitle>
								<CardDescription>Explore the list of startups.</CardDescription>
							</div>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Startup Name</TableHead>
										<TableHead>Symbol</TableHead>
										<TableHead>Address</TableHead>
										<TableHead>Max Supply</TableHead>
										<TableHead>Total Supply</TableHead>
										<TableHead>Proposals</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{assets.map((startup) => (
										<StartupsTableRow
											key={startup.address}
											address={startup.address}
											maximumSupply={startup.maximumSupply.toString()}
											name={startup.name}
											proposalCount={startup.proposalCount.toString()}
											symbol={startup.symbol}
											totalSupply={startup.totalSupply.toString()}
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
