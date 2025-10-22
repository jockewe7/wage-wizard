"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import type { CalculationResults } from "../types/calculation";

interface CalculatorSettingsProps {
  onResultsChange: (results: CalculationResults) => void;
}

const ibb = 76_200.0; // Inkomstbasbelopp for 2024
const stateTaxThreshold = 615000.0; // Approx threshold for state tax in 2024

export const AdvancedCalculatorInputs = ({
  onResultsChange,
}: CalculatorSettingsProps) => {
  const [hourlyRate, setHourlyRate] = useState<string>("850");
  const [vacationDays, setVacationDays] = useState<string>("25");
  const [desiredSalary, setDesiredSalary] = useState<string>(
    String(Math.round(stateTaxThreshold / 12))
  );
  const [billableHours, setBillableHours] = useState<string>("1910"); // Antal debiterbara timmar per år justerat för röda dagar
  const [desiredPension, setDesiredPension] = useState<string>("7000");
  const [otherExpenses, setOtherExpenses] = useState<string>("20000");

  useEffect(() => {
    calculateEarnings();
  }, [
    hourlyRate,
    vacationDays,
    desiredSalary,
    billableHours,
    desiredPension,
    otherExpenses,
  ]);

  const calculateEarnings = () => {
    // Calculate gross income
    const hourlyRateNum = Number(hourlyRate) || 0;
    const vacationDaysNum = Number(vacationDays) || 0;
    const desiredSalaryNum = Number(desiredSalary) || 0;
    const billableHoursNum = Number(billableHours) || 0;
    const desiredPensionNum = Number(desiredPension) || 0;
    const otherExpensesNum = Number(otherExpenses) || 0;

    const billedHours = billableHoursNum - vacationDaysNum * 8;
    const grossIncome = hourlyRateNum * billedHours;

    // Calculate salary costs (annual)
    const annualSalary = desiredSalaryNum * 12;

    // Employer contributions (arbetsgivaravgifter) - approximately 31.42%
    const employerContributions = annualSalary * 0.3142;

    // Total salary cost to company
    const totalSalaryCost = annualSalary + employerContributions;

    // Income tax estimation (simplified progressive tax)
    // This is a simplified calculation
    // Possible dividend
    const dividendMax = annualSalary * 0.5;

    let incomeTax = 0;
    if (annualSalary <= stateTaxThreshold) {
      incomeTax = annualSalary * 0.32; // Municipal tax average
    } else {
      incomeTax =
        stateTaxThreshold * 0.32 + (annualSalary - stateTaxThreshold) * 0.52;
    }

    const netSalary = annualSalary - incomeTax;
    const annualPension = desiredPensionNum * 12;
    const annualTotalPensionCost = annualPension * 1.2426; // Including fees and taxes
    const annualPensionTax = annualTotalPensionCost - annualPension;
    // Calculate available for dividends
    const profitAfterSalary =
      grossIncome - totalSalaryCost - annualTotalPensionCost;

    // Corporate tax (20.6%)
    const corporateTax = 0.206 * profitAfterSalary;
    const profitAfterTaxes = profitAfterSalary - corporateTax;

    // Dividend calculation (simplified)
    // Assuming qualified dividend up to certain threshold

    const dividendAmount = Math.max(Math.min(profitAfterTaxes, dividendMax), 0);
    // Dividend tax (approximately 20% on qualified dividends)
    const dividendTax = dividendAmount * 0.2;
    const netDividend = dividendAmount - dividendTax;

    // Remaining capital in company (after other expenses)
    const remainingCapital =
      profitAfterTaxes - dividendAmount - otherExpensesNum;

    console.log("grossIncome", grossIncome);
    console.log("totalSalaryCost", totalSalaryCost);
    console.log("annualPension", annualTotalPensionCost);
    console.log("otherExpenses", otherExpensesNum);
    console.log("profitAfterSalary", profitAfterSalary);
    console.log("profitAfterTaxes", profitAfterTaxes);
    console.log("corporateTax", corporateTax);

    const results: CalculationResults = {
      grossIncome,
      employerContributions,
      totalCost: totalSalaryCost,
      profitAfterSalary,
      corporateTax,
      profitAfterTaxes,
      netSalary,
      annualPension,
      annualPensionTax,
      incomeTax,
      dividendAmount,
      dividendTax,
      netDividend,
      remainingCapital,
    };

    onResultsChange(results);
  };
  return (
    <Card className='p-4 md:p-6 shadow-(--shadow-card)'>
      <h2 className='text-xl font-bold text-foreground mb-4'>Inställningar</h2>

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <div className='space-y-2'>
          <Label htmlFor='hourlyRate' className='text-foreground'>
            Timpris (SEK)
          </Label>
          <Input
            id='hourlyRate'
            type='number'
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            className='text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
            placeholder='Ange timpris'
          />
        </div>

        <div className='space-y-2'>
          <div className='flex items-center gap-2'>
            <Label htmlFor='billableHours' className='text-foreground'>
              Debiterbara timmar/år
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className='h-4 w-4 text-muted-foreground cursor-help' />
                </TooltipTrigger>
                <TooltipContent>
                  <div className='max-w-xs p-2'>
                    <p className='text-sm'>
                      Antal timmar per år som kan debiteras till kund. Beräknas vanligtvis som:
                    </p>
                    <ul className='text-xs mt-2 space-y-1 list-disc list-inside'>
                      <li>Arbetstimmar/år: ~2080h (40h/vecka × 52 veckor)</li>
                      <li>Minus helgdagar: ~80-100h</li>
                      <li>Minus semester: beräknas automatiskt</li>
                      <li>Minus sjukfrånvaro, utbildning, administration: ~200-400h</li>
                    </ul>
                    <p className='text-xs mt-2 font-medium'>
                      Typiskt värde: 1600-1900 timmar/år
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id='billableHours'
            type='number'
            value={billableHours}
            onChange={(e) => setBillableHours(e.target.value)}
            className='text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
            placeholder='Ange debiterbara timmar'
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='desiredSalary' className='text-foreground'>
            Önskad månadslön (SEK)
          </Label>
          <Input
            id='desiredSalary'
            type='number'
            value={desiredSalary}
            onChange={(e) => setDesiredSalary(e.target.value)}
            className='text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
            placeholder='Ange månadslön'
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='vacationDays' className='text-foreground'>
            Semesterdagar
          </Label>
          <Input
            id='vacationDays'
            type='number'
            value={vacationDays}
            onChange={(e) => setVacationDays(e.target.value)}
            className='text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
            placeholder='Ange semesterdagar'
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='desiredPension' className='text-foreground'>
            Önskad tjänstepension (SEK/månad)
          </Label>
          <Input
            id='desiredPension'
            type='number'
            value={desiredPension}
            onChange={(e) => setDesiredPension(e.target.value)}
            className='text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
            placeholder='Ange tjänstepension'
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='otherExpenses' className='text-foreground'>
            Övriga utgifter (SEK/år)
          </Label>
          <Input
            id='otherExpenses'
            type='number'
            value={otherExpenses}
            onChange={(e) => setOtherExpenses(e.target.value)}
            className='text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
            placeholder='Ange årliga utgifter'
          />
        </div>
      </div>
    </Card>
  );
};
