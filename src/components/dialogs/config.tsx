"use client";

import { toast } from "sonner";

import { Button } from "~/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/dialog";
import { Input } from "~/input";
import { Label } from "~/label";
// import { Textarea } from "~/textarea";

type TConfigProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  competitionID: string;
  setCompetitionID: (id: string) => void;
};

export function Config({
  open,
  onOpenChange,
  competitionID,
  setCompetitionID,
}: TConfigProps) {
  function handleConfigSave() {
    try {
      localStorage.setItem("competitionID", competitionID);
      onOpenChange(false);
      toast.success("Configuration saved successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save configuration");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Form Configuration</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center gap-4">
            <Label className="w-full">Competition ID</Label>
            <Input
              value={competitionID}
              onChange={(e) => setCompetitionID(e.target.value)}
              placeholder="Enter Competition ID (from your Brain)"
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
