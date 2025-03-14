import { Editor } from "@/components/editor/Editor";
import Header from "@/components/Header";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import React from "react";

const Document = () => {
  return (
    <div>
      <Header>
        <div className="flex items-center justify-center gap-2">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
        <p className="text-white font-bold text-lg cursor-pointer">Share</p>
          <UserButton />
        </SignedIn>
        </div>
      </Header>
      <Editor />
    </div>
  );
};

export default Document;
