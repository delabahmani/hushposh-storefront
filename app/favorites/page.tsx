import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import ProductCard from "@/components/ProductCard";
import { Product, User } from "@/types";

export default async function Favorites() {
  const session = await getServerSession(authOptions);
  let user: User | null;
  let products;

  try {
   user = await prisma.user.findUnique({
      where: { email: session?.user?.email as string },

    }) as User | null;
    products = await prisma.product.findMany();
  } catch (error) {

  }

  return (
    <div>
      {products
        ?.filter((product) => user?.favoriteIds.includes(product.id) == true)
        .map((i) => <ProductCard product={i} user={user} key={i.id} />)}
    </div>
  );
}
