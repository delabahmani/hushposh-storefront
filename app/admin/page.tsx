import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import AdminProductCard from "@/components/AdminProductCard";

export default async function () {
  const session = await getServerSession(authOptions);

  if (session?.user?.email != process.env.ADMIN_EMAIL || !session) {
    redirect('/')
  }

  let products;

  try {
    products = await prisma.product.findMany();
  } catch (error) {
    console.log(error);
  }

  return <div>
    {products?.map((itemInProducts) => {
      return <AdminProductCard product={itemInProducts}/>
    })}
  </div>;
}
