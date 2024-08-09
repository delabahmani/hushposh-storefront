"use client";

import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";

type CardProps = {
  product: {
    id: string;
    name: string;
    description: string | null;
    price: number;
  };
};

export default function EditProductForm({ product }: CardProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  const router = useRouter();

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
      const errorMessage = "Title and price are required!";
      toast.error(errorMessage);
      return;
    }

    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productInfo, imageUrl }),
      });
      if (res.ok) {
        toast.success("Product edited successfully!");
        router.push("/admin");
        router.refresh();
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageUpload = (result: CloudinaryUploadWidgetResults) => {
    console.log("result: ", result);
    const info = result.info as object;

    if ("secure_url" in info && "public_id" in info) {
      const url = info.secure_url as string;
      const public_id = info.public_id as string;
      setImageUrl(url);
      setPublicId(public_id);
      console.log("url: ", url);
      console.log("public_id: ", public_id);
    }
  };

  const removeImage = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/removeImage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId }),
      });

      if (res.ok) {
        setImageUrl("");
        setPublicId("");
        console.log("image removed successfuly!");
      }
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

        <CldUploadButton
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          className={`relative mt-4 grid h-48 place-items-center rounded-md border-2 border-dotted bg-slate-100 ${imageUrl && "pointer-events-none"}`}
          onSuccess={handleImageUpload}
        >
          <div>
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
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </div>
          {imageUrl && (
            <Image
              src={imageUrl}
              fill
              className="absolute inset-0 object-cover"
              alt={productInfo.name}
            />
          )}
        </CldUploadButton>

        {publicId && (
          <button
            className="mb-4 w-fit rounded-md bg-red-600 px-4 py-2 font-bold text-white transition hover:scale-110"
            onClick={removeImage}
          >
            Remove Image
          </button>
        )}

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
          step={0.01}
          name="price"
          inputMode="decimal"
        />

        <div>
          <button type="submit" className="btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
