"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle, ArrowRight, Sparkles } from "lucide-react";
import { calculateFreelanceEarnings, grossFromNetMonthly } from "../utils/calculations";
import { NumberInput } from "@/components/ui/number-input";
import { CalculationResults } from "../types/calculation";
import { formatCurrency } from "@/lib/utils";
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
    <div className='max-w-4xl mx-auto'>
      <Card className='p-8 md:p-10 shadow-(--shadow-card) border-0 bg-card/50 backdrop-blur-sm'>
        <div className='flex flex-col items-center space-y-8'>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h2 className='text-2xl md:text-3xl font-bold text-foreground mb-2'>
              Frilans Kalkylator
            </h2>
            <p className="text-muted-foreground">
              Ange ditt timpris och se din potentiella inkomst direkt
            </p>
          </div>

          <div className='flex items-center gap-4 w-full max-w-sm justify-center bg-muted/30 p-6 rounded-xl border border-border/50'>
            <Label
              htmlFor='hourlyRate'
              className='text-foreground whitespace-nowrap font-medium'
            >
              Timpris (SEK)
            </Label>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <NumberInput
              id='hourlyRate'
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              placeholder='850'
              className='w-24 text-center font-semibold'
            />
          </div>

          <div className='w-full'>
            {results.grossIncome < 600 ? (
              <div className="text-center py-12">
                <div className="p-4 bg-muted/20 rounded-full inline-flex mb-4">
                  <HelpCircle className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className='text-muted-foreground text-lg'>
                  Ange ditt timpris för att se resultatet
                </p>
                <p className='text-sm text-muted-foreground mt-2'>
                  Baserat på 1910 fakturerbara timmar per år
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <h3 className='text-xl font-semibold text-foreground text-center mb-6'>
                  📊 Dina Resultat
                </h3>
                <div className='grid md:grid-cols-3 gap-6'>
                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
                    <SummaryItem
                      value={(results.netSalary + results.netDividend) / 12}
                      label='💰 Nettomånadsinkomst'
                      variant="primary"
                    />
                    <div className="mt-3 pt-3 border-t border-primary/10">
                      <p className="text-xs text-muted-foreground mb-1">Motsvarar bruttolön på</p>
                      <p className="text-sm font-medium text-foreground">
                        {formatCurrency(grossFromNetMonthly(((results.netSalary + results.netDividend)/12)))}
                      </p>
                    </div>
                  </div>
                  <div className="bg-muted/30 border border-border/50 rounded-xl p-6 text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="cursor-help">
                            <SummaryItem
                              value={results.remainingCapital}
                              label='🏦 Kvar i bolaget/år'
                              variant="accent"
                            />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <div className="space-y-2">
                            <p className="font-medium">💼 Kapital som stannar i företaget</p>
                            <p className="text-sm text-muted-foreground">
                              Detta är pengarna som blir kvar i ditt AB efter lön, skatter och utdelning. 
                              Kan användas för framtida investeringar, buffert eller högre utdelning nästa år.
                            </p>
                            <p className="text-xs text-muted-foreground italic">
                              ✨ Tips: Bygg upp en kassareserv för säkrare ekonomi!
                            </p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6 text-center">
                    <SummaryItem
                      value={results.annualPensionTax + results.incomeTax + results.employerContributions + results.dividendTax + results.corporateTax}
                      label='💸 Totala skatter/år'
                      variant="destructive"
                    />
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-accent/5 border border-accent/20 rounded-xl">
                  <p className="text-sm text-center text-muted-foreground">
                    <strong>Beräkningsgrund:</strong> Månadslön 51 250 SEK • Tjänstepension 6 000 SEK • 
                    Semesterdagar 25 • Andra kostnader 20 000 SEK/år
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
