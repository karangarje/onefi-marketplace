import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ProductListItem } from '@/types/product';
import { formatINR, calculateSavings } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

interface ProductCardProps {
  product: ProductListItem;
}

export function ProductCard({ product }: ProductCardProps) {
  const { percentage } = calculateSavings(
    product.startingMrp,
    product.startingPrice
  );

  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Product Image Area */}
      <div className="relative aspect-4/3 sm:aspect-square w-full bg-linear-to-b from-slate-50 to-slate-100/50 p-6 flex items-center justify-center overflow-hidden">
        {percentage > 0 && (
          <div className="absolute top-3 left-3 z-10">
            <Badge variant="success" size="sm">
              Save {percentage}%
            </Badge>
          </div>
        )}
        <div className="absolute top-3 right-3 z-10">
          <Badge variant="neutral" size="sm">
            {product.variantCount} {product.variantCount === 1 ? 'Variant' : 'Variants'}
          </Badge>
        </div>

        <div className="relative w-full h-full max-h-52 transform transition-transform duration-300 group-hover:scale-105">
          <Image
            src={product.thumbnail}
            alt={product.name}
            fill
            className="object-contain p-2"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={product.id <= 2}
          />
        </div>
      </div>

      {/* Product Details Area */}
      <div className="flex flex-col flex-1 p-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-1">
          {product.brand}
        </div>
        <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
          {product.name}
        </h3>

        {/* Pricing */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-baseline gap-2">
          <span className="text-xs font-medium text-slate-500">From</span>
          <span className="text-xl font-extrabold text-slate-900">
            {formatINR(product.startingPrice)}
          </span>
          {product.startingMrp > product.startingPrice && (
            <span className="text-xs text-slate-400 line-through">
              {formatINR(product.startingMrp)}
            </span>
          )}
        </div>

        {/* EMI Teaser */}
        {product.lowestMonthlyPayment && (
          <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-600 bg-emerald-50/70 border border-emerald-100/80 rounded-lg px-2.5 py-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>
              EMIs from{' '}
              <strong className="text-slate-900 font-bold">
                {formatINR(product.lowestMonthlyPayment)}/mo
              </strong>
            </span>
          </div>
        )}

        {/* Available Options snippet */}
        <div className="mt-3 text-xs text-slate-500 flex flex-wrap gap-1.5">
          {product.availableStorages.map((storage) => (
            <span
              key={storage}
              className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium text-[11px]"
            >
              {storage}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-5 pt-3">
          <Link
            href={`/products/${product.slug}`}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-semibold text-sm transition-colors shadow-xs group/btn"
          >
            <span>View Details & Plans</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
