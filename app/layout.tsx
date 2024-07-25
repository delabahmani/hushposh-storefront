import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { NextAuthProvider } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HushPosh Storefront",
  description: "Generated by Pantheras Digital",
  icons: {
    icon: "/assets/logo-white.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <div className="mx-auto flex min-h-screen flex-col px-8 py-8 shadow-xl lg:max-w-[1280px] lg:px-16">
            <Navbar />
            <div className="flex-auto">{children}</div>
            <Footer />
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
