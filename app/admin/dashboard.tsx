import { getServerSession } from "next-auth";
import prisma from "@/lib/prismadb";
import { authOptions } from "../api/auth/[...nextauth]/options";

export default async function Admin() {
  const session = await getServerSession(authOptions);
  if (session?.user?.email !== "epurcell98@gmail.com" || !session) {
    redirect("/");
  }

  let posts;

  try {
    posts = await prisma.post.findMany({
      include: { author: true },
    });
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      <h1>Admin Portal</h1>
     
      ))}
    </div>
  );
}
