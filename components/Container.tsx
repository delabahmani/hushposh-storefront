import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return <div className="xl:max-w-[1280px] w-[95%] mx-auto">{children}</div>;
}
