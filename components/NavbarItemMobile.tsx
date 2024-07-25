import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  location: string;
  content: string;
  handleNavMobile: () => void;
};

export default function NavbarItemMobile({
  location,
  content,
  handleNavMobile,
}: Props) {
  const path = usePathname();

  return (
    <Link
      className={`${path === location ? "text-base-100" : "text-secondary"} font-medium`}
      href={location}
      onClick={handleNavMobile}
    >
      {content}
    </Link>
  );
}
