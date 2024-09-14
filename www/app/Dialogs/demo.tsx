'use client'
import React from 'react'
import TokenCreationDialog from './tokenConfirmation'

export default function Demo() {
  return (
    <div className="space-y-4">
      <h2>Dialog Demos</h2>

      {/* Render test Page component */}
      <TokenCreationDialog />
      
      {/* You can add more Dialog components here */}
    </div>
  )
}