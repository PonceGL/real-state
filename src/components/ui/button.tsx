"use client";
import { cva } from "class-variance-authority";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

import { cn } from "@/lib/utils";

type ButtonVariant =
  | "default"
  | "outline"
  | "inverted"
  | "whatsapp"
  | "warning"
  | "danger";

type ButtonSize = "default" | "fit";

interface ButtonProps {
  text: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  link?: Url;
  onAction?: () => void;
}

const buttonVariants = cva(
  "px-2.5 py-3 flex justify-center items-center gap-1 whitespace-nowrap text-sm font-medium border-2 outline-none rounded-lg transition duration-300 hover:shadow focus:outline-none active:outline-none active:shadow-xl",
  {
    variants: {
      variant: {
        default:
          "bg-brand-primary-500 border-brand-primary-500 text-white hover:bg-brand-primary-400 hover:border-brand-primary-400 active:bg-brand-primary-250 active:border-brand-primary-250",
        outline:
          "border-brand-primary-500 text-brand-primary-500 hover:border-brand-primary-400 active:border-brand-primary-250 active:text-brand-primary-250",
        inverted:
          "bg-neutral-base-50 border-neutral-base-50 text-brand-primary-500 active:bg-brand-primary-100 active:border-brand-primary-100",
        whatsapp:
          "bg-semantic-success-500 border-semantic-success-500 text-white hover:bg-semantic-success-400 hover:border-semantic-success-400 active:bg-semantic-success-250 active:border-semantic-success-250",
        warning:
          "bg-semantic-warning-500 border-semantic-warning-500 text-black hover:bg-semantic-warning-400 hover:border-semantic-warning-400 active:bg-semantic-warning-100 active:border-semantic-warning-100 active:text-semantic-warning-500",
        danger:
          "bg-semantic-error-500 border-semantic-error-500 text-white hover:bg-semantic-error-400 hover:border-semantic-error-400 active:bg-semantic-error-250 active:border-semantic-error-250",
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

function Button({ text, onAction, link, variant, size }: ButtonProps) {
  return (
    <>
      {!link ? (
        <button
          className={cn(buttonVariants({ variant, size }))}
          onClick={onAction}
        >
          <p className="font-bold">L</p> {/*  TODO: aqui van los iconos */}
          {text}
          <p className="font-bold">R</p> {/*  TODO: aqui van los iconos */}
        </button>
      ) : (
        <Link href={link} className={cn(buttonVariants({ variant, size }))}>
          {text}
        </Link>
      )}
    </>
  );
}

export { Button, buttonVariants };
