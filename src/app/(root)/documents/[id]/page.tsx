
import CollaborativeRoom from "@/components/CollaborativeRoom";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const Document = () => {
  const clerkUser = currentUser();
  if(!clerkUser) redirect("/sign-in");
  return (
    <main className="flex w-full items-center flex-col">
     <CollaborativeRoom/>
    </main>
  );
};

export default Document;
