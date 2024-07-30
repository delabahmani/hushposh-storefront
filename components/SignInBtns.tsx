"use client"

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function SignInBtns() {
  return (
    <div>
      <h1 className="mt-8 text-center font-bold">Sign in</h1>
      <div className="mt-4 flex flex-col items-center justify-center gap-4 p-4">
        <button
          onClick={() => signIn("google")}
          className="flex items-center gap-4 rounded-full border p-4 transition hover:bg-slate-100/25"
        >
          <span>
            <Image
              src={"/assets/google-logo.svg"}
              width={30}
              height={30}
              alt="Google Logo"
            />
          </span>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
