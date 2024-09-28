import { Poppins } from "next/font/google";
import Link from "next/link";
import React from "react";

const poppins = Poppins({ weight: "200", subsets: ["latin"] });
const NavBar = () => {
  return (
    <nav
      className="mx-auto flex items-center justify-between p-6 lg:px-8 bg-gradient-to-br from-blue-500 to-blue-300 fixed w-full"
      aria-label="Global"
    >
      <div className="flex lg:flex-1">
        <Link href="/" className="-m-1.5 p-1.5">
          <span
            className={`text-white font-light text-xl border-y-[1px] ${poppins.className}`}
          >
            Asset Allocation
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
