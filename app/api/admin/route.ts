import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/options"
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  console.log(session);
  

  if (!session) {
    return NextResponse.json({ message: "Not authorized" });
  }

  if (req.method === "GET") {
    try {
      const products = await prisma.product.findMany()
      return NextResponse.json(products, {status: 200})
    } catch (error) {
      console.log(error)
      return NextResponse.json({ message: "Error fetching product" });
    }
  }

  if (req.method === "POST") {
    const { name, description, price } = req.body
    try {
      const product = await prisma.product.create({
        data: { name, description, price }
      })
      return res.status(201).json(product)
    } catch (error) {
      console.log(error)
      return NextResponse.json({ message: "Error deleting product" });
    }
  }

  if (req.method === "PUT") {
    const { id, name, description, price } = req.body
    try {
      const product = await prisma.product.update({
        where: { id },
        data: { name, description, price }
      })
      return res.status(200).json(product)
    } catch (error) {
      console.log(error);      
      return NextResponse.json({ message: "Error updating product" });
    }
  }

  if (req.method === "DELETE") {
    const { id } = req.body
    try {
      await prisma.product.delete({ where: { id } })
      return NextResponse.json({ message: "Product deleted" });
    } catch (error) {
      console.log(error);      
      return NextResponse.json({ message: "Error deleting product" });
    }
  }

}