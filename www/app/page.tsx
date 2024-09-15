'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import DaoDataTable from './dao/data-table';
import Hero from '@/components/hero';
import StartupDataTable from './startups/data-table';

export default function HomePage() {
  //   const daoAddress = '0x';

  //   useEffect(() => {
  //     (async () => {
  //       const address = await rpcProvider.wallet.getAddress(signer);
  //       setAddress(address);

  //       const proposals = await rpcProvider.dao.getAllProposals(
  //         daoAddress,
  //         signer
  //       );
  //       console.log(proposals);
  //     })();
  //   }, [signer]);

  return (
    <div className='min-h-screen bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 p-8'>
      <Hero />
      <div className='max-w-4xl mx-auto'>
        {/* Tabs positioned at top left */}
        <Tabs defaultValue='daos' className='relative'>
          <div className=' '>
            <TabsList className='bg-gray-700 rounded-lg shadow-md w-[200px]'>
              <TabsTrigger
                value='daos'
                className='text-white py-2 px-4  text-left'
              >
                DAOs
              </TabsTrigger>
              <TabsTrigger
                value='tokens'
                className='text-white py-2 px-4 text-left'
              >
                Startup Tokens
              </TabsTrigger>
            </TabsList>
          </div>

          <div className=''>
            <TabsContent value='daos'>
              <div>
                <DaoDataTable />
              </div>
            </TabsContent>

            <TabsContent value='tokens'>
              <StartupDataTable />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
