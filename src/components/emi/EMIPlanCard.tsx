'use client';

import React from 'react';
import { EMIPlan } from '@/types/emi';
import { formatINR, formatInterestRate } from '@/lib/utils';
import { Gift, CheckCircle2, Circle } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface EMIPlanCardProps {
  plan: EMIPlan;
  isSelected: boolean;
  onSelect: (plan: EMIPlan) => void;
}

export function EMIPlanCard({ plan, isSelected, onSelect }: EMIPlanCardProps) {
  const isNoCost = plan.interestRate === 0;

  return (
    <div
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      onClick={() => onSelect(plan)}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          onSelect(plan);
        }
      }}
      className={`group relative flex flex-col p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer select-none focus-visible:outline-emerald-600 ${
        isSelected
          ? 'border-emerald-600 bg-emerald-50/40 ring-2 ring-emerald-500/20 shadow-md'
          : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
      }`}
    >
      {/* Top Row: Tenure & Radio */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-extrabold text-slate-900">
            {plan.tenure} Months
          </span>
          {isNoCost ? (
            <Badge variant="success" size="sm">
              0% No-Cost
            </Badge>
          ) : (
            <Badge variant="neutral" size="sm">
              {plan.interestRate}% p.a.
            </Badge>
          )}
        </div>

        {/* Radio Indicator */}
        <div className="shrink-0">
          {isSelected ? (
            <div className="flex items-center gap-1 text-emerald-600">
              <CheckCircle2 className="w-5 h-5 fill-emerald-600 text-white" />
            </div>
          ) : (
            <Circle className="w-5 h-5 text-slate-300 group-hover:text-slate-400" />
          )}
        </div>
      </div>

      {/* Monthly Payment */}
      <div className="mt-3">
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {formatINR(plan.monthlyPayment)}
          </span>
          <span className="text-xs font-semibold text-slate-500">/ month</span>
        </div>
        <p className="text-[11px] text-slate-500 mt-0.5">
          {isNoCost
            ? 'Total interest: ₹0 (Subsidized)'
            : `Interest: ${formatInterestRate(plan.interestRate)}`}
        </p>
      </div>

      {/* Cashback Perk */}
      {plan.cashback > 0 && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
          <Gift className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>{formatINR(plan.cashback)} Cashback on completion</span>
        </div>
      )}
    </div>
  );
}
