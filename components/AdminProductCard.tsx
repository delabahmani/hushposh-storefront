"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";

type ProductProps = {
  product: {
    id: string;
    name: string;
    description: string | null;
    price: number;
    imageUrl: string | null;
  };
};

export default function AdminProductCard({ product }: ProductProps) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?",
    );

    if (confirmed) {
      try {
        const res = await fetch(`/api/products/${product.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          console.log("Product Deleted!!");
        }
      } catch (error) {}
    }
  };

  return (
    <div className="flex w-full max-w-sm flex-col rounded-lg border border-gray-200 bg-lightgray shadow-lg">
      <div className="px-3 py-4 pb-3">
        <h5 className="text-xl font-semibold tracking-tight text-black">
          {product.name}
        </h5>
      </div>

      <span className="mx-auto mb-4 w-[80%] border-b-[1px] border-b-offwhite border-opacity-40 shadow"></span>

      <div className="mx-auto flex">
        {product.imageUrl ? (
          <div>
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={150}
              height={150}
              className="flex w-full rounded-md object-center"
            />
          </div>
        ) : (
          <div className="relative aspect-square h-[250px] w-[250px]">
            <Image
              src={"/assets/image-not-available.jpg"}
              alt="No image available"
              fill
              className="flex h-60 w-full rounded-md object-cover"
            />
          </div>
        )}
      </div>

      <span className="mx-auto mt-5 w-[80%] border-b-[1px] border-b-offwhite border-opacity-40 shadow"></span>

      <div className="flex items-center justify-center gap-10 py-5">
        <button
          onClick={() => router.push(`/admin/${product.id}`)}
          className="btn-accent flex items-center justify-center gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="btn-accent flex items-center justify-center gap-[3px]"
        >
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
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
}
