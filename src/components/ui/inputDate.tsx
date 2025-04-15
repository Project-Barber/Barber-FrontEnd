import React, { useState } from "react";
import { cn } from "@/lib/utils"; // ajuste o caminho se necessário

export interface DateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(({ className, ...props }, ref) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value.replace(/\D/g, ""); // Remove tudo que não é número
    if (inputValue.length <= 2) {
      inputValue = inputValue.replace(/(\d{2})(\d{1,})/, "$1/$2"); // Adiciona o "/"
    } else if (inputValue.length <= 4) {
      inputValue = inputValue.replace(/(\d{2})(\d{2})(\d{1,})/, "$1/$2/$3"); // Adiciona o "/"
    } else {
      inputValue = inputValue.replace(/(\d{2})(\d{2})(\d{4})(\d{1,})/, "$1/$2/$3"); // Finaliza a máscara
    }
    setValue(inputValue); // Atualiza o estado com o valor formatado
  };

  return (
    <input
      placeholder="DD/MM/AAAA"
      ref={ref}
      {...props}
      value={value}
      onChange={handleChange}
      maxLength={10} // Limita a entrada para 10 caracteres (DD/MM/AAAA)
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
    />
  );
});

DateInput.displayName = "DateInput";

export default DateInput;
