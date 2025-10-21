"use client";
import { useState } from "react";
import { CalculatorSettings } from "./CalculatorSettings";
import { CalculatorResults } from "./CalculatorResults";
import { CashAccumulationChart } from "./CashAccumulationChart";

interface CalculationResults {
  grossIncome: number;
  employerContributions: number;
  totalCost: number;
  netSalary: number;
  incomeTax: number;
  profitAfterSalary: number;
  corporateTax: number;
  profitAfterTaxes: number;
  annualPension: number;
  annualPensionTax: number;
  dividendAmount: number;
  dividendTax: number;
  netDividend: number;
  remainingCapital: number;
}

export const Calculator = () => {
  const [results, setResults] = useState<CalculationResults>({
    grossIncome: 0,
    employerContributions: 0,
    totalCost: 0,
    netSalary: 0,
    incomeTax: 0,
    profitAfterSalary: 0,
    corporateTax: 0,
    profitAfterTaxes: 0,
    annualPension: 0,
    annualPensionTax: 0,
    dividendAmount: 0,
    dividendTax: 0,
    netDividend: 0,
    remainingCapital: 0,
  });

  const handleResultsChange = (newResults: CalculationResults) => {
    setResults(newResults);
  };



  return (
    <div className='w-full max-w-6xl mx-auto space-y-4'>
      <CalculatorSettings onResultsChange={handleResultsChange} />
      <CalculatorResults results={results} />
      <CashAccumulationChart remainingCapital={results.remainingCapital} />
    </div>
  );
};
