import Carousel from "@/components/Carousel";
import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "./api/auth/[...nextauth]/options";
import { User } from "@/types";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  publicId: string | null;
}

export default async function Home() {
  const session = await getServerSession(authOptions);

  let products: Product[] = [];
  let user: User | null = null;

  try {
    products = await prisma.product.findMany();

    if (session?.user?.email) {
      user = (await prisma.user.findUnique({
        where: { email: session.user.email },
      })) as User | null;
    } else {
      user = null;
    }
  } catch (error) {
    console.log(error);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Carousel products={products} user={user} />
      </div>
    </main>
  );
}
