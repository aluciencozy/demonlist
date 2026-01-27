'use client';

import { Skeleton } from '@/components/ui/skeleton';

const ProfileSkeleton = () => {
  return (
    <div className="flex-center flex-col gap-15 font-figtree">
      <div className="flex-center gap-10">
        <Skeleton className="h-40 w-40 rounded-full" />
        <div className="flex items-start justify-center flex-col gap-2 max-w-125 truncate">
          <Skeleton className="h-10 w-64 rounded-md" />
          <Skeleton className="h-6 w-40 rounded-md" />
        </div>
      </div>

      <div className="w-full max-w-3xl flex justify-center flex-col">
        <Skeleton className="h-8 w-48 mb-5" />
        <ul className="flex flex-col gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <li key={index}>
              <div className="w-full rounded-lg border border-border/60 bg-background/40 p-4 flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-md" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-1/3" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileSkeleton;

