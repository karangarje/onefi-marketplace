import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 animate-pulse">
      <div className="space-y-4 max-w-xl mx-auto text-center">
        <Skeleton className="h-4 w-32 mx-auto rounded-full" />
        <Skeleton className="h-10 w-80 mx-auto rounded-xl" />
        <Skeleton className="h-4 w-96 max-w-full mx-auto rounded" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <Skeleton className="aspect-square w-full rounded-xl" />
            <Skeleton className="h-4 w-20 rounded" />
            <Skeleton className="h-6 w-40 rounded" />
            <Skeleton className="h-8 w-28 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
