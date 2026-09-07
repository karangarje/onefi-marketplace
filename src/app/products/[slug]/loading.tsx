import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

export default function ProductDetailLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Breadcrumb Skeleton */}
      <Skeleton className="h-4 w-48 rounded" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column Skeleton */}
        <div className="lg:col-span-6 space-y-4">
          <Skeleton className="aspect-square w-full rounded-3xl" />
          <div className="flex justify-center gap-3">
            <Skeleton className="h-10 w-24 rounded-xl" />
            <Skeleton className="h-10 w-24 rounded-xl" />
            <Skeleton className="h-10 w-24 rounded-xl" />
          </div>
        </div>

        {/* Right Column Skeleton */}
        <div className="lg:col-span-6 space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200">
          <Skeleton className="h-4 w-20 rounded" />
          <Skeleton className="h-8 w-64 rounded-xl" />
          <Skeleton className="h-16 w-full rounded-xl" />
          <Skeleton className="h-20 w-full rounded-2xl" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-24 rounded" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-28 rounded-xl" />
              <Skeleton className="h-10 w-28 rounded-xl" />
            </div>
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-36 rounded" />
            <div className="grid grid-cols-3 gap-3">
              <Skeleton className="h-24 rounded-xl" />
              <Skeleton className="h-24 rounded-xl" />
              <Skeleton className="h-24 rounded-xl" />
            </div>
          </div>
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
