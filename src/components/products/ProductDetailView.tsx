'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductDetail, Variant } from '@/types/product';
import { EMIPlan } from '@/types/emi';
import { VariantSelector } from './VariantSelector';
import { EMIPlanList } from '@/components/emi/EMIPlanList';
import { ProceedModal } from '@/components/emi/ProceedModal';
import { formatINR, calculateSavings } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { ChevronRight, ShieldCheck, Tag } from 'lucide-react';

interface ProductDetailViewProps {
  product: ProductDetail;
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  // Default to the first variant
  const [selectedVariant, setSelectedVariant] = useState<Variant>(
    product.variants[0] || ({} as Variant)
  );

  // Dynamic EMI plans fetched from the backend API
  const [activePlans, setActivePlans] = useState<EMIPlan[]>(
    product.variants[0]?.emiPlans || []
  );

  // Selected EMI plan
  const [selectedPlan, setSelectedPlan] = useState<EMIPlan | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch EMI plans directly from backend API /api/products/[slug]/emi-plans
  React.useEffect(() => {
    let isMounted = true;
    async function fetchPlansFromAPI() {
      try {
        const res = await fetch(
          `/api/products/${product.slug}/emi-plans?variantId=${selectedVariant.id}`
        );
        if (res.ok) {
          const json = await res.json();
          if (isMounted && json.success && Array.isArray(json.data) && json.data.length > 0) {
            const fetchedPlans: EMIPlan[] = json.data.map((p: EMIPlan) => ({
              id: p.id,
              variantId: p.variantId,
              monthlyPayment: p.monthlyPayment,
              tenure: p.tenure,
              interestRate: p.interestRate,
              cashback: p.cashback,
              createdAt: p.createdAt,
              updatedAt: p.updatedAt,
            }));
            setActivePlans(fetchedPlans);
            return;
          }
        }
      } catch {
        // Fallback to variant's emiPlans if fetch fails
      }
      if (isMounted) {
        setActivePlans(selectedVariant.emiPlans || []);
      }
    }

    fetchPlansFromAPI();
    return () => {
      isMounted = false;
    };
  }, [product.slug, selectedVariant.id, selectedVariant.emiPlans]);

  // When variant changes, reset plan selection if needed or keep matching tenure
  const handleVariantChange = (newVariant: Variant) => {
    setSelectedVariant(newVariant);
    setErrorMessage(null);

    // If a plan was selected, attempt to match the same tenure on the new variant
    if (selectedPlan && newVariant.emiPlans) {
      const matchingPlan = newVariant.emiPlans.find(
        (p) => p.tenure === selectedPlan.tenure
      );
      setSelectedPlan(matchingPlan || null);
    } else {
      setSelectedPlan(null);
    }
  };

  const handleSelectPlan = (plan: EMIPlan) => {
    setSelectedPlan(plan);
    setErrorMessage(null); // clear validation error
  };

  const handleProceed = () => {
    if (!selectedPlan) {
      setErrorMessage('Please select an EMI plan to continue.');
      return;
    }
    setErrorMessage(null);
    setIsModalOpen(true);
  };

  const { savings, percentage } = calculateSavings(
    selectedVariant.mrp,
    selectedVariant.price
  );

  return (
    <div className="space-y-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 flex-wrap">
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
        <Link href="/products" className="hover:text-slate-900 transition-colors">
          Products
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-semibold truncate">{product.name}</span>
      </nav>

      {/* Main Two-Column Layout on Desktop, Single-Column on Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* LEFT COLUMN: Product Image & Badges */}
        <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-4">
          <div className="relative aspect-square w-full bg-linear-to-b from-white to-slate-100/70 rounded-3xl border border-slate-200/90 p-8 sm:p-12 flex items-center justify-center shadow-xs overflow-hidden">
            {percentage > 0 && (
              <div className="absolute top-4 left-4 z-10">
                <Badge variant="success" size="md">
                  Save {percentage}% (₹{savings.toLocaleString('en-IN')})
                </Badge>
              </div>
            )}
            <div className="absolute top-4 right-4 z-10">
              <Badge variant="neutral" size="md">
                {selectedVariant.color}
              </Badge>
            </div>

            <div className="relative w-full h-full max-w-sm max-h-80 sm:max-h-96">
              <Image
                src={selectedVariant.image}
                alt={`${product.name} in ${selectedVariant.color}`}
                fill
                className="object-contain p-2 transition-all duration-300"
                priority
              />
            </div>
          </div>

          {/* Color Switch Thumbnails */}
          <div className="flex items-center justify-center gap-3">
            {product.variants.map((v) => {
              const isCurrent = v.id === selectedVariant.id;
              return (
                <button
                  key={v.id}
                  onClick={() => handleVariantChange(v)}
                  className={`flex items-center gap-2 p-1.5 pr-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    isCurrent
                      ? 'border-emerald-600 bg-white ring-2 ring-emerald-500/20 shadow-xs'
                      : 'border-slate-200 bg-slate-50/70 hover:bg-white text-slate-600'
                  }`}
                >
                  <div className="relative w-7 h-7 shrink-0">
                    <Image
                      src={v.image}
                      alt={v.color}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-[11px]">{v.color}</span>
                </button>
              );
            })}
          </div>

          {/* Marketplace Info */}
          <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-200/80">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <div className="text-[11px] text-slate-600 leading-relaxed">
              <strong className="text-slate-800">1Fi Marketplace</strong> — All pricing and EMI plans are loaded directly from the database. Select a variant and plan to proceed.
            </div>
            <Tag className="w-4 h-4 text-slate-400 shrink-0" />
          </div>
        </div>

        {/* RIGHT COLUMN: Info, Variants, Pricing & EMI Selection */}
        <div className="lg:col-span-6 space-y-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs">
          {/* Header & Description */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600">
                {product.brand}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {product.name}
            </h1>

            <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Pricing Block */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Price
              </span>
              <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {formatINR(selectedVariant.price)}
              </span>
              {selectedVariant.mrp > selectedVariant.price && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-400 line-through">
                    {formatINR(selectedVariant.mrp)}
                  </span>
                  <Badge variant="success" size="sm">
                    Save {formatINR(savings)} ({percentage}% OFF)
                  </Badge>
                </div>
              )}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Inclusive of all taxes. Free insured shipping across India.
            </p>
          </div>

          {/* Variant Selection (Color & Storage) */}
          <div className="pt-2 border-t border-slate-100">
            <VariantSelector
              variants={product.variants}
              selectedVariant={selectedVariant}
              onVariantChange={handleVariantChange}
            />
          </div>

          {/* EMI Plans Section */}
          <div className="pt-4 border-t border-slate-100">
            <EMIPlanList
              plans={activePlans}
              selectedPlan={selectedPlan}
              onSelectPlan={handleSelectPlan}
              onProceed={handleProceed}
              errorMessage={errorMessage}
            />
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {selectedPlan && (
        <ProceedModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={product}
          variant={selectedVariant}
          selectedPlan={selectedPlan}
        />
      )}
    </div>
  );
}
