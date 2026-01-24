'use client';

import { Suspense, useState } from "react";
import NavUser from "./NavUser";
import NavLinks from "./NavLinks";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { User } from '@/types/types';

interface NavBarClientProps {
  user: User | null;
}

const NavBarClient = ({ user }: NavBarClientProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="flex-center fixed w-full px-4 lg:px-5 h-18 top-0 z-50 font-poppins nav-blur">
      <nav className="flex flex-row justify-between items-center w-full max-w-7xl text-muted">
        <ul className="hidden lg:flex flex-row items-center gap-x-7 w-full font-figtree font-semibold">
          <Suspense fallback={<li>Loading...</li>}>
            <NavLinks />
          </Suspense>
        </ul>
        
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        <NavUser user={user} />
      </nav>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-18 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 z-40">
          <div className="container px-4 py-6">
            <ul className="flex flex-col gap-y-4 font-figtree font-semibold">
              <div onClick={() => setIsMobileMenuOpen(false)}>
                <NavLinks />
              </div>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}

export default NavBarClient;