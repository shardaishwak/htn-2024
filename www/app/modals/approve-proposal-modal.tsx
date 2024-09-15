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

interface ApprovalDialogProps {
  onConfirm: () => void;
}

export default function ApproveProposalModal({ onConfirm }: ApprovalDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleApprove = () => {
    if (typeof onConfirm === 'function') {
      onConfirm(); // Call the onConfirm function
    }
    setIsDialogOpen(false); // Close the dialog after approval
  };

  const handleCancel = () => {
    setIsDialogOpen(false); // Close the dialog when canceled
  };

  return (
    <div>
      <Button className='bg-black text-white' onClick={() => setIsDialogOpen(true) }>
        Approve
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white dark:bg-gray-800 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Proposition Approval</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve this proposition? This action will finalize your approval.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleApprove}>
              Approve
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
