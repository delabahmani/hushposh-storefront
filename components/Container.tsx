import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-[95%] xl:max-w-[1280px]">{children}</div>;
}
