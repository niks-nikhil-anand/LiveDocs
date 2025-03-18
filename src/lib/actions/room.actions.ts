"use server";
import { nanoid } from "nanoid";
import { liveblocks } from "../liveblocks";
import { revalidatePath } from "next/cache";
import { parseStringify } from "../utils";

export const createDocument = async ({
  userId,
  email,
}: CreateDocumentParams) => {
  const roomId = nanoid();
  try {
    const metadata = {
      creatorId: userId,
      email,
      title: "untitled",
    };

    const usersAccesses: RoomAccesses = {
      [email]: ["room:write"],
    };

    const room = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses,
      defaultAccesses: ["room:write"],
    });

    revalidatePath("/");

    return parseStringify(room);
  } catch (error) {
    console.log(`Error while creating Room ${error}`);
    throw new Error(`Error while creating Room: ${error}`);
  }
};

export const getDocument = async ({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}) => {
  try {
    const room = await liveblocks.getRoom(roomId);
    const hasAccess = Object.keys(room.usersAccesses).includes(userId);

    if (!hasAccess) {
      throw new Error("You do not have access to this room");
    }

    return parseStringify(room);
  } catch (error) {
    console.log(`Error happend while getting the room ${error}`);
  }
};


export const updateDocumentTitle = async (roomId: string, title: string) => {
  try {
    // Update the room metadata with the new title
    const updatedRoom = await liveblocks.updateRoom(roomId, {
      metadata: {
        title,
      },
    });

    // Revalidate the path to ensure the UI reflects the changes
    revalidatePath(`/documents/${roomId}`);

    // Return the updated room data
    return parseStringify(updatedRoom);
  } catch (error) {
    console.error("Error happened while updating the title of the document:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

export const getDocuments = async (email: string) => {
  try {
    const rooms = await liveblocks.getRooms({userId:email});

    return parseStringify(rooms);
  } catch (error) {
    console.log(`Error happend while getting  rooms ${error}`);
  }
};
