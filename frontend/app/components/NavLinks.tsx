'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <>
      <li className={`hover:text-main hover:-translate-y-0.5 transition-all duration-200 text-shadow-black text-shadow-lg relative after:bg-main after:w-1.5 after:h-1.5 after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1/3 after:rounded-full after:opacity-0 after:content-[''] after:transition-opacity after:duration-200 hover:after:opacity-100 ${pathname === '/' ? 'text-main after:opacity-100' : ''}`}>
        <Link href="/">Home</Link>
      </li>
      <li className={`hover:text-main hover:-translate-y-0.5 transition-all duration-200 text-shadow-black text-shadow-lg relative after:bg-main after:w-1.5 after:h-1.5 after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1/3 after:rounded-full after:opacity-0 after:content-[''] after:transition-opacity after:duration-200 hover:after:opacity-100 ${pathname === '/demonlist' ? 'text-main after:opacity-100' : ''}`}>
        <Link href="/demonlist">Demonlist</Link>
      </li>
      <li className={`hover:text-main hover:-translate-y-0.5 transition-all duration-200 text-shadow-black text-shadow-lg relative after:bg-main after:w-1.5 after:h-1.5 after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1/3 after:rounded-full after:opacity-0 after:content-[''] after:transition-opacity after:duration-200 hover:after:opacity-100 ${pathname === '/leaderboard' ? 'text-main after:opacity-100' : ''}`}>
        <Link href="/leaderboard">Leaderboard</Link>
      </li>
      <li className={`hover:text-main hover:-translate-y-0.5 transition-all duration-200 text-shadow-black text-shadow-lg relative after:bg-main after:w-1.5 after:h-1.5 after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1/3 after:rounded-full after:opacity-0 after:content-[''] after:transition-opacity after:duration-200 hover:after:opacity-100 ${pathname === '/submit-completion' ? 'text-main after:opacity-100' : ''}`}>
        <Link href="/submit-completion">Submit Completion</Link>
      </li>
    </>
  );
}

export default NavLinks