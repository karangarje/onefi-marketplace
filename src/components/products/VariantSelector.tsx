'use client';

import React from 'react';
import { Variant } from '@/types/product';
import { Check } from 'lucide-react';

interface VariantSelectorProps {
  variants: Variant[];
  selectedVariant: Variant;
  onVariantChange: (variant: Variant) => void;
}

export function VariantSelector({
  variants,
  selectedVariant,
  onVariantChange,
}: VariantSelectorProps) {
  // Get all unique colors
  const availableColors = Array.from(new Set(variants.map((v) => v.color)));

  // Get all unique storages
  const availableStorages = Array.from(new Set(variants.map((v) => v.storage)));

  // Color hex approximation for visual dot
  const getColorHex = (colorName: string): string => {
    const lower = colorName.toLowerCase();
    if (lower.includes('silver')) return '#e2e8f0';
    if (lower.includes('black')) return '#0f172a';
    if (lower.includes('gray')) return '#64748b';
    if (lower.includes('violet')) return '#7c3aed';
    if (lower.includes('blue')) return '#0284c7';
    return '#94a3b8';
  };

  const handleColorChange = (newColor: string) => {
    // Try to find a variant with newColor and current storage
    let match = variants.find(
      (v) => v.color === newColor && v.storage === selectedVariant.storage
    );
    // If not found, find the first variant with newColor
    if (!match) {
      match = variants.find((v) => v.color === newColor);
    }
    if (match) {
      onVariantChange(match);
    }
  };

  const handleStorageChange = (newStorage: string) => {
    // Try to find a variant with current color and newStorage
    let match = variants.find(
      (v) => v.color === selectedVariant.color && v.storage === newStorage
    );
    // If not found, find the first variant with newStorage
    if (!match) {
      match = variants.find((v) => v.storage === newStorage);
    }
    if (match) {
      onVariantChange(match);
    }
  };

  return (
    <div className="space-y-6">
      {/* Color Selection */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Color
          </label>
          <span className="text-xs font-bold text-slate-800">
            {selectedVariant.color}
          </span>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {availableColors.map((color) => {
            const isSelected = selectedVariant.color === color;
            const hex = getColorHex(color);

            return (
              <button
                key={color}
                type="button"
                onClick={() => handleColorChange(color)}
                className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/50 text-emerald-950 ring-2 ring-emerald-500/20 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/15 shrink-0 shadow-xs"
                  style={{ backgroundColor: hex }}
                />
                <span>{color}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 ml-0.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Storage Selection */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Storage
          </label>
          <span className="text-xs font-bold text-slate-800">
            {selectedVariant.storage}
          </span>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {availableStorages.map((storage) => {
            const isSelected = selectedVariant.storage === storage;
            // Check if this storage exists for current color
            const existsForCurrentColor = variants.some(
              (v) => v.color === selectedVariant.color && v.storage === storage
            );

            return (
              <button
                key={storage}
                type="button"
                onClick={() => handleStorageChange(storage)}
                className={`flex items-center justify-between min-w-28 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/50 text-emerald-950 ring-2 ring-emerald-500/20 shadow-xs'
                    : existsForCurrentColor
                    ? 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    : 'border-dashed border-slate-200 bg-slate-50 text-slate-400 hover:border-slate-300'
                }`}
              >
                <span>{storage}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
