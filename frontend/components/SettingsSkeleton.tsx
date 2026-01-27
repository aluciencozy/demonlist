'use client';

import { Skeleton } from '@/components/ui/skeleton';

const SettingsSkeleton = () => {
  return (
    <div className="container max-w-4xl mx-auto py-10 font-figtree">
      <div className="rounded-xl border border-border bg-background">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <Skeleton className="h-7 w-32 mb-2" />
            <Skeleton className="h-4 w-56" />
          </div>
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>

        <div className="border-b border-border mb-6" />

        <div className="flex flex-col md:flex-row gap-10 items-start p-6 pt-0">
          <div className="w-full md:w-auto flex flex-col items-center gap-4">
            <Skeleton className="h-40 w-40 rounded-full" />
            <Skeleton className="h-4 w-40" />
          </div>

          <div className="flex-1 w-full space-y-6">
            <div className="grid gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="grid gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="pt-4">
              <Skeleton className="h-10 w-40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSkeleton;

