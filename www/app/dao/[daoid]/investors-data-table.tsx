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
  
  type InvestorsTableRowProps = {
    id: string;
    address: string;
    equity: string;
    tokens: string;
  };
  
  const InvestorsTableRow = (props: InvestorsTableRowProps) => {
    return (
      <TableRow>
        <TableCell>{props.address}</TableCell>
        <TableCell>{props.equity}</TableCell>
        <TableCell>{props.tokens}</TableCell>
      </TableRow>
    );
  };
  
  const investorsData = [
    {
      id: 'investor001',
      address: 'x12',
      equity: '12%',
      tokens: '20000',
    },
    {
      id: 'investor002',
      address: 'dsnikdjew',
      equity: '14%',
      tokens: '9202',
    },
    // Add more data as needed
  ];
  
  export default function InvestorsDataTable() {
    return (
      <Tabs defaultValue="week" className="shadow-lg h-[500px]">
        <div className="flex flex-col">
          <TabsContent value="week">
            <Card x-chunk="dashboard-05-chunk-3">
              <CardHeader className="px-7 justify-between flex-col md:flex-row">
                <div className="space-y-2">
                  <CardTitle>Investors List</CardTitle>
                  <CardDescription>Explore the list of investors.</CardDescription>
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
                    {investorsData.map((investor) => (
                      <InvestorsTableRow
                        key={investor.id}
                        address={investor.address}
                        equity={investor.equity}
                        tokens={investor.tokens}
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
  