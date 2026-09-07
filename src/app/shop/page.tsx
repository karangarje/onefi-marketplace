import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Store, MapPin, Sparkles, ArrowRight, Crown, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shop | 1Fi',
  description: 'Choose how you\'d like to shop with 1Fi. Explore Top Brands, Nearby Stores, or the 1Fi Marketplace with flexible EMI plans.',
};

const shopOptions = [
  {
    title: 'Top Brands',
    description: 'Explore products from top brands.',
    href: '/shop/top-brands',
    icon: Crown,
    implemented: false,
    badge: 'Coming Soon',
  },
  {
    title: 'Nearby Stores',
    description: 'Discover stores near you.',
    href: '/shop/nearby-stores',
    icon: MapPin,
    implemented: false,
    badge: 'Coming Soon',
  },
  {
    title: '1Fi Marketplace',
    description: 'Shop smartphones with flexible EMI plans and transparent pricing.',
    href: '/shop/marketplace',
    icon: Sparkles,
    implemented: true,
    badge: 'Live',
  },
];

export default function ShopPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 mb-8">
        <Link href="/" className="hover:text-slate-900 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-semibold">Shop</span>
      </nav>

      {/* Header */}
      <div className="text-center mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold mb-4">
          <Store className="w-3.5 h-3.5" />
          <span>1Fi Shop</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
          Shop
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-lg mx-auto">
          Choose how you&apos;d like to shop with 1Fi.
        </p>
      </div>

      {/* Shop Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {shopOptions.map((option) => {
          const Icon = option.icon;
          const isMarketplace = option.implemented;

          return (
            <Link
              key={option.title}
              href={option.href}
              className={`group relative flex flex-col p-6 sm:p-7 rounded-2xl border transition-all duration-200 ${
                isMarketplace
                  ? 'bg-slate-900 border-slate-800 text-white hover:border-emerald-500 shadow-lg hover:shadow-xl hover:shadow-emerald-500/10'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
              }`}
            >
              {/* Badge */}
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isMarketplace
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                    isMarketplace
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}
                >
                  {option.badge}
                </span>
              </div>

              {/* Title */}
              <h2
                className={`text-lg font-bold tracking-tight ${
                  isMarketplace ? 'text-white' : 'text-slate-900'
                }`}
              >
                {option.title}
              </h2>

              {/* Description */}
              <p
                className={`mt-1.5 text-xs leading-relaxed flex-1 ${
                  isMarketplace ? 'text-slate-300' : 'text-slate-500'
                }`}
              >
                {option.description}
              </p>

              {/* CTA */}
              <div className="mt-5 pt-4 border-t border-slate-200/20">
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-bold transition-colors ${
                    isMarketplace
                      ? 'text-emerald-400 group-hover:text-emerald-300'
                      : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                >
                  {isMarketplace ? 'Explore Marketplace' : 'Coming Soon'}
                  {isMarketplace && (
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  )}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
