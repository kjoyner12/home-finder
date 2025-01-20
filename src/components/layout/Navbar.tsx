'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path
      ? "bg-gray-900 text-white"
      : "text-gray-300 hover:bg-gray-700 hover:text-white";
  };

  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-white text-xl font-bold">Home Finder</span>
            </div>
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className={`px-3 py-2 rounded-md text-sm font-medium ${isActive(
                  "/"
                )}`}
              >
                Calculator
              </Link>
              <Link
                href="/properties"
                className={`px-3 py-2 rounded-md text-sm font-medium ${isActive(
                  "/properties"
                )}`}
              >
                Properties
              </Link>
              <Link
                href="/map"
                className={`px-3 py-2 rounded-md text-sm font-medium ${isActive(
                  "/map"
                )}`}
              >
                Map View
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;