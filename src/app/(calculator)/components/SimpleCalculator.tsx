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

export const SimpleCalculator = () => {
  const billableHours = 1910; // Antal debiterbara timmar per år justerat för röda dagar
  const vacationDays = 25;
  const pension = 6000;
  const monthlySalary = 51250;
  const otherExpensesPerYear = 20000;
  const [hourlyRate, setHourlyRate] = useState<string>("850");

  const results = calculateFreelanceEarnings({
    hourlyRate: hourlyRate ? Number(hourlyRate) : 0,
    billableHours,
    vacationDays,
    desiredSalary: monthlySalary,
    desiredPension: pension,
    otherExpenses: otherExpensesPerYear,
  });

  console.log("Results:", results);

  return <div> Hello there... </div>;
};
