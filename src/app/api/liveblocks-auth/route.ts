import { liveblocks } from "@/lib/liveblocks";
import { currentUser } from "@clerk/nextjs/server";
import { info } from "console";
import { redirect } from "next/navigation";



export async function POST(request: Request) {
  // Get the current user from your database
  const clerkUser = await currentUser();

  if(!clerkUser) redirect("/sign-in");

  const {id, firstName , lastName , emailAddresses , imageUrl } = clerkUser
  const user = {
    id, 
    info:{
        id , 
        name : `${firstName} ${lastName}`,
        email : emailAddresses[0].emailAddress,
        avatar: imageUrl
    }
  }

  // Start an auth session inside your endpoint
  const session = liveblocks.prepareSession(
    user.id,
    { userInfo: user.metadata } // Optional
  );

  // Use a naming pattern to allow access to rooms with wildcards
  // Giving the user read access on their org, and write access on their group
  session.allow(`${user.organization}:*`, session.READ_ACCESS);
  session.allow(`${user.organization}:${user.group}:*`, session.FULL_ACCESS);

  // Authorize the user and return the result
  const { status, body } = await session.authorize();
  return new Response(body, { status });
}