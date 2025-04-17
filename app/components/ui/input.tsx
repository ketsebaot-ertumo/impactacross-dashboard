// components/ui/input.tsx

import * as React from "react";
import { cn } from "@/app/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; // Add label as an optional prop
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className = "", label, ...props }, ref) => {
  return (
    <div className="space-y-1 text-gray-600">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        ref={ref}
        {...props}
        className={cn(
          "flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          className
        )}
      />
    </div>
  );
});

Input.displayName = "Input";

export { Input };
