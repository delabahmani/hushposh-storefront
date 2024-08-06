import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import AdminProductCard from "@/components/AdminProductCard";
import Link from "next/link";

export default async function () {
  const session = await getServerSession(authOptions);

  if (session?.user?.email != process.env.ADMIN_EMAIL || !session) {
    redirect("/");
  }

  let products;

  try {
    products = await prisma.product.findMany();
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Link href="/admin/create-post" className="btn mb-4 mr-6 hidden items-center gap-2 md:flex">
        {" "}
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </span>
        <span>Create New</span>
      </Link>
      {products?.map((itemInProducts) => {
        return <AdminProductCard product={itemInProducts} />;
      })}
    </div>
  );
}
