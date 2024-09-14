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

export default function InvestmentConfirmationDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Dummy variable for the investment amount
  const investmentAmount = 1000; // Hardcoded value for now

  // Handler for confirming the investment
  const handleConfirm = () => {
    // Implement investment logic here
    console.log(`Investment of $${investmentAmount} confirmed`);
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
        Invest into DAO
      </Button>

      {/* Dialog component */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white dark:bg-gray-800 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Investment</DialogTitle>
            <DialogDescription>
              Are you sure you want to invest <strong>${investmentAmount}</strong> into the DAO? This action will finalize your investment.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            {/* Confirm Button with outline variant */}
            <Button variant="outline" onClick={handleConfirm}>
              Confirm
            </Button>
            {/* Cancel Button with outline variant */}
            <Button variant="destructive" onClick={handleCancel}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
