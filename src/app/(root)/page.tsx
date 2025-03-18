import AddDocumentBtn from "@/components/AddDocumentBtn";
import Header from "@/components/Header";
import { getDocuments } from "@/lib/actions/room.actions";
import { dateConverter } from "@/lib/utils";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const Home = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");


  let roomDocuments;
  try {
    roomDocuments = await getDocuments(clerkUser.emailAddresses[0].emailAddress);
    console.log("Fetched Documents:", roomDocuments);
  } catch (error) {
    console.error("Error fetching documents:", error);
    roomDocuments = { data: [] };
  }
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
      {roomDocuments.data.length > 0 ? (
        <div className="flex flex-col items-center mb-10 w-full gap-10 px-5">
          <div className="max-w-[730px] items-end flex w-full justify-between">
            <h3 className="text-[28px] font-semibold">All Documents</h3>
            <AddDocumentBtn
              userId={clerkUser.id}
              email={clerkUser.emailAddresses[0].emailAddress}
            />
          </div>
          <ul className="flex w-full max-w-[730px] flex-col gap-5">
  {roomDocuments?.data?.length > 0 ? (
    roomDocuments.data.map(({ id, metadata, createdAt }: any) => (
      <li
        key={id}
        className="flex items-center justify-between gap-4 rounded-lg bg-doc bg-cover p-5 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl bg-[#021f51]"
        style={{
          transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Link
          href={`/documents/${id}`}
          className="flex flex-1 items-center gap-4"
        >
          <div className="hidden rounded-md bg-gray-400 p-2 sm:block">
            <Image
              src={"/assets/icons/doc.svg"}
              height={40}
              width={40}
              alt="file"
            />
          </div>

          <div className="space-y-1">
            <p className="text-clamp-1 text-lg">
              {metadata?.title || "Untitled Document"}
            </p>
            <p className="text-sm font-light text-blue-100">
              Created about {dateConverter(createdAt)}
            </p>
          </div>
        </Link>
      </li>
    ))
  ) : (
    <p className="text-center text-gray-500">No documents found.</p>
  )}
</ul>
        </div>
      ) : (
        <div className="flex w-full max-w-[730px] flex-col items-center justify-center gap-5 rounded-lg bg-dark-200 px-10 py-8 bg-[#021f51]">
          <Image
            src={"/assets/icons/doc.svg"}
            alt="docs"
            height={40}
            width={40}
          />
          <AddDocumentBtn
            userId={clerkUser.id}
            email={clerkUser.emailAddresses[0].emailAddress}
          />
        </div>
      )}
    </main>
  );
};

export default Home;
