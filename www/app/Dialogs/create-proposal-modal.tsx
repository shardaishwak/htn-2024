'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import React, { useState } from 'react'

export default function ProposalCreationDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handler for confirming proposal creation
  const handleConfirm = () => {
    console.log('Proposal creation confirmed');
    setIsDialogOpen(false); // Close the dialog after confirmation
  };

  // Handler for canceling the action
  const handleCancel = () => {
    setIsDialogOpen(false); // Close the dialog when canceled
  };

  return (
    <div>
      {/* Button that triggers the dialog */}
      <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
        Create Proposal
      </Button>

      {/* Dialog component */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white dark:bg-gray-800 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Proposal Creation</DialogTitle>
            <DialogDescription>
              Are you sure you want to create a new proposal? This action will submit your proposal for review.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            {/* Confirm Button */}
            <Button variant="outline" onClick={handleConfirm}>
              Confirm
            </Button>
            {/* Cancel Button */}
            <Button variant="destructive" onClick={handleCancel}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
