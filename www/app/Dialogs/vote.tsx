'use client'
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ApprovalDialog from './approve-proposition-modal';
import RejectionDialog from './reject-proposal-modal';

// Define the Proposition type
interface Proposition {
  name: string;
  description: string;
  tokensAvailable: number;
}

// VoteDialog component
const VoteDialog = ({ proposition }: { proposition: Proposition }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <div>
      {/* Button to open the vote dialog */}
      <Button variant="outline" onClick={openDialog}>
        Vote on Proposition
      </Button>

      {/* Vote Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white dark:bg-gray-800 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Vote on Proposition</DialogTitle>
            <DialogDescription>
              Review the details and make your decision.
            </DialogDescription>
          </DialogHeader>
          <div className="mb-4">
            {/* Proposition Details */}
            <p className="mb-2">
              <strong>Project Name:</strong> {proposition.name}
            </p>
            <p className="mb-2">
              <strong>Description:</strong> {proposition.description}
            </p>
            <p className="mb-2">
              <strong>Tokens Available:</strong> {proposition.tokensAvailable}
            </p>
          </div>
          <DialogFooter>
            {/* Approval and Rejection Buttons */}
            <div className="flex justify-between w-full">
              <ApprovalDialog onConfirm={closeDialog} />
              <RejectionDialog onConfirm={closeDialog} />
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VoteDialog;
