"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import type { CalculationResults } from "../types/calculation";
import { calculateFreelanceEarnings } from "../utils/calculations";

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
    const inputs = {
      hourlyRate: Number(hourlyRate) || 0,
      vacationDays: Number(vacationDays) || 0,
      desiredSalary: Number(desiredSalary) || 0,
      billableHours: Number(billableHours) || 0,
      desiredPension: Number(desiredPension) || 0,
      otherExpenses: Number(otherExpenses) || 0,
    };

    const results = calculateFreelanceEarnings(inputs);
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
