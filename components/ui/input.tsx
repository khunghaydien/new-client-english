"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  required?: boolean;
  keyname?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      startIcon,
      endIcon,
      error,
      errorMessage,
      label,
      required,
      keyname,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block mb-2 text-sm" htmlFor={keyname}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className={cn(startIcon || endIcon ? "relative" : "")}>
          {startIcon && (
            <div
              className={cn(
                "absolute inset-y-0 start-0 flex items-center ps-3"
              )}
            >
              {startIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              { ["pl-8"]: startIcon },
              { ["pr-8"]: endIcon },
              { ["border-destructive"]: error && errorMessage },
              className
            )}
            ref={ref}
            {...props}
          />
          {!!endIcon && (
            <div
              className={cn("absolute inset-y-0 end-2 flex items-center ps-3")}
            >
              {endIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="error-message-scroll text-red-500 text-xs absolute z-[-1]">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
