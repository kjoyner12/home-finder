'use client';

import React, { useState, useMemo } from 'react';

const MortgageCalculator = () => {
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

  const calculateMonthlyPayment = (homePrice: number, interestRate: number): number => {
    const principal = Math.max(0, homePrice - downPaymentAmount);
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    const basePayment = principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const monthlyTax = (homePrice * (taxRate / 100)) / 12;
    
    let monthlyPMI = 0;
    const downPaymentPercent = (downPaymentAmount / homePrice) * 100;
    if (downPaymentPercent < 20) {
      monthlyPMI = (principal * (pmiRate / 100)) / 12;
    }
    
    return basePayment + monthlyTax + monthlyPMI;
  };

  const getAffordabilityColor = (payment: number): string => {
    const maxRatioGross = 0.28;
    const maxTotalDTI = 0.43;
    
    const totalMonthlyDebt = payment + monthlyDebts;
    const maxPayment = monthlyIncome * maxRatioGross;
    
    if (totalMonthlyDebt / monthlyIncome > maxTotalDTI) {
      return 'rgb(139, 0, 0)';
    }
    
    if (payment <= maxPayment * 0.8) {
      return 'rgb(200, 255, 200)';
    } else if (payment <= maxPayment) {
      return 'rgb(255, 255, 200)';
    } else if (payment <= maxPayment * 1.2) {
      return 'rgb(255, 200, 200)';
    } else {
      return 'rgb(139, 0, 0)';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Mortgage Payment Calculator</h2>
        <p className="text-gray-600">Calculate monthly payments and affordability based on your income</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Down Payment</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
              <input
                type="number"
                value={downPaymentAmount}
                onChange={(e) => setDownPaymentAmount(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-2 border rounded-md"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Loan Term (years)</label>
            <select
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value={15}>15 years</option>
              <option value={30}>30 years</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Property Tax Rate (%)</label>
            <input
              type="number"
              value={taxRate}
              onChange={(e) => setTaxRate(Number(e.target.value))}
              step={0.1}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">PMI Rate (%)</label>
            <input
              type="number"
              value={pmiRate}
              onChange={(e) => setPmiRate(Number(e.target.value))}
              step={0.1}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Monthly Income</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
              <input
                type="number"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-2 border rounded-md"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Monthly Debts</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
              <input
                type="number"
                value={monthlyDebts}
                onChange={(e) => setMonthlyDebts(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="font-semibold mb-3">Affordability Guidelines</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[rgb(200,255,200)] rounded"></div>
              <span>Comfortable</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[rgb(255,255,200)] rounded"></div>
              <span>Moderate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[rgb(255,200,200)] rounded"></div>
              <span>Stretched</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[rgb(139,0,0)] rounded"></div>
              <span>Unaffordable</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-3 bg-gray-50 text-left">Home Price/Interest</th>
                {interestRates.map(rate => (
                  <th key={rate} className="border p-3 bg-gray-50 text-center">
                    {rate}%
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {homePrices.map(price => (
                <tr key={price}>
                  <td className="border p-3 font-medium">
                    ${price.toLocaleString()}
                  </td>
                  {interestRates.map(rate => {
                    const payment = calculateMonthlyPayment(price, rate);
                    return (
                      <td
                        key={rate}
                        className="border p-3 text-center"
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
      </div>
    </div>
  );
};

export default MortgageCalculator;