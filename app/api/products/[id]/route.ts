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
  const { productInfo, imageUrl } = await req.json();

  try {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: productInfo.name,
        description: productInfo.description || null,
        price: productInfo.price,
        imageUrl,
      },
    });
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = params;

  try {
    const product = await prisma.product.delete({ where: { id } });
    return NextResponse.json(product);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error deleting product!" });
  }
}
