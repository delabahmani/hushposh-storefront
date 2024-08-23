import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import ProductCard from "@/components/ProductCard";
import { Product, User } from "@/types";
import Container from "@/components/Container";

export default async function Favorites() {
  const session = await getServerSession(authOptions);
  let user: User | null;
  let products;

  try {
    user = (await prisma.user.findUnique({
      where: { email: session?.user?.email as string },
    })) as User | null;
    products = await prisma.product.findMany();
  } catch (error) {}

  return (
    <div>
      <Container>
        <span>
          <h1 className="py-6 text-center text-3xl">My Faves</h1>
        </span>
        <div className="grid gap-10 md:grid-cols-3">
          {products
            ?.filter(
              (product) => user?.favoriteIds.includes(product.id) == true,
            )
            .map((i) => <ProductCard product={i} user={user} key={i.id} />)}
        </div>
      </Container>
    </div>
  );
}
