'use client';

import { Skeleton } from '@/components/ui/skeleton';

const SubmitSkeleton = () => {
  return (
    <main className="max-w-7xl mx-auto mt-20 lg:mt-30 relative mb-20 flex-center flex-col font-figtree px-4">
      <Skeleton className="h-12 w-80 rounded-md" />

      <div className="mt-6 lg:mt-10 w-full max-w-3xl">
        <div className="w-full rounded-xl border border-border bg-background p-6 space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-72" />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="w-full space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>

              <div className="hidden sm:block pt-6 text-sm font-bold text-muted-foreground">
                <Skeleton className="h-4 w-8" />
              </div>

              <div className="w-full space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>

          <div>
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default SubmitSkeleton;

