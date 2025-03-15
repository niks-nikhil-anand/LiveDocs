import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { SignedIn, UserButton } from "@clerk/nextjs";
import React from "react";

const page = () => {
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
    </main>
  );
};

export default page;
