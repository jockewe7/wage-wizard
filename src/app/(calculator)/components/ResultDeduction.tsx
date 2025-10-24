import * as React from "react";
import { formatCurrency } from "@/lib/utils";

export interface ResultDeductionProps {
  value: number;
  label: string;
  className?: string;
}

const ResultDeduction = React.forwardRef<HTMLDivElement, ResultDeductionProps>(
  ({ value, label, ...props }) => {
    return (
      <div className='flex justify-between items-center' {...props}>
        <span className='text-muted-foreground'>{label}</span>
        <span className='font-medium text-destructive'>
          -{formatCurrency(value)}
        </span>
      </div>
    );
  }
);
ResultDeduction.displayName = "ResultDeduction";

export { ResultDeduction };