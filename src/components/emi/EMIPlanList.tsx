'use client';

import React from 'react';
import { EMIPlan } from '@/types/emi';
import { EMIPlanCard } from './EMIPlanCard';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';

interface EMIPlanListProps {
  plans: EMIPlan[];
  selectedPlan: EMIPlan | null;
  onSelectPlan: (plan: EMIPlan) => void;
  onProceed: () => void;
  errorMessage?: string | null;
}

export function EMIPlanList({
  plans,
  selectedPlan,
  onSelectPlan,
  onProceed,
  errorMessage,
}: EMIPlanListProps) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900">
            Choose your EMI plan
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Choose from the available tenures and interest rates below.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200 self-start sm:self-auto">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>API-Backed Plans</span>
        </div>
      </div>

      {/* Plans Grid */}
      <div
        role="radiogroup"
        aria-label="Available EMI Plans"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5"
      >
        {plans.map((plan) => (
          <EMIPlanCard
            key={plan.id}
            plan={plan}
            isSelected={selectedPlan?.id === plan.id}
            onSelect={onSelectPlan}
          />
        ))}
      </div>

      {/* Validation Error Message */}
      {errorMessage && (
        <div
          role="alert"
          className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold animate-fade-in"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Proceed CTA */}
      <div className="pt-2">
        <Button
          type="button"
          onClick={onProceed}
          size="lg"
          className="w-full text-base py-4 shadow-md group"
        >
          <span>Proceed with EMI</span>
          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
        <p className="text-center text-[11px] text-slate-400 mt-2">
          Select a plan above, then confirm your EMI selection.
        </p>
      </div>
    </div>
  );
}
