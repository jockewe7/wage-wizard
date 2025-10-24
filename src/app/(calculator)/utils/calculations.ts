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
    grossIncome - totalSalaryCost - annualTotalPensionCost - otherExpenses;

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
  const remainingCapital = profitAfterTaxes - dividendAmount;

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

// Reverse gross-from-net for Sweden (2025), tuned for Stockholm.
// Simplified: municipal tax + burial fee + 20% state tax above threshold,
// basic allowance as a flat approximation at high incomes,
// job tax credit (jobbskatteavdrag) as a yearly lump-sum approximation.
// For exact results, use Skatteverkets skattetabeller.

type Options = {
  municipalRate?: number;     // e.g. 0.3060 for Stockholm 2025
  burialFeeRate?: number;     // 0.0007 in Stockholm 2025
  churchFeeRate?: number;     // ~0.0103 if member in Stockholms domkyrkoförs. (set 0 if not)
  stateTaxThreshold?: number; // 625800 for 2025 (after basic allowance)
  basicAllowanceApprox?: number; // simple approx for high incomes, e.g. 15000
  yearlyJobTaxCreditApprox?: number; // e.g. 30000–35000 kr/år around 80–90k/mån
  maxIter?: number;
  tol?: number;
};

export function grossFromNetMonthly(
  targetNetMonthly: number,
  opts: Options = {}
): number {
  const {
    municipalRate = 0.3060,
    burialFeeRate = 0.0007,
    churchFeeRate = 0, // set to 0.0103 if you want to include kyrkoavgift
    stateTaxThreshold = 615_800,
    basicAllowanceApprox = 15_000,
    yearlyJobTaxCreditApprox = 30_000, // try 30k–35k for 80–90k/mån brutto
    maxIter = 200,
    tol = 1e-2,
  } = opts;

  const totalLocalRate = municipalRate + burialFeeRate + churchFeeRate;

  // Annualize for the math
  const targetNetYearly = targetNetMonthly * 12;

  // Tax model -> returns net yearly from gross yearly
  const netFromGrossYearly = (grossY: number): number => {
    const localTax = totalLocalRate * grossY;
    const taxableForState = Math.max(0, (grossY - basicAllowanceApprox) - stateTaxThreshold);
    const stateTax = 0.20 * taxableForState;
    // Very simplified jobbskatteavdrag as a fixed credit:
    const taxBeforeCredit = localTax + stateTax;
    const taxAfterCredit = Math.max(0, taxBeforeCredit - yearlyJobTaxCreditApprox);
    return grossY - taxAfterCredit;
  };

  // Binary search gross yearly
  let lo = targetNetYearly;       // net ≤ gross
  let hi = targetNetYearly * 2.0; // generous upper bound
  for (let i = 0; i < maxIter; i++) {
    const mid = 0.5 * (lo + hi);
    const net = netFromGrossYearly(mid);
    if (net < targetNetYearly) lo = mid; else hi = mid;
    if (Math.abs(net - targetNetYearly) < tol) break;
  }
  return hi / 12; // back to monthly gross
}

