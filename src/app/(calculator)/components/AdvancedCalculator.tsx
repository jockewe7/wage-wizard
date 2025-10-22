"use client";
import { useState } from "react";
import { AdvancedCalculatorInputs } from "./AdvancedCalculatorInputs";
import { CalculatorResults } from "./CalculatorResults";
import { CashAccumulationChart } from "./CashAccumulationChart";
import type { CalculationResults } from "../types/calculation";

export const AdvancedCalculator = () => {
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
      <AdvancedCalculatorInputs onResultsChange={handleResultsChange} />
      <CalculatorResults results={results} />
      <CashAccumulationChart remainingCapital={results.remainingCapital} />
    </div>
  );
};
