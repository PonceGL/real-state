"use client";
import { type HTMLInputTypeAttribute } from "react";

import { cn } from "@/lib/utils";

type InputType = Omit<
  HTMLInputTypeAttribute,
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "month"
  | "radio"
  | "range"
  | "reset"
  | "time"
  | "week"
>;

interface InputProps {
  type: InputType;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function Input({ type, value, onChange, placeholder }: InputProps) {
  return (
    <input
      className={cn(`
      w-full px-2.5 py-3 flex justify-center items-center gap-1 whitespace-nowrap text-sm font-medium border-2 outline-none rounded-lg transition duration-300 hover:shadow focus:outline-none focus:shadow-xl
      border-neutral-base-600 text-neutral-base-600 active:border-neutral-base-800 active:text-neutral-base-800
      `)}
      type={type as HTMLInputTypeAttribute}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}

export { Input };
