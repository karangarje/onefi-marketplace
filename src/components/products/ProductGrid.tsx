'use client';

import React, { useState, useMemo } from 'react';
import { ProductListItem } from '@/types/product';
import { ProductCard } from './ProductCard';
import { Search, RefreshCw } from 'lucide-react';

interface ProductGridProps {
  initialProducts: ProductListItem[];
}

export function ProductGrid({ initialProducts }: ProductGridProps) {
  const [selectedBrand, setSelectedBrand] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  // Extract unique brands
  const brands = useMemo(() => {
    const list = Array.from(new Set(initialProducts.map((p) => p.brand)));
    return ['ALL', ...list];
  }, [initialProducts]);

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((product) => {
        const matchesBrand =
          selectedBrand === 'ALL' ||
          product.brand.toLowerCase() === selectedBrand.toLowerCase();
        const matchesQuery =
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesBrand && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.startingPrice - b.startingPrice;
        if (sortBy === 'price-desc') return b.startingPrice - a.startingPrice;
        return a.id - b.id;
      });
  }, [initialProducts, selectedBrand, searchQuery, sortBy]);

  return (
    <div className="space-y-8">
      {/* Controls Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Brand Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-xs font-semibold text-slate-400 uppercase mr-1 hidden sm:inline">
            Brand:
          </span>
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedBrand === brand
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {brand === 'ALL' ? 'All Brands' : brand}
            </button>
          ))}
        </div>

        {/* Search & Sort */}
        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 md:w-56">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search smartphone..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-emerald-600 transition-colors"
            />
          </div>

          {/* Sort Selector */}
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc')
            }
            className="px-3 py-1.5 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl text-slate-700 cursor-pointer focus:outline-emerald-600 focus:bg-white"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between px-1">
        <p className="text-xs font-medium text-slate-500">
          Showing <span className="font-bold text-slate-800">{filteredProducts.length}</span> of {initialProducts.length} products
        </p>
        {(selectedBrand !== 'ALL' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedBrand('ALL');
              setSearchQuery('');
            }}
            className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold inline-flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" /> Reset filters
          </button>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto my-8">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-4">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1">No products found</h3>
          <p className="text-xs text-slate-500 mb-6">
            We couldn&apos;t find any products matching &quot;{searchQuery || selectedBrand}&quot;. Try adjusting your search or filters.
          </p>
          <button
            onClick={() => {
              setSelectedBrand('ALL');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
