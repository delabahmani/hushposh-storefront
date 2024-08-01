"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

type ProductProps = {
  product: {
    id: string;
    name: string;
    description: string | null;
    price: number;
  };
};

export default function AdminProductCard({ product }: ProductProps) {

  const router = useRouter()

  const handleFav = async (id: string) => {
    try {
      const res = await fetch("/api/products", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <p>{product.name}</p>
      <p>{product.description}</p>
      <p>{product.price}</p>

      <div className="flex items-center">
        <button onClick={() => router.push(`/admin/${product.id}`)}>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
}
