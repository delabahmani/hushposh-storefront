
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  let session = getServerSession(authOptions);
  const { productInfo } = await req.json();

  try {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: productInfo.name,
        description: productInfo.description || null,
        price: productInfo.price,
      },
    });
    return NextResponse.json(updatedProduct)
  } catch (error) {
    console.log(error);
    
  }
}
