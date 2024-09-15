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
import React from 'react';

type StartupTableRowProps = {
  ftx_token: string;
  totalTokens: number;
  totalTokensGivenOut: number;
  tokenPrice: number;
  numberOfProposals: number;
};

const StartupTableRow = (props: StartupTableRowProps) => {
  return (
    <TableRow className={'cursor-pointer'}>
      <TableCell>
        <div className='font-medium'>{props.ftx_token}</div>
      </TableCell>
      <TableCell>
        <div className='text-sm'>{props.totalTokens}</div>
      </TableCell>
      <TableCell>
        <div className='text-sm'>{props.totalTokensGivenOut}</div>
      </TableCell>
      <TableCell>
        <div className='text-sm'>${props.tokenPrice.toFixed(2)}</div>
      </TableCell>
      <TableCell>{props.numberOfProposals}</TableCell>
    </TableRow>
  );
};

const data = [
  {
    ftx_token: 'FTX1',
    totalTokens: 100000,
    totalTokensGivenOut: 50000,
    tokenPrice: 1.25,
    numberOfProposals: 10,
  },
  {
    ftx_token: 'FTX2',
    totalTokens: 80000,
    totalTokensGivenOut: 30000,
    tokenPrice: 2.0,
    numberOfProposals: 12,
  },
];

export default function StartupDataTable() {
  return (
    <Tabs defaultValue='week' className='shadow-lg h-[500px]'>
      <div className='flex flex-col'>
        <TabsContent value='week'>
          <Card x-chunk='dashboard-05-chunk-3'>
            <CardHeader className='px-7 justify-between flex-col md:flex-row'>
              <div className='space-y-2'>
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
                    <TableHead>Total Tokens</TableHead>
                    <TableHead>Tokens Given Out</TableHead>
                    <TableHead>Token Price</TableHead>
                    <TableHead># of Proposals</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((startup) => (
                    <StartupTableRow
                      key={startup.ftx_token}
                      ftx_token={startup.ftx_token}
                      totalTokens={startup.totalTokens}
                      totalTokensGivenOut={startup.totalTokensGivenOut}
                      tokenPrice={startup.tokenPrice}
                      numberOfProposals={startup.numberOfProposals}
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
