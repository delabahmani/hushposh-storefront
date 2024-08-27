import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import AdminProductCard from "@/components/AdminProductCard";
import Link from "next/link";

export default async function AdminDashboard() {
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
      <div className="flex md:justify-between py-4 gap-2 md:gap-10 ">
        <h1 className="text-lg md:text-2xl">Admin Dashboard</h1>
        <Link
          href="/admin/create-post"
          className="btn-primary md:mb-4 md:mr-6 flex items-center gap-2 md:text-base text-sm w-28 "
        >
          {" "}
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="md:size-6 size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </span>
          <p className="text-xs md:text-lg text-center">Create New</p>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {products?.map((itemInProducts) => {
          return <AdminProductCard product={itemInProducts} />;
        })}
      </div>
    </div>
  );
}
