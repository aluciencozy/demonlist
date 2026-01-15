'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <>
      <Link
        href="/"
        className={`text-primary hover:text-red hover:-translate-y-0.5 transition-all duration-200 text-shadow-black text-shadow-lg relative after:bg-red after:w-1.5 after:h-1.5 after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1/3 after:rounded-full after:opacity-0 after:content-[''] after:transition-opacity after:duration-200 hover:after:opacity-100 ${
          pathname === '/' ? 'text-red after:opacity-100' : ''
        }`}
      >
        <li>Home</li>
      </Link>
      <Link
        href="/demonlist"
        className={`text-primary hover:text-red hover:-translate-y-0.5 transition-all duration-200 text-shadow-black text-shadow-lg relative after:bg-red after:w-1.5 after:h-1.5 after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1/3 after:rounded-full after:opacity-0 after:content-[''] after:transition-opacity after:duration-200 hover:after:opacity-100 ${
          pathname === '/demonlist' ? 'text-red after:opacity-100' : ''
        }`}
      >
        <li>Demonlist</li>
      </Link>
      <Link
        href="/leaderboard"
        className={`text-primary hover:text-red hover:-translate-y-0.5 transition-all duration-200 text-shadow-black text-shadow-lg relative after:bg-red after:w-1.5 after:h-1.5 after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1/3 after:rounded-full after:opacity-0 after:content-[''] after:transition-opacity after:duration-200 hover:after:opacity-100 ${
          pathname === '/leaderboard' ? 'text-red after:opacity-100' : ''
        }`}
      >
        <li>Leaderboard</li>
      </Link>
      <Link
        href="/submit-completion"
        className={`text-primary hover:text-red hover:-translate-y-0.5 transition-all duration-200 text-shadow-black text-shadow-lg relative after:bg-red after:w-1.5 after:h-1.5 after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1/3 after:rounded-full after:opacity-0 after:content-[''] after:transition-opacity after:duration-200 hover:after:opacity-100 ${
          pathname === '/submit-completion' ? 'text-red after:opacity-100' : ''
        }`}
      >
        <li>Submit Completion</li>
      </Link>
    </>
  );
}

export default NavLinks