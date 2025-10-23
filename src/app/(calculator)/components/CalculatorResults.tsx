"use client";

import { Card } from "@/components/ui/card";
import type { CalculationResults } from "../types/calculation";
import { ResultLabel } from "./ResultLabel";
import { ResultDeduction } from "./ResultDeduction";
import { ResultTotal } from "./ResultTotal";
import { SummaryItem } from "./SummaryItem";

interface CalculatorResultsProps {
  results: CalculationResults;
}

export const CalculatorResults = ({ results }: CalculatorResultsProps) => {

  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>    
      <Card className='p-4 shadow-(--shadow-card)'>
        <h3 className='text-lg font-semibold mb-3 text-foreground'>Lön</h3>
        <div className='space-y-2'>
          <ResultLabel value={results.netSalary} label="Årslön" />
          <ResultDeduction value={results.employerContributions} label="Arbetsgivaravgifter" />
          <ResultDeduction value={results.incomeTax} label="Inkomstskatt" />
          <ResultTotal value={results.netSalary} label="Nettolön" />
        </div>
      </Card>

      <Card className='p-4 shadow-(--shadow-card)'>
        <h3 className='text-lg font-semibold mb-3 text-foreground'>
          Tjänstepension
        </h3>
        <ResultLabel value={results.annualPension} label="Tjänstepension" />
        <ResultDeduction value={results.annualPensionTax} label="Skatt" />
      </Card>

      <Card className='p-4 shadow-(--shadow-card)'>
        <h3 className='text-lg font-semibold mb-3 text-foreground'>
          Vinst och bolagsskatt
        </h3>
        <div className='space-y-2'>
          <ResultLabel value={results.profitAfterSalary} label="Vinst före bolagsskatt" />
          <ResultDeduction value={results.corporateTax} label="Bolagsskatt (20,6%)" />
          <ResultTotal value={results.profitAfterTaxes} label="Vinst efter bolagsskatt" />
        </div>
      </Card>

      <Card className='p-4 shadow-(--shadow-card)'>
        <h3 className='text-lg font-semibold mb-3 text-foreground'>
          Utdelning
        </h3>
        <div className='space-y-2'>
          <ResultLabel value={results.dividendAmount} label="Utdelning före skatt" />
          <ResultDeduction value={results.dividendTax} label="Utdelningsskatt" />
          <ResultTotal value={results.netDividend} label="Nettoutdelning" />
        </div>
      </Card>

      <Card className='p-4 shadow-(--shadow-card) lg:col-span-4'>
        <h3 className='text-lg font-semibold mb-3 text-foreground'>
          Sammanfattning
        </h3>
        <div className='grid md:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-2'>
          <SummaryItem value={results.grossIncome} label="Bruttoinkomst" />
          <SummaryItem 
            value={results.netSalary + results.netDividend} 
            label="Total nettoinkomst" 
            variant="primary" 
          />
          <SummaryItem 
            value={results.annualPension} 
            label="Tjänstepension" 
            variant="primary" 
          />
          <SummaryItem 
            value={results.annualPensionTax + results.incomeTax + results.employerContributions + results.dividendTax + results.corporateTax} 
            label="Skatter & avgifter" 
            variant="destructive"
            isNegative 
          />
          <SummaryItem 
            value={results.remainingCapital} 
            label="Kvar i bolaget" 
            variant="accent" 
          />
        </div>
      </Card>
    </div>
  );
};