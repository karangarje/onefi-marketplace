import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

export default function ProductsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Header Skeleton */}
      <div className="space-y-3 pb-6 border-b border-slate-200">
        <Skeleton className="h-5 w-32 rounded-full" />
        <Skeleton className="h-10 w-64 rounded-xl" />
        <Skeleton className="h-4 w-96 max-w-full rounded-md" />
      </div>

      {/* Filter Bar Skeleton */}
      <div className="h-14 w-full bg-white rounded-2xl border border-slate-200 p-3 flex items-center justify-between">
        <div className="flex gap-2">
          <Skeleton className="h-8 w-20 rounded-xl" />
          <Skeleton className="h-8 w-20 rounded-xl" />
          <Skeleton className="h-8 w-20 rounded-xl" />
        </div>
        <Skeleton className="h-8 w-44 rounded-xl hidden sm:block" />
      </div>

      {/* Grid Skeletons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4"
          >
            <Skeleton className="aspect-square w-full rounded-xl" />
            <Skeleton className="h-4 w-20 rounded" />
            <Skeleton className="h-6 w-48 rounded" />
            <Skeleton className="h-8 w-32 rounded" />
            <Skeleton className="h-10 w-full rounded-xl mt-4" />
          </div>
        ))}
      </div>
    </div>
  );
}
