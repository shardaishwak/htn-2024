'use client'
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from 'react';

export default function ApprovalDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handler for confirming the approval
  const handleApprove = () => {
    // Implement proposition approval logic here
    console.log('Proposition approved');
    setIsDialogOpen(false); // Close the dialog after approval
  };

  // Handler for canceling the action
  const handleCancel = () => {
    setIsDialogOpen(false); // Close the dialog when canceled
  };

  return (
    <div>
      {/* Button that triggers the dialog */}
      <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
        Approve Proposition
      </Button>

      {/* Dialog component */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Proposition Approval</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve this proposition? This action will finalize your approval.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            {/* Approve Button */}
            <Button variant="outline" onClick={handleApprove}>
              Approve
            </Button>
            {/* Cancel Button */}
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}