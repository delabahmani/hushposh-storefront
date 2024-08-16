import prisma from "@/lib/prismadb";
import ActiveProductCard from "@/components/ActiveProductCard";
import { User } from "@/types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

type Props = {
  params: {
    id: string;
  };
};

export default async function ActiveProduct({ params }: Props) {
  const session = await getServerSession(authOptions);
  const { id } = params;
  let product: any = null;
  let user: User | null = null;
  try {
   user = (await prisma.user.findUnique({
      where: { email: session?.user?.email as string },
    })) as User | null;

    product = await prisma.product.findUnique({
      where: { id },
    });
  } catch (error) {
    console.log(error);
  }

  if (!product) {
    return <>Product Not Found</>;
  }

  return (
    <div>
      <h1>Product ID: {id}</h1>
      <div>
        <ActiveProductCard product={product} user={user} key={product.id} />
      </div>
    </div>
  );
}
