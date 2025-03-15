"use client";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { createDocument } from "@/lib/actions/room.actions";
import { useRouter } from "next/navigation";

const AddDocumentBtn = ({ userId, email }: AddDocumentBtnProps) => {
    const router = useRouter()

    const addDocumentsHandler = async () => {
        try {
            const room = await createDocument({userId , email})

            if(room) router.push(`/documents/${room.id}`)

        } catch (error) {
          console.log(error)  
        }
    }
  return (
    <Button
      className="bg-gradient-to-t from-blue-500 to-blue-400 flex gap-1 shadow-md cursor-pointer"
      type="submit"
      onClick={addDocumentsHandler}
    >
      <Image
        src={"/assets/icons/add.svg"}
        alt="addDocuments"
        width={24}
        height={24}
      />
      <p className="hidden sm:block">Start a blank Documents</p>
    </Button>
  );
};

export default AddDocumentBtn;
