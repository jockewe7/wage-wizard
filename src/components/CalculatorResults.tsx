"use client";

import { Card } from "@/components/ui/card";

interface CalculationResults {
  grossIncome: number;
  employerContributions: number;
  totalCost: number;
  netSalary: number;
  incomeTax: number;
  annualPension: number;
  annualPensionTax: number;
  profitAfterSalary: number;
  corporateTax: number;
  profitAfterTaxes: number;
  dividendAmount: number;
  dividendTax: number;
  netDividend: number;
  remainingCapital: number;
}

interface CalculatorResultsProps {
  results: CalculationResults;
}

export const CalculatorResults = ({ results }: CalculatorResultsProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("sv-SE", {
      style: "currency",
      currency: "SEK",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>    
      <Card className='p-4 shadow-(--shadow-card)'>
        <h3 className='text-lg font-semibold mb-3 text-foreground'>Lön</h3>
        <div className='space-y-2'>
          <div className='flex justify-between items-center'>
            <span className='text-muted-foreground'>Årslön</span>
            <span className='font-medium text-foreground'>
              {formatCurrency(results.netSalary)}
            </span>
          </div>

          <div className='flex justify-between items-center'>
            <span className='text-muted-foreground'>Arbetsgivaravgifter</span>
            <span className='font-medium text-destructive'>
              -{formatCurrency(results.employerContributions)}
            </span>
          </div>
          <div className='flex justify-between items-center'>
            <span className='text-muted-foreground'>Inkomstskatt</span>
            <span className='font-medium text-destructive'>
              -{formatCurrency(results.incomeTax)}
            </span>
          </div>
          <div className='flex justify-between items-center pt-3 border-t border-border'>
            <span className='text-muted-foreground'>Nettolön</span>
            <span className='font-semibold text-lg text-primary'>
              {formatCurrency(results.netSalary)}
            </span>
          </div>
        </div>
      </Card>

      <Card className='p-4 shadow-(--shadow-card)'>
        <h3 className='text-lg font-semibold mb-3 text-foreground'>
          Tjänstepension
        </h3>
        <div className='flex justify-between items-center'>
          <span className='text-muted-foreground'>Tjänstepension</span>
          <span className='font-medium text-foreground'>
            {formatCurrency(results.annualPension)}
          </span>
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-muted-foreground'>Skatt</span>
          <span className='font-medium text-destructive'>
            -{formatCurrency(results.annualPensionTax)}
          </span>
        </div>
      </Card>

      <Card className='p-4 shadow-(--shadow-card)'>
        <h3 className='text-lg font-semibold mb-3 text-foreground'>
          Vinst och bolagsskatt
        </h3>
        <div className='space-y-2'>
          <div className='flex justify-between items-center'>
            <span className='text-muted-foreground'>
              Vinst före bolagsskatt
            </span>
            <span className='font-medium text-foreground'>
              {formatCurrency(results.profitAfterSalary)}
            </span>
          </div>
          <div className='flex justify-between items-center'>
            <span className='text-muted-foreground'>Bolagsskatt (20,6%)</span>
            <span className='font-medium text-destructive'>
              -{formatCurrency(results.corporateTax)}
            </span>
          </div>
          <div className='flex justify-between items-center pt-3 border-t border-border'>
            <span className='text-muted-foreground'>Vinst efter bolagsskatt</span>
            <span className='font-semibold text-lg text-primary'>
              {formatCurrency(results.profitAfterTaxes)}
            </span>
          </div>
        </div>
      </Card>

      <Card className='p-4 shadow-(--shadow-card)'>
        <h3 className='text-lg font-semibold mb-3 text-foreground'>
          Utdelning
        </h3>
        <div className='space-y-2'>
          <div className='flex justify-between items-center'>
            <span className='text-muted-foreground'>
              Utdelning före skatt
            </span>
            <span className='font-medium text-foreground'>
              {formatCurrency(results.dividendAmount)}
            </span>
          </div>
          <div className='flex justify-between items-center'>
            <span className='text-muted-foreground'>Utdelningsskatt</span>
            <span className='font-medium text-destructive'>
              -{formatCurrency(results.dividendTax)}
            </span>
          </div>
          <div className='flex justify-between items-center pt-3 border-t border-border'>
            <span className='text-muted-foreground'>Nettoutdelning</span>
            <span className='font-semibold text-lg text-primary'>
              {formatCurrency(results.netDividend)}
            </span>
          </div>
        </div>
      </Card>

      <Card className='p-4 shadow-(--shadow-card) lg:col-span-4'>
        <h3 className='text-lg font-semibold mb-3 text-foreground'>
          Sammanfattning
        </h3>
        <div className='grid md:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-2'>
          <div className='flex flex-col'>
            <span className='text-sm text-muted-foreground'>Bruttoinkomst</span>
            <span className='font-semibold text-foreground'>
              {formatCurrency(results.grossIncome)}
            </span>
          </div>
          <div className='flex flex-col'>
            <span className='text-sm text-muted-foreground'>Total nettoinkomst</span>
            <span className='font-semibold text-primary'>
              {formatCurrency(results.netSalary + results.netDividend)}
            </span>
          </div>
          <div className='flex flex-col'>
            <span className='text-sm text-muted-foreground'>Tjänstepension</span>
            <span className='font-semibold text-primary'>
              {formatCurrency(results.annualPension)}
            </span>
          </div>
          <div className='flex flex-col'>
            <span className='text-sm text-muted-foreground'>Skatter & avgifter</span>
            <span className='font-semibold text-destructive'>
              -{formatCurrency(results.annualPensionTax + results.incomeTax + results.employerContributions + results.dividendTax + results.corporateTax)}
            </span>
          </div>
          <div className='flex flex-col'>
            <span className='text-sm text-muted-foreground'>Kvar i bolaget</span>
            <span className='font-semibold text-accent-foreground'>
              {formatCurrency(results.remainingCapital)}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};