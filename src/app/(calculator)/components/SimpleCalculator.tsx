"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { calculateFreelanceEarnings } from "../utils/calculations";
import { NumberInput } from "@/components/ui/number-input";
import { CalculationResults } from "../types/calculation";
import { formatCurrency } from "@/lib/utils";
import { ResultLabel } from "./ResultLabel";
import { SummaryItem } from "./SummaryItem";

export const SimpleCalculator = () => {
  const billableHours = 1910; // Antal debiterbara timmar per år justerat för röda dagar
  const vacationDays = 25;
  const pension = 6000;
  const monthlySalary = 51250;
  const otherExpensesPerYear = 20000;
  const [hourlyRate, setHourlyRate] = useState<string>("");
  useState<CalculationResults>({
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

  useEffect(() => {
    calculateEarnings();
  }, [hourlyRate]);

  const calculateEarnings = () => {
    const inputs = {
      hourlyRate: Number(hourlyRate) || 0,
      vacationDays: Number(vacationDays) || 0,
      desiredSalary: Number(monthlySalary) || 0,
      billableHours: Number(billableHours) || 0,
      desiredPension: Number(pension) || 0,
      otherExpenses: Number(otherExpensesPerYear) || 0,
    };

    const results = calculateFreelanceEarnings(inputs);
  };

  const results = calculateFreelanceEarnings({
    hourlyRate: hourlyRate ? Number(hourlyRate) : 0,
    billableHours,
    vacationDays,
    desiredSalary: monthlySalary,
    desiredPension: pension,
    otherExpenses: otherExpensesPerYear,
  });

  console.log("Results:", results);

  return (
    <div className='w-2/4 max-w-6xl mx-auto flex gap-4'>
      <Card className='p-4 md:p-6 shadow-(--shadow-card) flex-1'>
        <div className='flex flex-col items-center space-y-6'>
          <h2 className='text-xl font-bold text-foreground mb-4'>
            FRILANSKALKYLATOR
          </h2>

          <div className='flex items-center gap-3 w-full max-w-md justify-center'>
            <Label
              htmlFor='hourlyRate'
              className='text-foreground whitespace-nowrap'
            >
              Timpris (SEK)
            </Label>
            <NumberInput
              id='hourlyRate'
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              placeholder='Ange timpris'
              className='w-32'
            />
          </div>

          <div className='w-full'>
            <h3 className='text-lg font-semibold mb-3 text-foreground text-center'>
              RESULTAT
            </h3>
            {results.grossIncome === 0 ? (
              <p className='text-center text-muted-foreground'>
                Ange ditt timpris för att se resultatet.
              </p>
            ) : (
              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2'>
                <SummaryItem
                  value={(results.netSalary + results.netDividend) / 12}
                  label='Nettomånadslön'
                />
                <SummaryItem
                  value={(results.netSalary + results.netDividend) / 12}
                  label='Motsvarar månadslön som anställd'
                />
                <SummaryItem
                  value={results.remainingCapital}
                  label='Kvar i bolaget per år'
                />
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
