"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import NavbarItemMobile from "./NavbarItemMobile";

export default function Navbar() {
  const { status, data: session } = useSession();
  const [isPopupVisibile, setIsPopupVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const [isActiveMobileNav, setIsActiveMobileNav] = useState(false);
  const path = usePathname();

  const handleToggleNavOff = () => {
    setTimeout(() => {
      setIsActiveMobileNav(false);
    }, 300);
  };

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
    <header className="">
      <nav className="relative mb-4 flex justify-between border-b px-4 pb-4 md:px-6 lg:px-8">
        <div className="flex-shrink-0">
          <Link href={"/"}>
            <h1 className="text-dark text-3xl font-bold tracking-tighter md:text-4xl">
              HUSH
            </h1>
          </Link>
          <p className="hidden text-xs md:inline md:text-sm">
            Delivering Dreams, <br className="hidden md:inline" /> One Package
            at a Time.
          </p>
        </div>

        <div className="flex items-center space-x-4 md:space-x-8">
        <div className="hidden md:items-center md:justify-between md:gap-10 md:flex ">
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
        </div>

        {status === "authenticated" ? (
          <>
            <div
              ref={popupRef}
              className={`absolute right-0 top-12 z-30 w-[250px] flex-col items-center gap-2 rounded-md bg-white p-6 text-right shadow-lg md:top-20 md:min-w-[160px] ${
                isPopupVisibile ? "flex" : "hidden"
              }`}
            >
              <h2 className="text-lg leading-none">{`welcome ${session?.user?.name}!`}</h2>
              <h3 className="text-lg font-bold"></h3>
              {/* <p className="font-semibold text-xs leading-none">{session?.user?.email}</p> */}

              <Link
                onClick={() => setIsPopupVisible(false)}
                className="hover:underline font-semibold"
                href={"/favorites"}
              >
                my favorites
              </Link>
              <button
                onClick={() => signOut()}
                className="btn-accent my-4"
              >
                Sign Out
              </button>
            </div>

            <div className="flex items-center gap-2">
              <Image
                src={session?.user?.image || ""}
                width={36}
                height={36}
                alt="profile image"
                className="w-7 cursor-pointer rounded-full md:w-10"
                onClick={() => setIsPopupVisible((prev) => !prev)}
              />
            </div>
          </>
        ) : (
          <div className="flex items-center">
            <Link className="btn-primary" href={"/sign-in"}>
              Sign In
            </Link>
          </div>
        )}

        <div
          className="z-20 md:hidden"
          onClick={() => setIsActiveMobileNav(!isActiveMobileNav)}
        >
          <div className="flex h-6 w-[25px] flex-col items-end justify-center gap-1">
            <motion.div
              className="h-[2px] w-[25px] bg-coral"
              initial={{ position: "relative" }}
              animate={{
                top: isActiveMobileNav ? "3px" : 0,
                rotate: isActiveMobileNav ? 45 : 0,
              }}
            ></motion.div>
            <AnimatePresence mode="popLayout">
              {!isActiveMobileNav && (
                <motion.div
                  className="h-[2px] w-[25px] bg-coral"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, position: "relative" }}
                ></motion.div>
              )}
            </AnimatePresence>
            <motion.div
              className="h-[2px] w-[25px] bg-coral"
              initial={{ position: "relative" }}
              animate={{
                bottom: isActiveMobileNav ? "3px" : 0,
                rotate: isActiveMobileNav ? -45 : 0,
              }}
            ></motion.div>
          </div>
        </div>
        </div>

        <AnimatePresence>
          {isActiveMobileNav && (
            <motion.div
              className="fixed inset-0 z-10 flex h-screen w-screen flex-col items-center justify-center gap-8 bg-black text-white"
              initial={{ right: "-100%", top: 0 }}
              animate={{ right: 0 }}
              exit={{ right: "-100%" }}
            >
              <NavbarItemMobile
                handleNavMobile={handleToggleNavOff}
                location="/"
                content="HOME"
              />
              <NavbarItemMobile
                handleNavMobile={handleToggleNavOff}
                location="/products"
                content="PRODUCTS"
              />
              <Link
                href="https://www.amazon.ca/s?me=AFRDVUH6BH6WA&marketplaceID=A2EUQ1WTGCTBG2"
                target="_blank"
              >
                AMAZON
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
