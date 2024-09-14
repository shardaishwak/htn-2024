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

export default function RejectionDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handler for confirming the rejection
  const handleReject = () => {
    // Implement proposition rejection logic here
    console.log('Proposition rejected');
    setIsDialogOpen(false); // Close the dialog after rejection
  };

  // Handler for canceling the action
  const handleCancel = () => {
    setIsDialogOpen(false); // Close the dialog when canceled
  };

  return (
    <div>
      {/* Button that triggers the dialog */}
      <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
        Reject Proposition
      </Button>

      {/* Dialog component */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Proposition Rejection</DialogTitle>
            <DialogDescription>
              Are you sure you want to reject this proposition? This action will finalize your rejection.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            {/* Reject Button */}
            <Button variant="outline" onClick={handleReject}>
              Reject
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