import type { CalculationResults } from "../types/calculation";

export interface CalculationInputs {
  hourlyRate: number;
  billableHours: number;
  vacationDays: number;
  desiredSalary: number;
  desiredPension: number;
  otherExpenses: number;
}

const ibb = 76_200.0; // Inkomstbasbelopp for 2024
const stateTaxThreshold = 615000.0; // Approx threshold for state tax in 2024

export const calculateFreelanceEarnings = (inputs: CalculationInputs): CalculationResults => {
  const {
    hourlyRate,
    billableHours,
    vacationDays,
    desiredSalary,
    desiredPension,
    otherExpenses,
  } = inputs;

  // Calculate gross income
  const billedHours = billableHours - vacationDays * 8;
  const grossIncome = hourlyRate * billedHours;

  // Calculate salary costs (annual)
  const annualSalary = desiredSalary * 12;

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
  const annualPension = desiredPension * 12;
  const annualTotalPensionCost = annualPension * 1.2426; // Including fees and taxes
  const annualPensionTax = annualTotalPensionCost - annualPension;

  // Calculate available for dividends
  const profitAfterSalary =
    grossIncome - totalSalaryCost - annualTotalPensionCost;

  // Corporate tax (20.6%)
  const corporateTax = Math.max(0.206 * profitAfterSalary, 0);
  const profitAfterTaxes = profitAfterSalary - corporateTax;

  // Dividend calculation (simplified)
  // Assuming qualified dividend up to certain threshold
  const dividendAmount = Math.max(Math.min(profitAfterTaxes, dividendMax), 0);
  
  // Dividend tax (approximately 20% on qualified dividends)
  const dividendTax = dividendAmount * 0.2;
  const netDividend = dividendAmount - dividendTax;

  // Remaining capital in company (after other expenses)
  const remainingCapital = profitAfterTaxes - dividendAmount - otherExpenses;

  return {
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
};