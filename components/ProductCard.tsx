"use client";

import { User } from "@/types";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";

type ProductProps = {
  product: {
    id: string;
    name: string;
    description: string | null;
    price: number;
    imageUrl: string | null;
  };
  user: User | null;
};

export default function ProductCard({ product, user }: ProductProps) {
  const [isFaved, setIsFaved] = useState(
    user?.favoriteIds.includes(product.id) ? true : false,
  );
  const router = useRouter();

  const handleFav = async (id: string) => {
    if (!user) {
      redirect("/sign-in");
    }
    if (user) {
      try {
        const res = await fetch("/api/products", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });

        if (res.ok) {
          setIsFaved(!isFaved);
          router.refresh();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="flex w-full max-w-sm flex-col rounded-lg border border-gray-200 bg-lightgray shadow-lg">
      <Link href={`/products/${product.id}`} className="flex-grow cursor-pointer">
        <div className="px-3 py-4 pb-3">
          <h5 className="h-16 overflow-hidden text-2xl font-semibold tracking-tight text-black">
            {product.name}
          </h5>
        </div>
        </Link>
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
     
      <div className="my-3 flex justify-between mx-3">
        <span className="text-lg font-bold text-black ">
          {formatPrice(product.price)}
        </span>
        
        <button
          onClick={() => {
            handleFav(product.id);
          }}
        >
          {isFaved ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 fill-coral"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          ) : (
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
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          )}
        </button>
      </div>

      {/* <p>{product.description}</p> */}
    </div>
  );
}
