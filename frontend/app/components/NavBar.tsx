import { Suspense } from "react";
import NavUser from "./NavUser";
import NavLinks from "./NavLinks";

const NavBar = async () => {
  return (
    <header className="flex-center fixed w-full px-5 h-18 top-0 z-5 font-poppins nav-blur">
      <nav className="flex flex-row justify-between items-center w-full max-w-7xl text-muted">
        <ul className="flex flex-row items-center gap-x-7 w-full font-figtree font-semibold">
          <Suspense fallback={<li>Loading...</li>}>
            <NavLinks />
          </Suspense>
        </ul>
        <Suspense fallback={<div>Loading...</div>}>
          <NavUser />
        </Suspense>
      </nav>
    </header>
  );
}

export default NavBar