import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductListItem } from '@/types/product';
import { ShieldCheck, Sparkles, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Smartphones & Flagships | 1Fi Marketplace',
  description: 'Explore the latest Apple, Samsung, and OnePlus smartphones with mutual fund backed EMI plans and instant cashbacks.',
};

export const dynamic = 'force-dynamic';

async function getProducts(): Promise<ProductListItem[]> {
  // First attempt to consume the backend API route GET /api/products
  try {
    const port = process.env.PORT || 3000;
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `http://localhost:${port}`);
    const res = await fetch(`${baseUrl}/api/products`, { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        return json.data;
      }
    }
  } catch {
    // Gracefully fallback to direct Prisma query (e.g. during build-time static generation)
  }

  try {
    const products = await prisma.product.findMany({
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
    console.error('Error fetching products from database:', error);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500">
        <Link href="/" className="hover:text-slate-900 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/shop" className="hover:text-slate-900 transition-colors">
          Shop
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/shop/marketplace" className="hover:text-slate-900 transition-colors">
          1Fi Marketplace
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-semibold">Products</span>
      </nav>

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Tech Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            All Smartphones
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Compare flagship models, select storage & color options, and explore EMI plans with varying tenures and interest rates.
          </p>
        </div>

        <div className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 shadow-xs text-xs text-slate-600">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Powered by Backend APIs</span>
        </div>
      </div>

      {/* Dynamic Product Grid */}
      <ProductGrid initialProducts={products} />
    </div>
  );
}
