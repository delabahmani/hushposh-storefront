import { NextApiRequest } from "next";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(req: Request) {
  const { name, description, price } = await req.json();
  try {
    const postProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
      },
    });

    return NextResponse.json(postProduct);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Could not post!" });
  }
}

export async function GET(req: Request) {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error receiving data" });
  }
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  const { id } = await req.json();

  try {
    const getFav = await prisma.user.findUnique({
      where: { email: session?.user?.email as string },
      select: { favoriteIds: true },
    });

    if (getFav?.favoriteIds.includes(id) === false) {
      const updateFav = await prisma.user.update({
        where: { email: session?.user?.email as string },
        data: {
          favoriteIds: {
            push: id,
          },
        },
      });
      return NextResponse.json(updateFav);
    }

    if (getFav?.favoriteIds.includes(id)) {
      const updatedFavIds = getFav.favoriteIds.filter((favId) => favId !== id);
      const updateFav = await prisma.user.update({
        where: { email: session?.user?.email as string },
        data: {
          favoriteIds: updatedFavIds,
        },
      });
      return NextResponse.json(updateFav);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Could not update" });
  }
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  try {
    const deleteProduct = await prisma.product.delete({
      where: { id },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Could not delete product!" });
  }
}
