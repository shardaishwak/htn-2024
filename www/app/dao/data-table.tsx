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
import { useRouter } from 'next/navigation'; // Import useRouter

type DAOTableRowProps = {
  dao_name: string;
  dao_token: string;
  industry: string;
  no_of_investors: number;
  contributions_to_dao: number;
  invested_in_startups: number;
  numberOfProposals: number;
};

const DAOTableRow = (props: DAOTableRowProps) => {
  const router = useRouter(); // Initialize useRouter

  // Handle row click
  const handleRowClick = () => {
    router.push(`/dao/${props.dao_token}`);
  };

  return (
    <TableRow
      className={'cursor-pointer'} // Make row clickable
      onClick={handleRowClick} // Add click handler
    >
      <TableCell>
        <div className='font-medium'>{props.dao_name}</div>
      </TableCell>
      <TableCell>
        <div className='hidden text-sm text-muted-foreground md:inline'>
          {props.dao_token}
        </div>
      </TableCell>
      <TableCell className='hidden sm:table-cell'>{props.industry}</TableCell>
      <TableCell className='hidden sm:table-cell'>{props.no_of_investors}</TableCell>
      <TableCell className='hidden md:table-cell'>
        ${props.contributions_to_dao.toLocaleString()}
      </TableCell>
      <TableCell className=''>
        ${props.invested_in_startups.toLocaleString()}
      </TableCell>
      <TableCell className=''>{props.numberOfProposals}</TableCell>
    </TableRow>
  );
};

const data = [
  {
    id: 'dao001',
    dao_name: 'DAO 1',
    dao_token: 'DAO1',
    industry: 'Tech',
    no_of_investors: 120,
    contributions_to_dao: 500000.0,
    invested_in_startups: 300000.0,
    numberOfProposals: 15,
  },
  {
    id: 'dao002',
    dao_name: 'DAO 2',
    dao_token: 'DAO2',
    industry: 'Tech',
    no_of_investors: 85,
    contributions_to_dao: 350000.0,
    invested_in_startups: 150000.0,
    numberOfProposals: 22,
  },
];

export default function DaoDataTable() {
  return (
    <Tabs defaultValue='week' className='shadow-lg h-[500px]'>
      <div className='flex flex-col'>
        <TabsContent value='week'>
          <Card x-chunk='dashboard-05-chunk-3'>
            <CardHeader className='px-7 justify-between flex-col md:flex-row'>
              <div className='space-y-2'>
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
                    <TableHead className='hidden sm:table-cell'>Industry</TableHead>
                    <TableHead className='hidden sm:table-cell'># of Investors</TableHead>
                    <TableHead className='hidden md:table-cell'>Total Contributions to DAO</TableHead>
                    <TableHead className=''>DAO Investment in Startups</TableHead>
                    <TableHead className=''># of Proposals</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((dao) => (
                    <DAOTableRow
                      key={dao.id}
                      dao_name={dao.dao_name}
                      dao_token={dao.dao_token}
                      industry={dao.industry}
                      no_of_investors={dao.no_of_investors}
                      contributions_to_dao={dao.contributions_to_dao}
                      invested_in_startups={dao.invested_in_startups}
                      numberOfProposals={dao.numberOfProposals}
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
