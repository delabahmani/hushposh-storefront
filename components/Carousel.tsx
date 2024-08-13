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
      gutter: 26,
      startEndGutter: 20,
      items: products.map((product) => ({
        id: product.id,
        renderItem: (
          <div className="m-auto flex w-full items-center justify-center transition">
            <AnimatedProductCard product={product} user={user} />
          </div>
        ),
      })),
    });

  return (
    <div className="relative m-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl  overflow-visible px-12">
      <button
        onClick={slideToPrevItem}
        className="carousel-button-left "
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
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <div className="overflow-hidden">
      {carouselFragment}
      </div>

      <button
        onClick={slideToNextItem}
        className="carousel-button-right "
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
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
}
