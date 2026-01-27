'use client';

import { Skeleton } from '@/components/ui/skeleton';

const LeaderboardSkeleton = () => {
  const rows = Array.from({ length: 10 });

  return (
    <main className="max-w-7xl mx-auto mt-20 lg:mt-30 relative mb-20">
      <div className="mb-10 lg:mb-15 gap-10 lg:gap-15 flex-center flex-col text-main">
        <Skeleton className="h-12 w-72 rounded-md" />

        <div className="w-full max-w-2xl mt-8">
          <div className="bg-background/50 border border-border/50 rounded-xl backdrop-blur-sm">
            <div className="h-125 w-full rounded-md p-4">
              <div className="flex flex-col gap-2">
                {rows.map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border border-border/40 bg-muted/10"
                  >
                    <div className="flex items-center gap-6">
                      <Skeleton className="h-6 w-6 rounded-full" />
                      <Skeleton className="h-5 w-40" />
                    </div>
                    <Skeleton className="h-5 w-16" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LeaderboardSkeleton;

