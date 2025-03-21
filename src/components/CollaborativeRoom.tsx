"use client";
import { ClientSideSuspense, RoomProvider } from "@liveblocks/react";
import { Editor } from "@/components/editor/Editor";
import Header from "@/components/Header";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import ActiveCollaborator from "./ActiveCollaborator";
import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import Image from "next/image";
import { updateDocumentTitle } from "@/lib/actions/room.actions";
import Loader from "./Loader";
import ShareModal from "./ShareModal";

// Define CollaborativeRoomProps if not already defined
interface CollaborativeRoomProps {
  roomId: string;
  roomMetadata: { title: string };
  users?: any; // Replace `any` with the correct type if needed
  currentUserType: "editor" | "viewer"; // Assuming these are the possible values
}

const CollaborativeRoom = ({
  roomId,
  roomMetadata,
  users,
  currentUserType,
}: CollaborativeRoomProps) => {
  const [documentTitle, setDocumentTitle] = useState(roomMetadata.title);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateTitleHandler = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      setLoading(true);

      try {
        if (documentTitle !== roomMetadata.title) {
          const updateTitle = await updateDocumentTitle(roomId, documentTitle);

          if (updateTitle) {
            setEditing(false);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setEditing(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <div className="flex size-full max-h-screen flex-1 flex-col items-center overflow-hidden">
          <Header>
            <div className="flex w-full items-center justify-between">
              <div
                ref={containerRef}
                className="flex flex-1 items-center justify-center gap-2"
              >
                {editing && !loading ? (
                  <Input
                    type="text"
                    value={documentTitle}
                    ref={inputRef}
                    placeholder="Enter title"
                    onChange={(e) => setDocumentTitle(e.target.value)}
                    onKeyDown={updateTitleHandler}
                    disabled={!editing}
                    className="min-w-[78px] flex-1 border-none bg-transparent px-0 text-center text-base font-semibold leading-[24px] focus-visible:ring-0 focus-visible:ring-offset-0 disabled:text-black sm:text-xl"
                  />
                ) : (
                  <>
                    <p className="line-clamp-1 text-center text-base font-semibold leading-[24px] sm:text-xl">
                      {documentTitle}
                    </p>
                  </>
                )}

                {currentUserType === "editor" && !editing && (
                  <Image
                    src={"/assets/icons/edit.svg"}
                    alt="edit"
                    width={24}
                    height={24}
                    onClick={() => setEditing(true)}
                    className="cursor-pointer"
                  />
                )}

                {currentUserType !== "editor" && !editing && (
                  <p className="rounded-md bg-dark-400/50 px-2 py-0.5 text-xs text-blue-100/50">
                    View only
                  </p>
                )}

                {loading && <p className="text-sm text-gray-400">saving..</p>}
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <ActiveCollaborator />
                <ShareModal
                  roomId={roomId}
                  collaborators={users}
                  creatorId={roomMetadata.creatorId}
                  currentUserType={currentUserType}
                />
                <SignedOut>
                  <SignInButton />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
          </Header>
          <Editor roomId={roomId} currentUserType={currentUserType} />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
