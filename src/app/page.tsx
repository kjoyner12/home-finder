import MortgageCalculator from '@/components/calculator/MortgageCalculator'

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Mortgage Calculator</h1>
      <MortgageCalculator />
    </div>
  );
}