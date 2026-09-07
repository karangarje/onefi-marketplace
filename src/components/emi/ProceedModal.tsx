'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, CheckCircle, ShieldCheck, Gift } from 'lucide-react';
import { EMIPlan } from '@/types/emi';
import { Variant, ProductDetail } from '@/types/product';
import { formatINR } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface ProceedModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductDetail;
  variant: Variant;
  selectedPlan: EMIPlan;
}

export function ProceedModal({
  isOpen,
  onClose,
  product,
  variant,
  selectedPlan,
}: ProceedModalProps) {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleClose = React.useCallback(() => {
    setIsConfirmed(false);
    onClose();
  }, [onClose]);

  // Handle escape key and body overflow
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  // Dynamic calculation according to assignment formula:
  // effectivePrice = selectedProductPrice - cashback
  const effectivePrice = Math.max(0, variant.price - selectedPlan.cashback);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Dialog Box: width min(90vw, 520px), responsive max-height 90vh, centered */}
      <div className="relative w-[min(90vw,520px)] max-h-[90vh] flex flex-col bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden z-10 animate-fade-in">
        {/* 1. Header (clean, 56px height, white bg, subtle bottom border) */}
        <header className="h-14 px-4 sm:px-5 flex items-center justify-between border-b border-slate-100 bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-xs tracking-tight shadow-xs select-none">
              1Fi
            </div>
            <h3 id="modal-title" className="text-sm sm:text-base font-semibold text-slate-900 tracking-tight">
              {isConfirmed ? 'EMI Plan Confirmed' : 'Confirm Your EMI Plan'}
            </h3>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Scrollable Body Content (only scrolls when viewport is extremely short) */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3.5 sm:space-y-4">
          {!isConfirmed ? (
            <>
              {/* 2. Product Summary Card */}
              <div className="flex items-center gap-3 sm:gap-3.5 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200/80">
                {/* Product Image Container */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-xl border border-slate-200/80 p-1.5 shrink-0 flex items-center justify-center overflow-hidden shadow-2xs">
                  <Image
                    src={variant.image}
                    alt={`${product.name} - ${variant.color}`}
                    width={64}
                    height={64}
                    className="object-contain w-full h-full"
                    priority
                  />
                </div>

                {/* Product Information */}
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    {product.brand}
                  </span>
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
                    {product.name}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 truncate">
                    {variant.color} • {variant.storage}
                  </p>
                </div>

                {/* Price Section */}
                <div className="text-right shrink-0">
                  <span className="text-xs sm:text-sm font-bold text-slate-900 block">
                    {formatINR(variant.price)}
                  </span>
                  {variant.mrp > variant.price && (
                    <div className="text-right leading-none mt-0.5">
                      <span className="text-[10px] sm:text-[11px] text-slate-400 line-through">
                        {formatINR(variant.mrp)}
                      </span>
                      <span className="text-[9px] text-slate-400 uppercase ml-1">MRP</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 3. Selected EMI Message */}
              <div className="px-3.5 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200/80">
                <p className="text-xs sm:text-[13px] text-emerald-950 font-medium leading-snug">
                  You selected <strong className="font-semibold text-emerald-950">{selectedPlan.tenure}-Month EMI</strong> for{' '}
                  <strong className="font-semibold text-emerald-950">{product.name}</strong>.
                </p>
              </div>

              {/* 4. EMI Details Section */}
              <div className="rounded-xl border border-slate-100 bg-white overflow-hidden text-xs sm:text-[13px]">
                {/* Monthly Payment */}
                <div className="flex items-center justify-between py-2 px-3 border-b border-slate-100">
                  <span className="text-slate-500">Monthly Payment</span>
                  <span className="font-semibold text-slate-900">
                    {formatINR(selectedPlan.monthlyPayment)} / mo
                  </span>
                </div>

                {/* Tenure */}
                <div className="flex items-center justify-between py-2 px-3 border-b border-slate-100">
                  <span className="text-slate-500">Tenure</span>
                  <span className="font-semibold text-slate-900">
                    {selectedPlan.tenure} Months
                  </span>
                </div>

                {/* Interest Rate */}
                <div className="flex items-center justify-between py-2 px-3 border-b border-slate-100">
                  <span className="text-slate-500">Interest Rate</span>
                  <span className="font-semibold text-slate-900">
                    {selectedPlan.interestRate === 0
                      ? '0% (No-Cost EMI)'
                      : `${selectedPlan.interestRate}% p.a.`}
                  </span>
                </div>

                {/* Cashback */}
                <div className="flex items-center justify-between py-2 px-3">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Cashback</span>
                  </span>
                  <span className="font-semibold text-emerald-600">
                    +{formatINR(selectedPlan.cashback)}
                  </span>
                </div>
              </div>

              {/* 5. Final Price (Effective Price after Cashback) */}
              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-xs sm:text-sm font-semibold text-slate-800">
                  Effective Price (after cashback)
                </span>
                <span className="text-base sm:text-lg font-bold text-emerald-600">
                  {formatINR(effectivePrice)}
                </span>
              </div>

              {/* 6. Demo Information Card */}
              <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                  <span className="font-semibold text-slate-700">1Fi Marketplace Demo:</span>{' '}
                  No real payment is processed. This confirms your selected EMI plan and variant configuration.
                </p>
              </div>

              {/* 7. Bottom Actions (Change Plan & Proceed with Plan) */}
              <div className="grid grid-cols-2 gap-2.5 pt-0.5">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="w-full h-11 sm:h-12 text-xs sm:text-sm font-semibold border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl cursor-pointer"
                >
                  Change Plan
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => setIsConfirmed(true)}
                  className="w-full h-11 sm:h-12 text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white rounded-xl shadow-xs cursor-pointer"
                >
                  Proceed with Plan
                </Button>
              </div>
            </>
          ) : (
            /* 8. Success State View when "Proceed with Plan" is clicked */
            <div className="py-1 sm:py-2 text-center space-y-3.5 sm:space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100 shadow-2xs">
                <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>

              <div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  EMI Plan Confirmed
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
                  No real payment has been processed. Your selected EMI configuration has been confirmed.
                </p>
              </div>

              {/* Summary Details Breakdown */}
              <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200/80 text-left space-y-2 text-xs sm:text-[13px]">
                <div className="flex items-center justify-between py-1 border-b border-slate-200/60 gap-3">
                  <span className="text-slate-500 shrink-0">Product</span>
                  <span className="font-semibold text-slate-900 text-right truncate">{product.name}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-200/60 gap-3">
                  <span className="text-slate-500 shrink-0">Variant</span>
                  <span className="font-medium text-slate-800 text-right truncate">{variant.color} • {variant.storage}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-200/60 gap-3">
                  <span className="text-slate-500 shrink-0">Plan</span>
                  <span className="font-semibold text-slate-900 text-right">{selectedPlan.tenure} Months</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-200/60 gap-3">
                  <span className="text-slate-500 shrink-0">Monthly Payment</span>
                  <span className="font-semibold text-slate-900 text-right">
                    {formatINR(selectedPlan.monthlyPayment)} / month
                  </span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-200/60 gap-3">
                  <span className="text-slate-500 shrink-0">Interest</span>
                  <span className="font-medium text-slate-800 text-right">
                    {selectedPlan.interestRate === 0
                      ? '0% No-Cost EMI'
                      : `${selectedPlan.interestRate}% p.a.`}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-200/60 gap-3">
                  <span className="text-slate-500 shrink-0 flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Cashback</span>
                  </span>
                  <span className="font-semibold text-emerald-600 text-right">
                    +{formatINR(selectedPlan.cashback)}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1.5 pt-2 gap-3">
                  <span className="font-semibold text-slate-900 shrink-0">Effective Price</span>
                  <span className="font-bold text-emerald-600 text-sm sm:text-base text-right">
                    {formatINR(effectivePrice)}
                  </span>
                </div>
              </div>

              <div className="pt-1">
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleClose}
                  className="w-full h-12 text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white rounded-xl shadow-xs cursor-pointer"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
