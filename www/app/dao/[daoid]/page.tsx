'use client'
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useParams } from 'next/navigation';
import { DaoDataTable } from "./data-table";  // Ensure this import is correct
import { InvestmentData, investment_columns } from './columns';  // Update to use the new columns
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableCell,
  TableRow,
} from "@/components/ui/table";

const investorsData = [
  {
    id: "investor001",
    address: "x12",
    equity: "12%",
    tokens: "20000",
  },
  {
    id: "investor002",
    address: "dsnikdjew",
    equity: "14%",
    tokens: "9202",
  },
  // Add more investor data as needed
];

const investmentData: InvestmentData[] = [
  {
    id: "investment001",
    investment: "Investment A",
    status: "Completed",
    votes: "Yes/No/Not Done",
    amountInvested: 50000,
    tokens: 3000,
    tokenValue: 2.5,
    percentChange: 10.5,
  },
  {
    id: "investment002",
    investment: "Investment B",
    status: "Pending",
    votes: "Yes/No/Not Done",
    amountInvested: 75000,
    tokens: 4500,
    tokenValue: 3.0,
    percentChange: -4.2,
  },
  // Add more data as needed
];

const daosData = [
  // Keep your existing DAO data if needed, or use investmentData if it fits the context
]

const DaoPage = () => {
  const params = useParams();
  const { id } = params;

  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [sortedData, setSortedData] = useState(investorsData);

  const handleSort = () => {
    const direction = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(direction);

    const sorted = [...investorsData].sort((a, b) => {
      const equityA = parseFloat(a.equity.replace('%', ''));
      const equityB = parseFloat(b.equity.replace('%', ''));
      
      return direction === 'asc' ? equityA - equityB : equityB - equityA;
    });

    setSortedData(sorted);
  };

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='max-w-4xl mx-auto'>
        <header className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            DAO Details
          </h1>
          <p className='text-xl text-gray-600'>
            View the investments and investors for this DAO.
          </p>
        </header>
        {/* Tabs system for Investments and Investors */}
        <Tabs defaultValue="investments" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white rounded-lg shadow-md mb-6 h-[60px] gap-x-3">
            <TabsTrigger
              value="investments"
              className="py-3 hover:bg-gray-100 cursor-pointer text-center font-semibold text-gray-700 border-b-4 border-transparent"
            >
              Investments
            </TabsTrigger>
            <TabsTrigger
              value="investors"
              className="py-3 hover:bg-gray-100 cursor-pointer text-center font-semibold text-gray-700 border-b-4 border-transparent"
            >
              Investors
            </TabsTrigger>
          </TabsList>

          {/* Tab Content for Investments */}
          <TabsContent value='investments'>
            <Card className='shadow-lg'>
              <CardHeader>
                <CardTitle className='text-2xl'>DAO Investments</CardTitle>
                <CardDescription>
                  Explore the investments for the selected DAO.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="container mx-auto py-10">
                  <DaoDataTable columns={investment_columns} data={investmentData} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Content for Investors */}
          <TabsContent value='investors'>
            <Card className='shadow-lg'>
              <CardHeader>
                <CardTitle className='text-2xl'>Investors</CardTitle>
                <CardDescription>
                  Here you can see the list of investors.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <Table className="w-3/4">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[200px] text-center">Investor Address</TableHead>
                        <TableHead className="w-[200px] text-center cursor-pointer" onClick={handleSort}>
                          Equity {sortDirection === 'asc' ? '▲' : '▼'}
                        </TableHead>
                        <TableHead className="text-center">Tokens</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedData.map((investor, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium text-center">{investor.address}</TableCell>
                          <TableCell className="text-center">{investor.equity}</TableCell>
                          <TableCell className="text-center">{investor.tokens}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default DaoPage;
