"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type CardProps = {
  product: {
    id: string;
    name: string;
    description: string | null;
    price: number;
  };
};

export default function EditProductForm({ product }: CardProps) {
  const [productInfo, setProductInfo] = useState({
    name: product.name,
    description: product.description ? product.description : null,
    price: product.price,
  });

  const handleChange = (inputName: string, value: string) => {
    setProductInfo((prev) => ({ ...prev, [inputName]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!productInfo.name || !productInfo.price) {
      return;
    }

    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productInfo }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Edit Product Info</h2>
      <form
        className="flex flex-col gap-2 bg-slate-400 p-10"
        action=""
        onSubmit={handleSubmit}
      >
        <input
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          type="text"
          value={productInfo.name}
          name="name"
        />
        <input
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          type="text"
          value={productInfo.description || ""}
          name="description"
        />
        <input
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          type="number"
          value={productInfo.price}
          min={0}
          max={1000}
          name="price"
        />

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
