"use client";

import { useState } from "react";

import { Settings } from "lucide-react";

import { Button } from "~/button";
import { Input } from "~/input";
import { Label } from "~/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/dialog";

export function Setter() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="secondary"
        size="icon"
        className="fixed bottom-24 right-10 rounded-full shadow-xl z-50"
        onClick={() => setOpen(true)}
      >
        <Settings />
      </Button>

      <SettingModal open={open} onOpenChange={setOpen} />
    </>
  );
}

function SettingModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [competitionID, setCompetitionID] = useState<number>(1);

  function handleConfigSave() {
    if (competitionID > 0) {
      localStorage.setItem("competitionID", competitionID.toString());
      console.log(localStorage.getItem("competitionID"));
      onOpenChange(false);
      window.location.reload(); 
    } else {
      alert("Please enter a valid competition ID");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Competition Id Configuration
          </DialogTitle>
          <DialogDescription className="tracking-wide font-sans">
            Change Competition Id
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center gap-4">
            <Label className="w-full">Competition ID</Label>
            <Input
              type="number"
              value={competitionID}
              onChange={(e) => setCompetitionID(Number(e.target.value))}
              placeholder="Enter Competition ID (numeric)"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <Button onClick={handleConfigSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}