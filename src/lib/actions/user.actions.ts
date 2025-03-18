"use server"
import { clerkClient } from "@clerk/nextjs/server";
import { parseStringify } from "../utils";

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
