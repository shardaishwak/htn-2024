'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Payment, columns } from "./dao/columns"
import { DaoDataTable } from "./dao/data-table"

const daosdata: Payment[] = [
  {
    id: "728ec52f",
    amount: 100,
    status: "pending",
    email: "alss@example.com",
  },
  {
    id: "728ed52f",
    amount: 200,
    status: "pending",
    email: "askndj@example.com",
  },
  {
    id: "728ee52f",
    amount: 2830,
    status: "pending",
    email: "mewkd@example.com",
  },
  // ...
];

// You can now use 'daos' directly without needing an async function



export default function HomePage() {

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='max-w-4xl mx-auto'>
        <header className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            Welcome to DAO & Token Explorer
          </h1>
          <p className='text-xl text-gray-600'>
            Discover and explore Decentralized Autonomous Organizations and
            Startup Tokens in one place.
          </p>
        </header>

        <Tabs defaultValue='daos' className='w-full '>
          <TabsList className='grid w-full grid-cols-2 bg-white rounded-lg shadow-md mb-6 h-[60px] gap-x-3'>
            <TabsTrigger
              value='daos'
              className='py-3 hover:bg-gray-100 cursor-pointer text-center font-semibold text-gray-700 border-b-4 border-transparent'
            >
              DAOs
            </TabsTrigger>
            <TabsTrigger
              value='tokens'
              className='py-3 hover:bg-gray-100 cursor-pointer text-center font-semibold text-gray-700 border-b-4 border-transparent'
            >
              Startup Tokens
            </TabsTrigger>
          </TabsList>

          <TabsContent value='daos'>
            <Card className='shadow-lg'>
              <CardHeader>
                <CardTitle className='text-2xl'>List of DAOs</CardTitle>
                <CardDescription>
                  Explore available Decentralized Autonomous Organizations.
                  Click on a DAO to view more information.
                </CardDescription>
              </CardHeader>
              <CardContent>
              <div className="container mx-auto py-10">
              <DaoDataTable columns={columns} data={daosdata} />
            </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='tokens'>
            <Card className='shadow-lg'>
              <CardHeader>
                <CardTitle className='text-2xl'>
                  List of Startup Tokens
                </CardTitle>
                <CardDescription>
                  Discover innovative startup tokens and their potential.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className='space-y-2'>
                  {/* Replace with dynamic Token data */}
                  <li className='p-4 rounded-lg hover:bg-gray-100 transition-colors'>
                    Startup Token 1
                  </li>
                  <li className='p-4 rounded-lg hover:bg-gray-100 transition-colors'>
                    Startup Token 2
                  </li>
                  <li className='p-4 rounded-lg hover:bg-gray-100 transition-colors'>
                    Startup Token 3
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
