'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function TokensPage() {
  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='max-w-4xl mx-auto'>
        <Card className='shadow-lg'>
          <CardHeader>
            <CardTitle className='text-2xl'>List of Startup Tokens</CardTitle>
            <CardDescription>
              Discover innovative startup tokens and their potential.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Render Token list here */}
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
      </div>
    </div>
  );
}
