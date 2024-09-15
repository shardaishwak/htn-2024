"use client";

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
import React, { useContext } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { ChainContextType, ChainContext } from "@/context/chain-context";
import { DAO } from "@/rpc/types";
import { ethers } from "ethers";

const DAOTableRow = (props: { dao: DAO }) => {
	const router = useRouter(); // Initialize useRouter
	const { dao } = props; // Destructure DAO object

	// Handle row click
	const handleRowClick = () => {
		router.push(`/dao/${dao.symbol}`);
	};

	return (
		<TableRow
			className={"cursor-pointer"} // Make row clickable
			onClick={handleRowClick} // Add click handler
		>
			<TableCell>
				<div className="font-medium">{dao.name}</div>
			</TableCell>
			<TableCell>
				<div className="hidden text-sm text-muted-foreground md:inline">
					{dao.symbol}
				</div>
			</TableCell>
			<TableCell className="hidden sm:table-cell">{dao.description}</TableCell>
			<TableCell className="hidden sm:table-cell">
				{Number(dao.lendersCount)}
			</TableCell>
			<TableCell className="hidden md:table-cell">
				${dao.totalUSDCIn.toLocaleString()}
			</TableCell>
			<TableCell className="">
				${ethers.formatUnits(dao.totalTokensOut, 6).toLocaleString()}
			</TableCell>
			<TableCell className="">{Number(dao.proposalCount)}</TableCell>
		</TableRow>
	);
};

export default function DaoDataTable() {
	const { daos } = useContext<ChainContextType>(ChainContext);

	return (
		<Tabs defaultValue="week" className="shadow-lg h-[500px]">
			<div className="flex flex-col">
				<TabsContent value="week">
					<Card x-chunk="dashboard-05-chunk-3">
						<CardHeader className="px-7 justify-between flex-col md:flex-row">
							<div className="space-y-2">
								<CardTitle>Decentralized Autonomous Organizations</CardTitle>
								<CardDescription>
									Explore available Decentralized Autonomous Organizations.
								</CardDescription>
							</div>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Name</TableHead>
										<TableHead>Token</TableHead>
										<TableHead className="hidden sm:table-cell">
											Industry
										</TableHead>
										<TableHead className="hidden sm:table-cell">
											# of Investors
										</TableHead>
										<TableHead className="hidden md:table-cell">
											Total Contributions to DAO
										</TableHead>
										<TableHead className="">
											DAO Investment in Startups
										</TableHead>
										<TableHead className=""># of Proposals</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{daos.map((dao) => (
										<DAOTableRow key={dao.symbol} dao={dao} />
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
