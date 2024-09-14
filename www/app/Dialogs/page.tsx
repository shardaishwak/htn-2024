'use client'
import React from 'react'
import TokenCreationDialog from './tokenConfirmation'
import DAOParticipant from './DAOParticipantConfirmation'
import ProposalCreationDialog from './proposalConfirmation'
import InvestmentConfirmationDialog from './DAOInvestConfirmation'
import ApprovalDialog from './ApprovePropositionConfirmation'
import RejectionDialog from './RejectPropositionConfirmation'

export default function Demo() {
  return (
    <div className="space-y-4">
      <h2>Dialog Demos</h2>

      {/* Render TokenCreationDialog component */}
      <TokenCreationDialog />

      {/* Render DAOParticipant component */}
      <DAOParticipant />
      
      {/* Render ProposalCreationDialog component */}
      <ProposalCreationDialog />

      {/* Render InvestmentConfirmationDialog component */}
      <InvestmentConfirmationDialog />

      {/* Render ApprovalDialog component */}
      <ApprovalDialog />

      {/* Render RejectionDialog component */}
      <RejectionDialog />

    </div>
  )
}