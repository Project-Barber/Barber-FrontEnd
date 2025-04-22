import React from "react";
import { cn } from "@/lib/utils";

export interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, value = "", onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let inputValue = e.target.value.replace(/\D/g, "");

      if (inputValue.length <= 2) {
        inputValue = inputValue;
      } else if (inputValue.length <= 6) {
        inputValue = `(${inputValue.slice(0, 2)}) ${inputValue.slice(2)}`;
      } else if (inputValue.length <= 10) {
        inputValue = `(${inputValue.slice(0, 2)}) ${inputValue.slice(2, 7)}-${inputValue.slice(7)}`;
      } else {
        inputValue = `(${inputValue.slice(0, 2)}) ${inputValue.slice(2, 7)}-${inputValue.slice(7, 11)}`;
      }

      const formattedEvent = {
        ...e,
        target: {
          ...e.target,
          value: inputValue
        }
      };

      onChange?.(formattedEvent as React.ChangeEvent<HTMLInputElement>);
    };

    return (
      <input
        ref={ref}
        {...props}
        value={value}
        onChange={handleChange}
        maxLength={15}
        placeholder="(00) 00000-0000"
        type="tel"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
      />
    );
  }
);

PhoneInput.displayName = "PhoneInput";

export default PhoneInput;
