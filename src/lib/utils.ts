import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a number into Indian Rupee (INR) currency format (e.g. ₹1,29,900)
 */
export function formatINR(amount: number | string | null | undefined): string {
  if (amount === null || amount === undefined || isNaN(Number(amount))) {
    return '₹0';
  }
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(numericAmount);
}

/**
 * Format interest rate nicely (e.g. "0% Interest", "10.5% Interest")
 */
export function formatInterestRate(rate: number | string): string {
  const numericRate = typeof rate === 'string' ? parseFloat(rate) : rate;
  if (numericRate === 0) {
    return '0% Interest (No-Cost EMI)';
  }
  return `${numericRate}% p.a.`;
}

/**
 * Calculate savings amount and discount percentage
 */
export function calculateSavings(mrp: number, price: number) {
  const savings = Math.max(0, mrp - price);
  const percentage = mrp > 0 ? Math.round((savings / mrp) * 100) : 0;
  return {
    savings,
    percentage,
  };
}
