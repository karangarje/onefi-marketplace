import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Sparkles, Package, CreditCard, BarChart2, Database, ChevronRight } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { ProductCard } from '@/components/products/ProductCard';

export const metadata: Metadata = {
  title: '1Fi Marketplace | Shop with EMI Plans',
  description: 'Explore smartphones with flexible EMI plans and transparent pricing on the 1Fi Marketplace.',
};

export const dynamic = 'force-dynamic';

async function getFeaturedProducts() {
  try {
    const products = await prisma.product.findMany({
      take: 3,
      include: {
        variants: {
          include: {
            emiPlans: true,
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    });

    return products.map((product) => {
      let minPrice = Infinity;
      let minMrp = Infinity;
      let minMonthlyPayment = Infinity;
      let thumbnail = '';
      const colorsSet = new Set<string>();
      const storagesSet = new Set<string>();

      product.variants.forEach((v) => {
        const numPrice = v.price.toNumber();
        const numMrp = v.mrp.toNumber();
        colorsSet.add(v.color);
        storagesSet.add(v.storage);

        if (numPrice < minPrice) {
          minPrice = numPrice;
          minMrp = numMrp;
          thumbnail = v.image;
        }

        v.emiPlans.forEach((plan) => {
          const numMonthly = plan.monthlyPayment.toNumber();
          if (numMonthly < minMonthlyPayment) {
            minMonthlyPayment = numMonthly;
          }
        });
      });

      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        brand: product.brand,
        description: product.description,
        startingPrice: minPrice === Infinity ? 0 : minPrice,
        startingMrp: minMrp === Infinity ? 0 : minMrp,
        lowestMonthlyPayment: minMonthlyPayment === Infinity ? undefined : minMonthlyPayment,
        thumbnail: thumbnail || '',
        availableColors: Array.from(colorsSet),
        availableStorages: Array.from(storagesSet),
        variantCount: product.variants.length,
      };
    });
  } catch (error) {
    console.error('Failed to fetch featured products:', error);
    return [];
  }
}

export default async function MarketplacePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/shop" className="hover:text-slate-900 transition-colors">
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-semibold">1Fi Marketplace</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-16 pb-20 sm:pt-24 sm:pb-28">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -top-24 right-10 w-96 h-96 bg-teal-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>1Fi Marketplace</span>
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
            Explore smartphones with flexible EMI plans and transparent pricing.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base transition-all shadow-lg shadow-emerald-500/20 hover:scale-[1.02] cursor-pointer"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 text-white font-semibold text-base border border-slate-700/80 transition-all hover:scale-[1.02]"
            >
              <span>View EMI Plans</span>
            </Link>
          </div>

          {/* Feature Highlights */}
          <div className="mt-14 pt-10 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-left max-w-4xl mx-auto">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-sm">
                <Package className="w-4 h-4" /> Multiple Products
              </div>
              <p className="text-xs text-slate-400">Explore smartphones and variants.</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-sm">
                <CreditCard className="w-4 h-4" /> Flexible EMI Plans
              </div>
              <p className="text-xs text-slate-400">Choose from multiple tenure and interest options.</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-sm">
                <BarChart2 className="w-4 h-4" /> Transparent Pricing
              </div>
              <p className="text-xs text-slate-400">Compare MRP, price and EMI options.</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-sm">
                <Database className="w-4 h-4" /> Dynamic Marketplace
              </div>
              <p className="text-xs text-slate-400">Product and EMI data is powered by backend APIs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
              Curated Catalog
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Smartphones
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Choose your device, configure your variant, and discover tailored EMI plans.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 hover:text-emerald-700 group cursor-pointer"
          >
            <span>View all products</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              How It Works
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mt-2 tracking-tight">
              Pick a product, choose your EMI.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
              Browse our catalog, select the variant that suits you, and pick an EMI plan that matches your budget. All product data and EMI plans are sourced directly from our database.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60">
                <span className="text-2xl font-black text-emerald-400 block mb-1">01</span>
                <h4 className="text-sm font-bold text-white mb-1">Select Smartphone</h4>
                <p className="text-xs text-slate-400">Pick any device and configure your preferred color and storage variant.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60">
                <span className="text-2xl font-black text-emerald-400 block mb-1">02</span>
                <h4 className="text-sm font-bold text-white mb-1">Choose EMI Plan</h4>
                <p className="text-xs text-slate-400">Select 3, 6, or 12 month tenures with varying interest rates and cashback options.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60">
                <span className="text-2xl font-black text-emerald-400 block mb-1">03</span>
                <h4 className="text-sm font-bold text-white mb-1">Proceed</h4>
                <p className="text-xs text-slate-400">Review your selection and confirm your EMI plan to complete the process.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
