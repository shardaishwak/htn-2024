// tokenConfirmation.tsx
'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import React, { useState } from 'react'

export default function TokenCreationDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleConfirm = () => {
    console.log('Token creation confirmed');
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
        Create Token
      </Button>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Token Creation</DialogTitle>
            <DialogDescription>
              Are you sure you want to create a new token? This action will generate a token that can be used for [specific purpose].
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleConfirm}>Confirm</Button>
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}