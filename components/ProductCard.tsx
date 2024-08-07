"use client";

import { User } from "@/types";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  };
  return (
    <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-offwhite shadow-lg">
      <div className="px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-black">
          {product.name}
        </h5>
      </div>

      <div>
      {product.imageUrl ? (
        <div>
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={150}
            height={150}
            className="rounded-md object-center flex"
          />
        </div>
      ) : (
        <div>
        <Image
          src={"/assets/thumbnail-placeholder.png"}
          alt="No image available"
          width={150}
          height={150}
          className="rounded-md  object-center flex"
        />
        </div>
      )}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-black">
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
