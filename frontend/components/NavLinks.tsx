'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = () => {
  const pathname = usePathname();

  const linkClasses = (href: string) => 
    `block lg:inline text-primary hover:text-red lg:hover:-translate-y-0.5 transition-all duration-200 text-shadow-black text-shadow-lg relative after:bg-red after:w-1.5 after:h-1.5 after:absolute after:left-0 lg:after:left-1/2 after:-translate-x-0 lg:after:-translate-x-1/2 after:-bottom-1 lg:after:-bottom-1/3 after:rounded-full after:opacity-0 after:content-[''] after:transition-opacity after:duration-200 hover:after:opacity-100 py-2 lg:py-0 after:hidden lg:after:block ${
      pathname === href ? 'text-red after:opacity-100' : ''
    }`;

  return (
    <>
      <Link href="/" className={linkClasses('/')}>
        <li>Home</li>
      </Link>
      <Link href="/demonlist" className={linkClasses('/demonlist')}>
        <li>Demonlist</li>
      </Link>
      <Link href="/leaderboard" className={linkClasses('/leaderboard')}>
        <li>Leaderboard</li>
      </Link>
      <Link href="/submit-completion" className={linkClasses('/submit-completion')}>
        <li>Submit Completion</li>
      </Link>
    </>
  );
}

export default NavLinks