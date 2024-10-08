"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { json } from "@codemirror/lang-json";
import CodeMirror from "@uiw/react-codemirror";
import { useState } from "react";

interface AddJsonDialogProps {
  onSave: (name: string, value: string) => Promise<void>;
}

export const AddJsonDialog = ({ onSave }: AddJsonDialogProps) => {
  const [jsonName, setJsonName] = useState("");
  const [jsonData, setJsonData] = useState("");
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleSave = async () => {
    await onSave(jsonName, jsonData);
    setOpenModal(false);
    setJsonName("");
    setJsonData("");
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger className="outline-none" asChild>
        <Button>Add JSON Data</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>JSON Editor</DialogTitle>
          <DialogDescription>Edit and save your JSON data.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>JSON Name</Label>
            <Input
              value={jsonName}
              onChange={(e) => setJsonName(e.target.value)}
              placeholder="Enter JSON name"
            />
          </div>
          <div className="grid gap-2">
            <Label>JSON Data</Label>
            <CodeMirror
              value={jsonData}
              height="300px"
              extensions={[json()]}
              onChange={(v) => setJsonData(v)}
              className="border shadow-sm"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant={"secondary"}>
                Close
              </Button>
            </DialogClose>
            <Button disabled={!jsonName || !jsonData} onClick={handleSave}>
              Save
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
