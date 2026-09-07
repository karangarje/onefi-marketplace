import React from 'react';
import Link from 'next/link';
import { Smartphone, ArrowLeft, Search } from 'lucide-react';

export default function ProductNotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6 border border-emerald-200/60 shadow-xs">
        <Smartphone className="w-8 h-8" />
      </div>

      <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
        Smartphone Not Found
      </h1>

      <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
        The device you are looking for might have been retired from our active catalog or the URL might be mistyped.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-xs"
        >
          <Search className="w-4 h-4" />
          <span>Browse All Smartphones</span>
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Home</span>
        </Link>
      </div>
    </div>
  );
}
