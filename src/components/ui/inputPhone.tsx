import React, { useState } from "react";
import { cn } from "@/lib/utils"; // ajuste o caminho se necessário

export interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(({ className, ...props }, ref) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value.replace(/\D/g, ""); // Remove tudo que não é número

    // Adiciona a máscara conforme o número de caracteres
    if (inputValue.length <= 2) {
      inputValue = inputValue.replace(/(\d{2})(\d{1,})/, "($1) $2");
    } else if (inputValue.length <= 5) {
      inputValue = inputValue.replace(/(\d{2})(\d{5})(\d{1,})/, "($1) $2-$3");
    } else {
      inputValue = inputValue.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }

    setValue(inputValue); 
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
});

PhoneInput.displayName = "PhoneInput";

export default PhoneInput;
