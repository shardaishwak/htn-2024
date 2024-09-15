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
import React, { useContext, useEffect, useState } from "react"; // Assuming you have a Button component in ui
import ApproveProposalModal from "@/app/modals/approve-proposal-modal";
import RejectProposalModal from "@/app/modals/reject-proposal-modal";
import { useParams, useRouter } from "next/navigation";
import { ChainContextType, ChainContext } from "@/context/chain-context";
import { rpcProvider } from "@/rpc";
import { Proposal } from "@/rpc/types";
import { Button } from "@/components/ui/button";
import { ethers } from "ethers";

type ProposalsTableRowProps = {
	id: string;
	investment: string;
	status: string;
	amountRequested: number;
	tokensOffered: number;
	description: string;
	onVote: (proposalId: string, vote: boolean) => void;
	voted: boolean;
	voteSelection: boolean;
	onFinalize: (proposalId: string) => void;
	votingApproval: number;
};

const ProposalsTableRow = (props: ProposalsTableRowProps) => {
	const [isExpanded, setIsExpanded] = useState(false); // Track if the row is expanded

	// Toggle row expansion
	const handleRowClick = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<>
			{/* Main row */}
			<TableRow className="cursor-pointer" onClick={handleRowClick}>
				<TableCell>{props.investment}</TableCell>
				<TableCell>{props.status}</TableCell>
				<TableCell className="hidden sm:table-cell">
					${props.amountRequested.toLocaleString()}
				</TableCell>
				<TableCell className="hidden md:table-cell">
					{props.tokensOffered.toLocaleString()} tokens
				</TableCell>
				{props.status !== "Completed" && (
					<TableCell>
						<div className="flex space-x-2">
							<ApproveProposalModal
								onConfirm={() => props.onVote(props.id, true)}
								disabled={props.voted}
							/>
							<RejectProposalModal
								onConfirm={() => props.onVote(props.id, false)}
								disabled={props.voted}
							/>
						</div>
					</TableCell>
				)}
			</TableRow>

			{/* Expandable row (only visible when expanded) */}
			{isExpanded && (
				<TableRow>
					<TableCell colSpan={6} className="bg-gray-100">
						<div className="p-4">
							<strong>Description:</strong> {props.description}
						</div>
						{props.status !== "Completed" && (
							<div>
								{Number(ethers.formatUnits(props.votingApproval, 6))}%
								<Button onClick={() => props.onFinalize(props.id)}>
									Finalize
								</Button>
							</div>
						)}
					</TableCell>
				</TableRow>
			)}
		</>
	);
};

export default function ProposalsDataTable() {
	const daoid = useParams()?.daoid as string;
	const { daos, provider } = useContext<ChainContextType>(ChainContext);

	const [proposals, setProposals] = useState<Proposal[]>([]);

	const dao = daos.find((dao) => dao.symbol === daoid);

	useEffect(() => {
		if (dao) {
			(async () => {
				const address = dao.address;
				const lenders = await rpcProvider.dao.getAllProposals(
					address,
					provider
				);
				setProposals(lenders);
			})();
		}
	}, [dao]);

	const callbackFinalize = async (proposalAddress: string) => {
		await rpcProvider.proposal.finalize(proposalAddress, provider);
	};
	const callbackVote = async (proposalAddress: string, vote: boolean) => {
		// Call the RPC method to vote on the proposal
		await rpcProvider.proposal.vote(proposalAddress, vote, provider);
	};
	return (
		<Tabs defaultValue="week" className="shadow-lg h-[500px]">
			<div className="flex flex-col">
				<TabsContent value="week">
					<Card x-chunk="dashboard-05-chunk-3">
						<CardHeader className="px-7 justify-between flex-col md:flex-row">
							<div className="space-y-2">
								<CardTitle>Investment Proposals</CardTitle>
								<CardDescription>
									Explore available investment proposals.
								</CardDescription>
							</div>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Investment Name</TableHead>
										<TableHead>Status</TableHead>
										<TableHead className="hidden sm:table-cell">
											Amount Requested
										</TableHead>
										<TableHead className="hidden md:table-cell">
											Tokens Offered
										</TableHead>
										<TableHead>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{proposals.map((proposal) => (
										<ProposalsTableRow
											key={proposal.address}
											investment={proposal.address}
											status={proposal.finalized ? "Completed" : "Pending"}
											amountRequested={proposal.requestedAmount}
											tokensOffered={proposal.tokensOffered}
											description={proposal.description}
											id={proposal.address}
											onVote={callbackVote}
											voted={proposal.voted}
											voteSelection={proposal.voteSelection}
											onFinalize={callbackFinalize}
											votingApproval={proposal.votingPower}
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
