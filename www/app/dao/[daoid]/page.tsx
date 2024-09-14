'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import VoteDialog from '@/app/Dialogs/vote'

// Define the Proposition type
interface Proposition {
  name: string;
  description: string;
  tokensAvailable: number;
}

const DaoPage = () => {
    // Proposition object needs to be declared before the return
    const proposition = {
      name: 'Decentralized Startup Fund',
      description: 'A platform to fund and support decentralized startups.',
      tokensAvailable: 500
    };
    const params = useParams()
    const { id } = params

    return (
      <div>
        {/* Fetch and display DAO details based on the id */}

        {/* Render VoteDialog component */}
        <VoteDialog proposition={proposition} />
      </div>
    )
}

export default DaoPage
