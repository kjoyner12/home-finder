'use client';

import MortgageCalculator from '@/components/calculator/MortgageCalculator';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Mortgage Calculator</h1>
      <MortgageCalculator />
    </div>
  );
}