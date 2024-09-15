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
  
  const startupsData = [
    {
      name: 'Startup A',
      symbol: 'STA',
      address: '0x123456789',
      maximumSupply: '500000',
      totalSupply: '200000',
      proposalCount: "15",
    },
    {
      name: 'Startup B',
      symbol: 'STB',
      address: '0x987654321',
      maximumSupply: '300000',
      totalSupply: '100000',
      proposalCount: "12",
    },
    // Add more data as needed
  ];
  
  export default function StartupsDataTable() {
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
                    {startupsData.map((startup) => (
                      <StartupsTableRow
                        key={startup.symbol}
                        name={startup.name}
                        symbol={startup.symbol}
                        address={startup.address}
                        maximumSupply={startup.maximumSupply}
                        totalSupply={startup.totalSupply}
                        proposalCount={startup.proposalCount}
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
  