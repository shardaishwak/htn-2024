'use client'
import React from 'react'
import TokenCreationDialog from './create-token-modal'
import DAOParticipant from './DAO-participate-modal'
import ProposalCreationDialog from './create-proposal-modal'
import InvestmentConfirmationDialog from './DAO-invest-modal'
import ApprovalDialog from './approve-proposition-modal'
import RejectionDialog from './reject-proposal-modal'
import VoteDialog from './vote'
import { ThemeProvider } from "./theme-provider"
import { ModeToggle } from "./ModeToggle"

// Define the Proposition type
interface Proposition {
  name: string;
  description: string;
  tokensAvailable: number;
}

export default function Demo() {
  // Proposition object needs to be declared before the return
  const proposition = {
    name: 'Decentralized Startup Fund',
    description: 'A platform to fund and support decentralized startups.',
    tokensAvailable: 500
  };

  const closeDialog = () => {
    console.log('Dialog confirmed');
  };

  return (
    <div className="space-y-4">
      <ThemeProvider>
        <div className="flex justify-between items-center mb-4">
          <h2>Dialog Demos</h2>
          <ModeToggle /> {/* Add the ModeToggle component */}
        </div>

        {/* Render TokenCreationDialog component */}
        <TokenCreationDialog />

        {/* Render DAOParticipant component */}
        <DAOParticipant />

        {/* Render ProposalCreationDialog component */}
        <ProposalCreationDialog />

        {/* Render InvestmentConfirmationDialog component */}
        <InvestmentConfirmationDialog />

        {/* Render ApprovalDialog component */}
        <ApprovalDialog onConfirm={closeDialog} />

        {/* Render RejectionDialog component */}
        <RejectionDialog onConfirm={closeDialog} />

        {/* Render VoteDialog component */}
        <VoteDialog proposition={proposition} />
      </ThemeProvider>
    </div>
  )
}
