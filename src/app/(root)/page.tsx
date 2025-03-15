import AddDocumentBtn from "@/components/AddDocumentBtn";
import Header from "@/components/Header";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const Home =  async () => {
  const documents = [];
  const clerkUser = await currentUser();
  if(!clerkUser) redirect("/sign-in");
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
        <div className="flex flex-col items-center mb-10 w-full gap-10 px-5">

        </div>
      ): (
        <div className="flex w-full max-w-[730px] flex-col items-center justify-center gap-5 rounded-lg bg-dark-200 px-10 py-8">
          <Image
          src={"/assets/icons/doc.svg"}
          alt="docs"
          height={40}
          width={40}
          />
          <AddDocumentBtn
          userId = {clerkUser.id}
          email = {clerkUser.emailAddresses[0].emailAddress}
          />
        </div>
      )}
    </main>
  );
};

export default Home;
