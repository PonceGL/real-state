"use client";
import { cva } from "class-variance-authority";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type InputVariant =
  | "default"
  | "inverted"
  | "outlineInverted"
  | "warning"
  | "danger";

type InputType =
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "number"
  | "password"
  | "search"
  | "tel"
  | "text"
  | "time"
  | "url";

type InputSize = "default" | "fit";

type HtmlInputPprops = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type InputProps = Omit<HtmlInputPprops, "type"> & {
  type?: InputType;
  variant?: InputVariant;
  size?: InputSize;
};

const inputsVariants = cva(
  "px-2.5 py-3 flex justify-center items-center gap-1 whitespace-nowrap text-sm font-medium border-2 outline-none rounded-lg transition duration-300 hover:shadow focus:outline-none focus:shadow-md",
  {
    variants: {
      variant: {
        default:
          "border-neutral-base-600 text-neutral-base-600 focus:border-brand-primary-500 focus:text-neutral-base-800",
        inverted:
          "bg-neutral-base-50 border-neutral-base-50 text-brand-primary-500 focus:bg-brand-primary-100 focus:border-brand-primary-100",
        outlineInverted:
          "border-neutral-base-200 text-neutral-base-200 hover:border-neutral-base-200 focus:border-neutral-base-600 focus:text-neutral-base-600",
        warning:
          "bg-semantic-warning-500 border-semantic-warning-500 text-black hover:bg-semantic-warning-400 hover:border-semantic-warning-400 focus:bg-semantic-warning-100 focus:border-semantic-warning-100 focus:text-semantic-warning-500",
        danger:
          "bg-semantic-error-500 border-semantic-error-500 text-white hover:bg-semantic-error-400 hover:border-semantic-error-400 focus:bg-semantic-error-250 focus:border-semantic-error-250",
      },
      size: {
        default: "w-full",
        fit: "w-fit",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Input({ variant, size, type, ...props }: InputProps) {
  return (
    <input
      className={cn(
        inputsVariants({
          variant,
          size,
        })
      )}
      type={type}
      {...props}
    />
  );
}

export { Input };
