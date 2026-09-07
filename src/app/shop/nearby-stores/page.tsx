import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, ArrowLeft, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Nearby Stores | 1Fi Shop',
  description: 'Discover stores near you on 1Fi.',
};

export default function NearbyStoresPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 mb-8">
        <Link href="/" className="hover:text-slate-900 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/shop" className="hover:text-slate-900 transition-colors">
          Shop
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-semibold">Nearby Stores</span>
      </nav>

      {/* Empty State */}
      <div className="bg-white rounded-3xl border border-slate-200 p-12 sm:p-16 text-center">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-5">
          <MapPin className="w-7 h-7" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Nearby Stores
        </h1>

        <p className="mt-3 text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
          Coming soon.
        </p>

        <p className="mt-2 text-xs text-slate-400 max-w-sm mx-auto">
          This section is intentionally left blank for the assignment. The fully implemented section is the 1Fi Marketplace.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Shop</span>
          </Link>
          <Link
            href="/shop/marketplace"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-xs"
          >
            <span>Explore 1Fi Marketplace</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
