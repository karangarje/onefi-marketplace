import React from 'react';
import Link from 'next/link';
import { ShieldCheck, TrendingUp, Layers } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                1Fi
              </div>
              <span className="font-bold text-white text-lg">1Fi Marketplace</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              A full-stack marketplace showcasing smartphones with transparent pricing, multiple variants, and selectable EMI plans — powered by a PostgreSQL database and Next.js API routes.
            </p>
          </div>

          {/* Catalog */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Products</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/products/iphone-17-pro" className="hover:text-emerald-400 transition-colors">
                  Apple iPhone 17 Pro
                </Link>
              </li>
              <li>
                <Link href="/products/samsung-galaxy-s24-ultra" className="hover:text-emerald-400 transition-colors">
                  Samsung Galaxy S24 Ultra
                </Link>
              </li>
              <li>
                <Link href="/products/oneplus-13" className="hover:text-emerald-400 transition-colors">
                  OnePlus 13
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-emerald-400 transition-colors">
                  All Smartphones
                </Link>
              </li>
            </ul>
          </div>

          {/* Benefits */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">1Fi Advantage</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>Multiple EMI Tenures</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Transparent Pricing</span>
              </li>
              <li className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span>DB-Backed Dynamic Data</span>
              </li>
            </ul>
          </div>

          {/* Security & Disclaimer */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Disclaimer</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              This is a demonstration application built for an SDE internship assignment. No real financial transactions or credit agreements are created. All product and EMI data is sourced from a seeded database.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} 1Fi Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">EMI FAQs</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
