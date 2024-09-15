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
  import { useRouter } from 'next/navigation';
  import React from 'react';
  
  type DAOSStartupTableRowProps = {
    dao_address: string;
    dao_token: string;
    token_given: number;
    whereMoneyWent: string;
  };
  
  const DAOSStartupTableRow = (props: DAOSStartupTableRowProps) => {
  
    return (
      <TableRow
        className={'cursor-pointer'}
      >
        <TableCell>
          <div className="font-medium">{props.dao_token}</div>
        </TableCell>
        <TableCell>
          <div className="text-sm">{props.dao_address}</div>
        </TableCell>
        <TableCell>
          <div className="text-sm">{props.token_given.toLocaleString()}</div>
        </TableCell>
        <TableCell>
          <div className="text-sm">{props.whereMoneyWent}</div>
        </TableCell>
      </TableRow>
    );
  };
  
  // Sample data showing DAOs that have contributed to startups
  const data = [
    {
      dao_address: '0x13424r',
      dao_token: 'FTX1',
      token_given: 100000,
      whereMoneyWent: 'Research and Development',
    },
    {
      dao_address: '0x123',
      dao_token: 'FTX2',
      token_given: 12000,
      whereMoneyWent: 'Marketing and Expansion',
    },
  ];
  
  export default function DAOSDataTable() {
    return (
      <Tabs defaultValue="week" className="shadow-lg h-[500px]">
        <div className="flex flex-col">
          <TabsContent value="week">
            <Card x-chunk="dashboard-05-chunk-3">
              <CardHeader className="px-7 justify-between flex-col md:flex-row">
                <div className="space-y-2">
                  <CardTitle>DAO Contributions to Startups</CardTitle>
                  <CardDescription>
                    Explore which DAOs have contributed funding to this startup and where the funds went.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>DAO Token</TableHead>
                      <TableHead>DAO Address</TableHead>
                      <TableHead>Token Given</TableHead>
                      <TableHead>Where Money Went</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((dao) => (
                      <DAOSStartupTableRow
                        key={dao.dao_token}
                        dao_address={dao.dao_address}
                        dao_token={dao.dao_token}
                        token_given={dao.token_given}
                        whereMoneyWent={dao.whereMoneyWent}
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
  