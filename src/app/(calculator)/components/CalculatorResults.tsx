"use client";

import { Card } from "@/components/ui/card";
import type { CalculationResults } from "../types/calculation";
import { ResultLabel } from "./ResultLabel";
import { ResultDeduction } from "./ResultDeduction";
import { ResultTotal } from "./ResultTotal";
import { SummaryItem } from "./SummaryItem";
import { formatCurrency } from "@/lib/utils";
import { grossFromNetMonthly } from "../utils/calculations";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CalculatorResultsProps {
  results: CalculationResults;
}

export const CalculatorResults = ({ results }: CalculatorResultsProps) => {
  return (
    <div className='space-y-6'>
      {/* Top Row - Income Flow */}
      <div className='grid md:grid-cols-3 gap-4'>
        <Card className='p-4 shadow-(--shadow-card)'>
          <h3 className='text-lg font-semibold mb-3 text-foreground'>Lön</h3>
          <div className='space-y-2'>
            <ResultLabel
              value={results.netSalary + results.incomeTax}
              label='Bruttolön'
            />
            <ResultDeduction value={results.incomeTax} label='Inkomstskatt' />
            <ResultTotal value={results.netSalary} label='Nettolön' />
          </div>
        </Card>

        <Card className='p-4 shadow-(--shadow-card)'>
          <h3 className='text-lg font-semibold mb-3 text-foreground'>
            Tjänstepension
          </h3>
          <ResultLabel value={results.annualPension} label='Tjänstepension' />
        </Card>

        <Card className='p-4 shadow-(--shadow-card)'>
          <h3 className='text-lg font-semibold mb-3 text-foreground'>
            Vinst och bolagsskatt
          </h3>
          <div className='space-y-2'>
            <ResultLabel
              value={results.profitAfterSalary}
              label='Vinst före bolagsskatt'
            />
            <ResultDeduction
              value={results.corporateTax}
              label='Bolagsskatt (20,6%)'
            />
            <ResultTotal
              value={results.profitAfterTaxes}
              label='Vinst efter bolagsskatt'
            />
          </div>
        </Card>
      </div>

      {/* Bottom Row - Dividend & Taxes */}
      <div className='grid md:grid-cols-2 gap-4'>
        <Card className='p-4 shadow-(--shadow-card)'>
          <h3 className='text-lg font-semibold mb-3 text-foreground'>
            Utdelning
          </h3>
          <div className='space-y-2'>
            <ResultLabel
              value={results.dividendAmount}
              label='Utdelning före skatt'
            />
            <ResultDeduction
              value={results.dividendTax}
              label='Utdelningsskatt'
            />
            <ResultTotal value={results.netDividend} label='Nettoutdelning' />
          </div>
        </Card>

        <Card className='p-4 shadow-(--shadow-card)'>
          <h3 className='text-lg font-semibold mb-3 text-foreground'>
            Övriga Skatter & Avgifter
          </h3>
          <div className='space-y-2'>
            <ResultDeduction
              value={results.annualPensionTax}
              label='Skatt på tjänstepension'
            />
            <ResultDeduction
              value={results.employerContributions}
              label='Arbetsgivaravgifter'
            />
          </div>
        </Card>
      </div>

      {/* Summary */}
      <Card className='p-4 shadow-(--shadow-card)'>
        <h3 className='text-lg font-semibold mb-3 text-foreground'>
          Sammanfattning
        </h3>
        <div className='grid md:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-2'>
          <SummaryItem value={results.grossIncome} label='Omsättning' />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-help">
                  <SummaryItem
                    value={results.netSalary + results.netDividend}
                    label='Total nettoinkomst'
                    variant='primary'
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <div className="space-y-1">
                  <p className="font-medium">💰 Årlig nettoinkomst</p>
                  <p className="text-sm text-muted-foreground">
                    Motsvarar en månadslön på{' '}
                    <span className="font-semibold text-foreground">
                      {formatCurrency(
                        grossFromNetMonthly(
                          (results.netSalary + results.netDividend) / 12
                        )
                      )}
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground italic">
                    ✨ Jämfört med traditionell anställning
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <SummaryItem
            value={results.annualPension}
            label='Tjänstepension'
            variant='primary'
          />
          <SummaryItem
            value={
              results.annualPensionTax +
              results.incomeTax +
              results.employerContributions +
              results.dividendTax +
              results.corporateTax
            }
            label='Skatter & avgifter'
            variant='destructive'
            isNegative
          />
          <SummaryItem
            value={results.remainingCapital}
            label='Kvar i bolaget'
            variant='accent'
          />
        </div>
      </Card>
    </div>
  );
};
