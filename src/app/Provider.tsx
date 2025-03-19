"use client";
import React, { ReactNode } from "react";
import {
  LiveblocksProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import Loader from "@/components/Loader";
import { getClerkUsers, getDocumentUser } from "@/lib/actions/user.actions";
import { useUser } from "@clerk/nextjs";

const Provider = ({ children }: { children: ReactNode }) => {
  const { user: clerkUser } = useUser();

  return (
    <LiveblocksProvider
      authEndpoint={"/api/liveblocks-auth"}
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUsers({ userIds });
        return users;
      }}
      resolveMentionSuggestions={async ({ roomId, text }) => {
        if (!clerkUser) return [];
        return await getDocumentUser({
          roomId,
          currentUser: clerkUser.emailAddresses[0]?.emailAddress || "",
          text,
        });
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>
        {() => children}
      </ClientSideSuspense>
    </LiveblocksProvider>
  );
};

export default Provider;