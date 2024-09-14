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

interface RejectionDialogProps {
  onConfirm: () => void;
}

export default function RejectionDialog({ onConfirm }: RejectionDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleReject = () => {
    if (typeof onConfirm === 'function') {
      onConfirm(); // Call the onConfirm function
    }
    setIsDialogOpen(false); // Close the dialog after rejection
  };

  const handleCancel = () => {
    setIsDialogOpen(false); // Close the dialog when canceled
  };

  return (
    <div>
      <Button variant="destructive" onClick={() => setIsDialogOpen(true)}>
        Reject Proposition
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white dark:bg-gray-800 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Proposition Rejection</DialogTitle>
            <DialogDescription>
              Are you sure you want to reject this proposition? This action will finalize your rejection.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleReject}>
              Reject
            </Button>
            <Button variant="destructive" onClick={handleCancel}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
