import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-3 text-xs text-center">
      &copy; 2024{" "}
      <Link href="https://pantheras.ca/" target="_blank" className="font-bold hover:underline">
        Pantheras Digital
      </Link>
      . Designed and developed by{" "}
      <Link href="https://www.delara.live/" target="_blank" className="font-bold hover:underline">
        Delara Bahmani
      </Link>
      .
    </footer>
  );
}
