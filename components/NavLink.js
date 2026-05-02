import Link from "next/link";

export default function NavLink({ href, children }) {
  return (
    <Link href={href} className="nav-link no-underline text-black font-medium">
      {children}
    </Link>
  );
}
