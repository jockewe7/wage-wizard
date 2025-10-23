import * as React from "react";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

export interface ResultTotalProps {
  value: number;
  label: string;
  className?: string;
  variant?: "primary" | "accent";
}

const ResultTotal = React.forwardRef<HTMLDivElement, ResultTotalProps>(
  ({ className, value, label, variant = "primary", ...props }) => {
    return (
      <div className={cn('flex justify-between items-center pt-3 border-t border-border', className)} {...props}>
        <span className='text-muted-foreground'>{label}</span>
        <span className={cn(
          'font-semibold text-lg',
          variant === "primary" ? 'text-primary' : 'text-accent-foreground'
        )}>
          {formatCurrency(value)}
        </span>
      </div>
    );
  }
);
ResultTotal.displayName = "ResultTotal";

export { ResultTotal };