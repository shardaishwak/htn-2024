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
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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
				<TableRow className="w-full">
					<TableCell
						colSpan={6}
						className="bg-gray-100 flex flex-row justify-between w-full"
					>
						<div className="p-4 flex w-full">
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
	const startupid = useParams().startupid as string;
	const { provider, startupTokens, address } =
		useContext<ChainContextType>(ChainContext);

	const [proposals, setProposals] = useState<Proposal[]>([]);

	const startupToken = startupTokens.find(
		(token) => token.symbol === startupid
	);

	useEffect(() => {
		if (startupToken) {
			(async () => {
				const address = startupToken.address;
				const lenders = await rpcProvider.dao.getAllProposals(
					address,
					provider
				);
				setProposals(lenders);
			})();
		}
	}, [startupToken]);

	const isOwner = address === startupToken?.owner;

	const [isOpen, setIsOpen] = useState(false);
	const [description, setDescription] = useState("");
	const [requestedAmount, setRequestedAmount] = useState(0);
	const [tokensOffered, setTokensOffered] = useState(0);
	const [fundingAddress, setFundingAddress] = useState("");
	const [daoAddress, setDaoAddress] = useState("");

	const callbackVote = async (proposalAddress: string, vote: boolean) => {
		// Call the RPC method to vote on the proposal
		await rpcProvider.proposal.vote(proposalAddress, vote, provider);
	};

	const callbackFinalize = async (proposalAddress: string) => {
		await rpcProvider.proposal.finalize(proposalAddress, provider);
	};

	// Function to open the modal
	const openModal = () => {
		setIsOpen(true);
	};

	// Function to close the modal
	const closeModal = () => {
		setIsOpen(false);
	};

	const callbackCreateProposal = async () => {
		if (!startupToken) {
			return;
		}
		await rpcProvider.startupToken.createProposal(
			startupToken.address,
			description,
			requestedAmount,
			tokensOffered,
			fundingAddress,
			daoAddress, // you select from the list of available DAOs
			provider
		);
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
							{isOwner && (
								<div>
									{/** Open modal here */}
									<Button onClick={openModal}>Create</Button>
								</div>
							)}
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
								<TableBody className="w-full">
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
					{/* Modal for lending */}
					<Dialog open={isOpen} onOpenChange={setIsOpen}>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Proposal</DialogTitle>
							</DialogHeader>
							<div className="flex flex-col gap-4">
								<Input
									type="text"
									placeholder="Description"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
								/>
								<Input
									type="number"
									placeholder="Requested Amount"
									value={requestedAmount}
									onChange={(e) => setRequestedAmount(parseInt(e.target.value))}
								/>
								<Input
									type="number"
									placeholder="Tokens Offered"
									value={tokensOffered}
									onChange={(e) => setTokensOffered(parseInt(e.target.value))}
								/>
								<Input
									type="text"
									placeholder="Funding Address"
									value={fundingAddress}
									onChange={(e) => setFundingAddress(e.target.value)}
								/>
								<Input
									type="text"
									placeholder="DAO Address"
									value={daoAddress}
									onChange={(e) => setDaoAddress(e.target.value)}
								/>
							</div>
							<DialogFooter>
								<Button onClick={callbackCreateProposal} className="">
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
