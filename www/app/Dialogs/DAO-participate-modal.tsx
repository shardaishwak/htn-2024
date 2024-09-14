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

export default function DAOParticipant() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handler for confirming DAO participation
  const handleConfirm = () => {
    console.log('User confirmed joining the DAO');
    setIsDialogOpen(false); // Close the dialog after confirmation
  };

  // Handler for canceling the action
  const handleCancel = () => {
    setIsDialogOpen(false); // Close the dialog when canceled
  };

  return (
    <div>
      <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
        Join DAO
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white dark:bg-gray-800 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm DAO Participation</DialogTitle>
            <DialogDescription>
              Are you sure you want to join this DAO? This action will register you as a participant.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleConfirm}>
              Confirm
            </Button>
            <Button variant="destructive" onClick={handleCancel}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
