import * as React from "react";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

export interface SummaryItemProps {
  value: number;
  label: string;
  className?: string;
  variant?: "default" | "primary" | "destructive" | "accent";
  isNegative?: boolean;
}

const SummaryItem = React.forwardRef<HTMLDivElement, SummaryItemProps>(
  ({ className, value, label, variant = "default", isNegative = false, ...props }) => {
    const getVariantStyles = () => {
      switch (variant) {
        case "primary":
          return "text-primary";
        case "destructive":
          return "text-destructive";
        case "accent":
          return "text-accent-foreground";
        default:
          return "text-foreground";
      }
    };

    return (
      <div className={cn('flex flex-col', className)} {...props}>
        <span className='text-sm text-muted-foreground'>{label}</span>
        <span className={cn('font-semibold', getVariantStyles())}>
          {isNegative ? '-' : ''}{formatCurrency(value)}
        </span>
      </div>
    );
  }
);
SummaryItem.displayName = "SummaryItem";

export { SummaryItem };