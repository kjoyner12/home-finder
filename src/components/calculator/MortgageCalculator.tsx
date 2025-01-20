'use client';

import React, { useState, useMemo } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';

interface PaymentData {
  price: number;
  rate: number;
  payment: number;
}

const MortgageCalculator = () => {
  // State management with TypeScript types
  const [downPaymentAmount, setDownPaymentAmount] = useState<number>(80000);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [taxRate, setTaxRate] = useState<number>(1.2);
  const [pmiRate, setPmiRate] = useState<number>(0.5);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(10000);
  const [monthlyDebts, setMonthlyDebts] = useState<number>(0);
  
  // Generate home prices from 250,000 to 675,000 in 25,000 increments
  const homePrices = useMemo(() => {
    const prices: number[] = [];
    for (let price = 250000; price <= 675000; price += 25000) {
      prices.push(price);
    }
    return prices;
  }, []);

  const interestRates = [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8];

  // Calculate monthly mortgage payment
  const calculateMonthlyPayment = (homePrice: number, interestRate: number): number => {
    const principal = Math.max(0, homePrice - downPaymentAmount);
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    // Calculate base mortgage payment
    const basePayment = principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    // Calculate monthly property tax
    const monthlyTax = (homePrice * (taxRate / 100)) / 12;
    
    // Calculate PMI if down payment is less than 20%
    let monthlyPMI = 0;
    const downPaymentPercent = (downPaymentAmount / homePrice) * 100;
    if (downPaymentPercent < 20) {
      monthlyPMI = (principal * (pmiRate / 100)) / 12;
    }
    
    return basePayment + monthlyTax + monthlyPMI;
  };

  // Calculate affordability based on debt-to-income ratio
  const getAffordabilityColor = (payment: number): string => {
    const maxRatioGross = 0.28; // 28% of gross for housing (front-end DTI)
    const maxTotalDTI = 0.43; // 43% maximum total DTI (back-end DTI)
    
    const totalMonthlyDebt = payment + monthlyDebts;
    const maxPayment = monthlyIncome * maxRatioGross;
    
    // Check total DTI
    if (totalMonthlyDebt / monthlyIncome > maxTotalDTI) {
      return 'rgb(139, 0, 0)'; // Unaffordable - dark red
    }
    
    // Housing payment affordability tiers
    if (payment <= maxPayment * 0.8) {
      return 'rgb(200, 255, 200)'; // Comfortable - light green
    } else if (payment <= maxPayment) {
      return 'rgb(255, 255, 200)'; // Moderate - light yellow
    } else if (payment <= maxPayment * 1.2) {
      return 'rgb(255, 200, 200)'; // Stretched - light red
    } else {
      return 'rgb(139, 0, 0)'; // Unaffordable - dark red
    }
  };

  const InputField: React.FC<{
    label: string;
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    prefix?: string;
    suffix?: string;
  }> = ({ label, value, onChange, min, max, step = 1, prefix, suffix }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min}
          max={max}
          step={step}
          className={
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background " +
            "file:border-0 file:bg-transparent file:text-sm file:font-medium " +
            "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 " +
            "focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 " +
            (prefix ? "pl-8" : "")
          }
        />
        {suffix && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Mortgage Payment Calculator</CardTitle>
        <CardDescription>
          Calculate monthly payments and affordability based on your income
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <InputField
            label="Down Payment"
            value={downPaymentAmount}
            onChange={setDownPaymentAmount}
            min={0}
            step={1000}
            prefix="$"
          />

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              Loan Term (years)
            </label>
            <select
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            >
              <option value={15}>15 years</option>
              <option value={30}>30 years</option>
            </select>
          </div>

          <InputField
            label="Property Tax Rate"
            value={taxRate}
            onChange={setTaxRate}
            min={0}
            max={5}
            step={0.1}
            suffix="%"
          />

          <InputField
            label="PMI Rate"
            value={pmiRate}
            onChange={setPmiRate}
            min={0}
            max={2}
            step={0.1}
            suffix="%"
          />

          <InputField
            label="Monthly Income"
            value={monthlyIncome}
            onChange={setMonthlyIncome}
            min={0}
            step={100}
            prefix="$"
          />

          <InputField
            label="Monthly Debts"
            value={monthlyDebts}
            onChange={setMonthlyDebts}
            min={0}
            step={100}
            prefix="$"
          />
        </div>

        <div className="text-sm mb-4 space-y-2">
          <h4 className="font-semibold">Affordability Guidelines:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[rgb(200,255,200)]"></div>
              <span>Comfortable</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[rgb(255,255,200)]"></div>
              <span>Moderate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[rgb(255,200,200)]"></div>
              <span>Stretched</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[rgb(139,0,0)]"></div>
              <span className="text-gray-700">Unaffordable</span>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="p-2 border text-left bg-gray-50">Home Price/Interest</th>
                {interestRates.map(rate => (
                  <th key={rate} className="p-2 border text-center bg-gray-50">
                    {rate}%
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {homePrices.map(price => (
                <tr key={price}>
                  <td className="p-2 border font-medium">
                    ${price.toLocaleString()}
                  </td>
                  {interestRates.map(rate => {
                    const payment = calculateMonthlyPayment(price, rate);
                    return (
                      <td
                        key={rate}
                        className="p-2 border text-center transition-colors"
                        style={{
                          backgroundColor: getAffordabilityColor(payment),
                          color: getAffordabilityColor(payment) === 'rgb(139, 0, 0)' ? 'white' : 'black'
                        }}
                      >
                        ${Math.round(payment).toLocaleString()}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default MortgageCalculator;