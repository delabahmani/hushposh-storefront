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
    description: product.description,
    price: product.price,
  });

  const handleChange = (inputName: string, value: string) => {
    setProductInfo((prev) =>
       ({...prev, [inputName]: value}
    ));
  };

  return (
    <div>
      <h2>Edit Product Info</h2>
      <form className="flex flex-col gap-2 bg-slate-400 p-10" action="">
        <input
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          type="text"
          value={productInfo?.name}
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
      </form>
    </div>
  );
}
