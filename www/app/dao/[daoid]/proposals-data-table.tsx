import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import React, { useState } from 'react'; // Assuming you have a Button component in ui
import ApproveProposalModal from '@/app/modals/approve-proposal-modal';
import RejectProposalModal from '@/app/modals/reject-proposal-modal';

type ProposalsTableRowProps = {
  id: string;
  investment: string;
  status: string;
  amountRequested: number;
  tokensOffered: number;
  tokenValue: number;
  description: string;
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
        <TableCell>${props.tokenValue.toFixed(2)}</TableCell>
        <TableCell>
          <div className="flex space-x-2">
            <ApproveProposalModal/>
            <RejectProposalModal />
          </div>
        </TableCell>
      </TableRow>

      {/* Expandable row (only visible when expanded) */}
      {isExpanded && (
        <TableRow>
          <TableCell colSpan={6} className="bg-gray-100">
            <div className="p-4">
              <strong>Description:</strong> {props.description}
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

const data = [
  {
    id: 'investment001',
    investment: 'Investment A',
    status: 'Completed',
    amountRequested: 50000,
    tokensOffered: 3000,
    tokenValue: 10.5,
    description: 'Investment A is a great investment with high potential.',
  },
  {
    id: 'investment002',
    investment: 'Investment B',
    status: 'Pending',
    amountRequested: 75000,
    tokensOffered: 4500,
    tokenValue: 3.0,
    description: 'Investment B is focused on renewable energy solutions.',
  },
  // Add more data as needed
];

export default function ProposalsDataTable() {
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
                    <TableHead>Token Value</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((proposal) => (
                    <ProposalsTableRow
                      key={proposal.id}
                      investment={proposal.investment}
                      status={proposal.status}
                      amountRequested={proposal.amountRequested}
                      tokensOffered={proposal.tokensOffered}
                      tokenValue={proposal.tokenValue}
                      description={proposal.description}
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
