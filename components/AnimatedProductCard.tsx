"use client";

import { User } from "@/types";
import { useState } from "react";
import { useSpring, animated } from "react-spring";
import CarouselProductCard from "./CarouselProductCard";

type AnimatedProductCardProps = {
  product: {
    id: string;
    name: string;
    description: string | null;
    price: number;
    imageUrl: string | null;
  };
  user: User | null;
};

export default function AnimatedProductCard({
  product,
  user,
}: AnimatedProductCardProps) {
  const [isActive, setIsActive] = useState(false);

  const springProps = useSpring({
    transform: isActive ? "scale(1.03)" : "scale(1)",
    boxShadow: isActive
      ? "0 20px 25px rgb(0 0 0 / 25%)"
      : "0 2px 10px rgb(0 0 0 / 8%)",
    config: { mass: 1, tension: 350, friction: 40 },
  });

  return (
    <animated.div
      style={springProps}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <CarouselProductCard product={product} user={user} />
    </animated.div>
  );
}
