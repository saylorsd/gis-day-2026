"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** The HOME button, hidden on the home page itself. */
export function HomeButton() {
  if (usePathname() === "/") return null;
  return (
    <Link className="btn lg m-0 font-bold" href="/">
      HOME
    </Link>
  );
}
