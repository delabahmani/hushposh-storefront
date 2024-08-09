import React, { useState } from "react";
import ProductCard from "@/components/ProductCard";
import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";

const ProductsPage: React.FC = async () => {
  const session = await getServerSession(authOptions);

  let products;
  let user: any;

  try {
    products = await prisma.product.findMany();

    user = await prisma.user.findUnique({
      where: { email: session?.user?.email as string },
      select: { name: true, email: true, favoriteIds: true },
    });
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="grid grid-cols-3 gap-10">
      {products?.map((product) => (
        <ProductCard product={product} key={product.id} user={user} />
      ))}
    </div>
  );
};

export default ProductsPage;
