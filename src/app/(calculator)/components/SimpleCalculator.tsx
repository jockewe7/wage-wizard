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

export const SimpleCalculator = () => {
  const thello = () => {};
  const [monthlySalary, setMonthlySalary] = useState<string>("50000");
  
  return <div> Hello there... </div>;
};
