import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Store } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-20 pb-24 sm:pt-28 sm:pb-32">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -top-24 right-10 w-96 h-96 bg-teal-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>1Fi — Smart EMI Plans</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
            Shop Smart. <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-teal-300 to-emerald-200">
              Pay Smarter.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Explore smartphones with flexible EMI plans and transparent pricing through the 1Fi Marketplace.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base transition-all shadow-lg shadow-emerald-500/20 hover:scale-[1.02] cursor-pointer"
            >
              <Store className="w-5 h-5" />
              <span>Go to Shop</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/shop/marketplace"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 text-white font-semibold text-base border border-slate-700/80 transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4" />
              <span>1Fi Marketplace</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Shop Overview Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
            1Fi Shop
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Choose how you&apos;d like to shop
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-lg mx-auto">
            Browse top brands, find nearby stores, or explore the full 1Fi Marketplace with EMI plans.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Top Brands */}
          <Link
            href="/shop/top-brands"
            className="group flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center mb-4 group-hover:bg-slate-200 transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Top Brands</h3>
            <p className="text-xs text-slate-500">Explore products from top brands.</p>
            <span className="mt-4 text-[11px] font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">Coming Soon</span>
          </Link>

          {/* Nearby Stores */}
          <Link
            href="/shop/nearby-stores"
            className="group flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center mb-4 group-hover:bg-slate-200 transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Nearby Stores</h3>
            <p className="text-xs text-slate-500">Discover stores near you.</p>
            <span className="mt-4 text-[11px] font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">Coming Soon</span>
          </Link>

          {/* 1Fi Marketplace */}
          <Link
            href="/shop/marketplace"
            className="group flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/10 transition-all text-white"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">1Fi Marketplace</h3>
            <p className="text-xs text-slate-300">Shop smartphones with flexible EMI plans.</p>
            <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-500/30">
              Explore <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
