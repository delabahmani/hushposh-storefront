import Carousel from "@/components/Carousel";
import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "./api/auth/[...nextauth]/options";
import { User } from "@/types";
import Container from "@/components/Container";
import Link from "next/link";

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
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Container>
        <div className="relative">
          <Image
            src={"/assets/hero-img2.png"}
            width={2000}
            height={2000}
            className=""
            alt="gift box"
          />
          <h1 className="absolute left-1/2 top-[70%] -translate-x-1/2 -translate-y-1/2 transform text-4xl font-bold uppercase text-offwhite">
            the gift of giving
          </h1>
        

        <div className="absolute left-1/2 top-[75%] -translate-x-1/2 -translate-y-1/2 transform">
          <Link href="/products">
            <button className="hover:bg-coral-dark rounded bg-coral px-4 py-2 font-bold text-white shadow-lg transition-colors">
              Shop Now
            </button>
          </Link>
        </div>
        </div>

        <div>
          <Carousel products={products} user={user} />
        </div>
      </Container>
    </main>
  );
}
