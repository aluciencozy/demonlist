'use client';

import { Skeleton } from '@/components/ui/skeleton';

const NavSkeleton = () => {
  return (
    <header className="flex-center fixed w-full px-4 lg:px-5 h-18 top-0 z-50 font-poppins nav-blur">
      <nav className="flex flex-row justify-between items-center w-full max-w-7xl text-muted">
        <div className="hidden lg:flex flex-row items-center gap-x-7 w-full">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-6 w-32" />
        </div>

        <div className="flex items-center justify-end w-auto gap-3">
          <Skeleton className="hidden lg:block h-8 w-24" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </nav>
    </header>
  );
};

export default NavSkeleton;

