import AddDocumentBtn from "@/components/AddDocumentBtn";
import Header from "@/components/Header";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const page = () => {
  const documents = [];
  return (
    <main className=" relative flex min-h-screen w-full flex-col items-center gap-5 sm:gap-10">
      <Header className="sticky left-0 right-0 flex justify-between">
        <div className="flex items-center gap-2">
          Notifications
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>
      {documents.length>0 ? (
        <div>

        </div>
      ): (
        <div>
          <Image
          src={"/assets/icons/docs.svg"}
          alt="docs"
          height={40}
          width={40}
          />
          <AddDocumentBtn/>
        </div>
      )}
    </main>
  );
};

export default page;
