"use client";

import { Button } from "@/components/ui/button";
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
import { rpcProvider } from "@/rpc";
import { Lender } from "@/rpc/types";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

// Modal functionality integrated here
const InvestorsTableRow = (props: InvestorsTableRowProps) => {
	return (
		<TableRow>
			<TableCell>{props.address}</TableCell>
			<TableCell>{props.equity}</TableCell>
			<TableCell>{props.tokens}</TableCell>
		</TableRow>
	);
};

export default function InvestorsDataTable({ query }) {
	const router = useRouter();
	const daoid = router?.query?.daoid as string;
	const { daos, provider } = useContext<ChainContextType>(ChainContext);
	const [isOpen, setIsOpen] = useState(false); // To control modal visibility
	const [amount, setAmount] = useState(''); // To track the amount user enters
	const [lenders, setLenders] = useState<Lender[]>([]);

	const dao = daos.find((dao) => dao.symbol === daoid);

	useEffect(() => {
		if (dao) {
			(async () => {
				const address = dao.address;
				const lenders = await rpcProvider.dao.getLenders(address, provider);
				setLenders(lenders);
			})();
		}
	}, [dao]);

	const totalDAOfunds = dao?.totalUSDCIn || 1;

	// Function to handle the lend callback
	const callbackLend = async (daoAddress: string, amount: number) => {
		await rpcProvider.dao.lend(daoAddress, provider, signer, amount);
		setIsOpen(false); // Close the modal after submission
	};

	// Function to open the modal
	const openModal = () => {
		setIsOpen(true);
	};

	// Function to close the modal
	const closeModal = () => {
		setIsOpen(false);
	};

	return (
		<Tabs defaultValue="week" className="shadow-lg h-[500px]">
			<div className="flex flex-col">
				<TabsContent value="week">
					<Card x-chunk="dashboard-05-chunk-3">
						<CardHeader className="px-7 justify-between flex-col md:flex-row">
							<div className="space-y-2">
								<CardTitle>Investors List</CardTitle>
								<CardDescription>
									Explore the list of investors.
								</CardDescription>
							</div>
							<div>
								<Button onClick={openModal}>+</Button>
							</div>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Investor Address</TableHead>
										<TableHead>Equity</TableHead>
										<TableHead>Tokens</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{lenders.map((investor) => (
										<InvestorsTableRow
											id={investor.address}
											key={investor.address}
											address={investor.address}
											equity={(investor.value / totalDAOfunds).toString()}
											tokens={investor.value}
										/>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>

					{/* Modal for lending */}
					<Dialog open={isOpen} onOpenChange={setIsOpen}>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>How much do you want to lend?</DialogTitle>
							</DialogHeader>
							<div className="flex flex-col gap-4">
								<Input
									type="number"
									placeholder="Enter amount"
									value={amount}
									onChange={(e) => setAmount(e.target.value)}
								/>
							</div>
							<DialogFooter>
								<Button
									onClick={() =>
										callbackLend('daoAddressPlaceholder', parseFloat(amount))
									}
									className=""
								>
									Confirm
								</Button>
								<Button onClick={closeModal} variant="outline">
									Cancel
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</TabsContent>
			</div>
		</Tabs>
	);
}
