import Image from "next/image";

export default function SignInBtns() {
  return (
    <div>
      <h1 className="mt-8 text-center font-bold">Sign in</h1>
      <div className="mt-4 flex flex-col items-center p-4 justify-center gap-4">
        <button className="flex items-center border p-4 rounded-full gap-4 hover:bg-slate-100/25 transition ">
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
