"use client";
import Image from "next/image";
import React, { useState } from "react";

type ProductProps = {
  product: {
    id: string;
    name: string;
    description: string | null;
    price: number;
  };
  user: {
    name: string;
    email: string;
    favoriteIds: string[];
  };
};

export default function ProductCard({ product, user }: ProductProps) {
  const [isFaved, setIsFaved] = useState(
    user.favoriteIds.includes(product.id) ? true : false,
  );

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
      <Image  />
      <p>{product.name}</p>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <button
        onClick={() => {
          handleFav(product.id);
        }}
      >{isFaved ? "Faved" : "not faved :("}</button>
    </div>
  );
}
