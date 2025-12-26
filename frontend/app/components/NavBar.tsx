import Link from "next/link"
import { Suspense } from "react";
import NavUser from "./NavUser";

const NavBar = async () => {
  return (
    <header className="bg-[#0a0a0a] flex justify-between items-center fixed w-full p-5">
      <nav className="flex flex-row justify-between items-center w-full">
        <ul className="flex flex-row gap-x-5">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/demonlist">Demonlist</Link>
          </li>
          <li>
            <Link href="/leaderboard">Leaderboard</Link>
          </li>
        </ul>
        <Suspense fallback={<div>Loading...</div>}>
          <NavUser />
        </Suspense>
      </nav>
    </header>
  );
}

export default NavBar