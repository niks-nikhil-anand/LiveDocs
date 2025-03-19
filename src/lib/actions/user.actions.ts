"use server";
import { clerkClient } from "@clerk/nextjs/server";
import { parseStringify } from "../utils";
import { liveblocks } from "../liveblocks";

export const getClerkUsers = async ({ userIds }: { userIds: string[] }) => {
  try {
    const clerk = await clerkClient();
    // Fetch the list of users based on the provided email addresses
    const usersResponse = await clerk.users.getUserList({
      emailAddress: userIds,
    });

    // Extract users from response
    const users = usersResponse.data;

    // Map the users to the desired format
    const mappedUsers = users.map((user: any) => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.emailAddresses[0]?.emailAddress || "",
      avatar: user.imageUrl,
    }));

    // Sort the users based on the order of userIds
    const sortedUsers = userIds.map((email) =>
      mappedUsers.find((user: any) => user.email === email)
    );

    // Return the sorted users as a JSON string
    return parseStringify(sortedUsers);
  } catch (error) {
    console.error(`Error fetching the users: ${error}`);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};

export const getDocumentUser = async ({
  roomId,
  currentUser,
  text,
}: {
  roomId: string;
  currentUser: string;
  text: string;
}) => {
  try {
    const room = await liveblocks.getRoom(roomId);
    const users = Object.keys(room.usersAccesses).filter(
      (email) => email !== currentUser
    );

    if (text.length) {
      text = text.toLowerCase();

      const filteredUser = users.filter((email: string) =>
        email.toLowerCase().includes(text)
      );

      return parseStringify(filteredUser);
    } else {
      // Return all users except the current user if no text is provided
      return parseStringify(users);
    }
  } catch (error) {
    console.log(`Error fetching document's user: ${error}`);
    return parseStringify([]); // Return an empty array in case of error
  }
};
