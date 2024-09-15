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
import { ChainContext, ChainContextType } from "@/context/chain-context";
import { StartupToken } from "@/rpc/types";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

type StartupTableRowProps = {
	ftx_token: string;
	totalTokens: number;
	totalTokensGivenOut: number;
	tokenPrice: number;
	numberOfProposals: number;
};

const StartupTableRow = (props: { startupToken: StartupToken }) => {
	const router = useRouter(); // Initialize useRouter
	const { startupToken } = props;

	// Handle row click
	const handleRowClick = () => {
		router.push(`/startups/${startupToken.symbol}`);
	};

	return (
		<TableRow
			className={"cursor-pointer"}
			onClick={handleRowClick} // Add click handler
		>
			<TableCell>
				<div className="font-medium">{startupToken.symbol}</div>
			</TableCell>
			<TableCell>
				<div className="text-sm">{startupToken.owner}</div>
			</TableCell>
			<TableCell>
				<div className="text-sm">{startupToken.maximumSupply}</div>
			</TableCell>
			<TableCell>
				<div className="text-sm">${startupToken.totalSupply}</div>
			</TableCell>
			<TableCell>{startupToken.proposalCount}</TableCell>
		</TableRow>
	);
};

export default function StartupDataTable() {
	const { startupTokens } = useContext<ChainContextType>(ChainContext);
	return (
		<Tabs defaultValue="week" className="shadow-lg h-[500px]">
			<div className="flex flex-col">
				<TabsContent value="week">
					<Card x-chunk="dashboard-05-chunk-3">
						<CardHeader className="px-7 justify-between flex-col md:flex-row">
							<div className="space-y-2">
								<CardTitle>Startup Tokens</CardTitle>
								<CardDescription>
									Explore available startup tokens and their market data.
								</CardDescription>
							</div>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Token Name</TableHead>
										<TableHead>Founder</TableHead>
										<TableHead>Total Tokens</TableHead>
										<TableHead>Tokens Given Out</TableHead>
										<TableHead># of Proposals</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{startupTokens.map((startup) => (
										<StartupTableRow
											key={startup.symbol}
											startupToken={startup}
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
