"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const { status, data: session } = useSession();
  const [isPopupVisibile, setIsPopupVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setIsPopupVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    if (!isPopupVisibile) {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isPopupVisibile]);

  return (
    <div className="relative mb-4 flex justify-between border-b pb-4">
      <div>
        <Link href={"/"}>
          <h1 className="text-dark text-4xl font-bold tracking-tighter">
            HUSH
          </h1>
        </Link>
        <p className="text-sm">
          Delivering Dreams, <br /> One Package at a Time.
        </p>
      </div>

      <div className="flex items-center justify-between gap-10">
        <Link
          href="https://www.amazon.ca/s?me=AFRDVUH6BH6WA&marketplaceID=A2EUQ1WTGCTBG2"
          target="_blank"
          className="font-semibold uppercase transition hover:scale-105 hover:border-b-[1px]"
        >
          Amazon
        </Link>

        <Link
          href={"/products"}
          className="font-semibold uppercase transition hover:scale-105 hover:border-b-[1px]"
        >
          Products
        </Link>

        {status === "authenticated" ? (
          <>
            <div
              ref={popupRef}
              className={`absolute right-0 top-20 z-30 min-w-[160px] flex-col gap-2 rounded-md bg-white p-6 text-right shadow-lg ${
                isPopupVisibile ? "flex" : "hidden"
              }`}
            >
              <div className="font-bold">{session?.user?.name}</div>
              <div className="font-semibold">{session?.user?.email}</div>
              <Link
                onClick={() => setIsPopupVisible(false)}
                className="hover:underline"
                href={"/favorites"}
              >
                My Favorites
              </Link>
              <button onClick={() => signOut()} className="btn">
                Sign Out
              </button>
            </div>

            <div className="flex items-center gap-2">
              <Image
                src={session?.user?.image || ""}
                width={36}
                height={36}
                alt="profile image"
                className="cursor-pointer rounded-full"
                onClick={() => setIsPopupVisible((prev) => !prev)}
              />
            </div>
          </>
        ) : (
          <div className="flex items-center">
            <Link className="btn" href={"/sign-in"}>
              Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
