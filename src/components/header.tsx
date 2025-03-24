"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useScroll } from "@/hooks/use-scroll";

// import Navigation from "@/components/navigation";

export default function Header() {
  const scrolled = useScroll(5);
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all ${
        scrolled
          ? "bg-background/80 backdrop-blur-sm shadow-sm"
          : "bg-background"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/match" className="flex items-center space-x-2">
            <span className="font-semibold text-xl">scout</span>
          </Link>
          <Link href="/picklist" className="flex items-center space-x-2">
            <span className="font-semibold text-xl">pick list</span>
          </Link>
          <Link href="/compare" className="flex items-center space-x-2">
            <span className="font-semibold text-xl">compare teams</span>
          </Link>
          <Link href="/pit" className="flex items-center space-x-2">
            <span className="font-semibold text-xl">pit scouting</span>
          </Link>
          {/* <Navigation /> */}
        </div>
      </div>
    </header>
  );
}
