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

export const SimpleCalculator = () => {
  const billableHours = 1910; // Antal debiterbara timmar per år justerat för röda dagar
  const vacationDays = 25;
  const pension = 6000;
  const monthlySalary = 51250;
  const otherExpensesPerYear = 20000;
  const [hourlyRate, setHourlyRate] = useState<string>("850");
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
    <div className='w-full max-w-6xl mx-auto flex gap-4'>
      <Card className='w-1/4 p-4 md:p-6 shadow-(--shadow-card)'>
       <h2 className='text-xl font-bold text-foreground mb-4'>
          Inställningar
        </h2>
        <div className='flex items-center gap-2'>
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
          />
        </div>
      </Card>
      <Card className='w-2/3 p-4 md:p-6 shadow-(--shadow-card)'>
        <h2 className='text-xl font-bold text-foreground mb-4'>
          Lön och utdelning
        </h2>

         <div className='grid md:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-2'>
          <div className='flex flex-col'>
            <span className='text-sm text-muted-foreground'>Bruttoinkomst</span>
            <span className='font-semibold text-foreground'>
              {formatCurrency(results.grossIncome)}
            </span>
          </div>
          </div>

        
      </Card>
    </div>
  );
};
