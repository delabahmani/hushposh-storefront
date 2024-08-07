"use client";

import { useSpringCarousel } from "react-spring-carousel";
import AnimatedProductCard from "./AnimatedProductCard";
import { User } from "@/types";

interface CarouselProps {
  products: {
    id: string;
    name: string;
    description: string | null;
    price: number;
    imageUrl: string | null;
  }[];
  user: User | null;
}

export default function Carousel({ products, user }: CarouselProps) {
  const { carouselFragment, slideToPrevItem, slideToNextItem } =
    useSpringCarousel({
      itemsPerSlide: 3,
      withLoop: true,
      items: products.map((product) => ({
        id: product.id,
        renderItem: (
          <div className="w-full m-auto">
            <AnimatedProductCard product={product} user={user} />
          </div>
        ),
      })),
    });

  return (
    <div className="relative mx-auto w-full max-w-4xl">
      <button
        onClick={slideToPrevItem}
        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md"
      >
        Previous
      </button>
      {carouselFragment}
      <button
        onClick={slideToNextItem}
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md"
      >
        Next
      </button>
    </div>
  );
}
