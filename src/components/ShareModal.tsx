"use client";
import { useSelf } from "@liveblocks/react/suspense";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import Image from "next/image";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const ShareModal = ({
  roomId,
  collaborators,
  creatorId,
  currentUserType,
}: ShareDocumentDialogProps) => {
  const user = useSelf();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState<UserType>("viewer");

  const shareDocumentHandler = async () => {};

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          className="cursor-pointer bg-gradient-to-t from-blue-500 to-blue-400 flex h-9 gap-1 px-4 "
          disabled={currentUserType !== "editor"}
        >
          <Image
            src={"/assets/icons/share.svg"}
            alt="share"
            height={20}
            width={20}
            className="min-w-4 md:size-5"
          />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent
        className="w-full max-w-[400px] rounded-xl border-none bg-cover px-5 py-7 shadow-xl sm:min-w-[500px]"
        style={{ backgroundImage: "url(/assets/images/doc.png)" }}
      >
        <DialogHeader>
          <DialogTitle>Manage who can view this project</DialogTitle>
          <DialogDescription>
            Select which users can view and edit this document
          </DialogDescription>
        </DialogHeader>
        <Label htmlFor="email" className="mt-6 text-blue-100">
          Email address
        </Label>
        <div className="flex items-center gap-3">
          <div className="flex flex-1 rounded-md bg-">
            <Input
              id="email"
              value={email}
              placeholder="Enter email address"
              onChange={(e) => setEmail(e.target.value)}
              className=" h-11 flex-1 border-none bg-[#27344D] focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
