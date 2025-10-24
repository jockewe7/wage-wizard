import * as React from "react";
import { formatCurrency } from "@/lib/utils";

export interface ResultLabelProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  className?: string;
  value: number;
  label: string;
}

const ResultLabel = React.forwardRef<HTMLInputElement, ResultLabelProps>(
  ({ ...props }) => {
    return (
      <div className='flex justify-between items-center'>
        <span className='text-muted-foreground'>{props.label}</span>
        <span className='font-medium text-foreground'>
          {formatCurrency(props.value)}
        </span>
      </div>
    );
  }
);
ResultLabel.displayName = "ResultLabel";

export { ResultLabel };
