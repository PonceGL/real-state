import { cva } from "class-variance-authority";

export const iconVariants = cva("", {
  variants: {
    variant: {
      default: "stroke-brand-primary-500",
      white: "stroke-white",
      black: "stroke-black",
      outlineInverted: "stroke-neutral-base-200",
      whatsapp: "stroke-semantic-success-500",
      warning: "stroke-semantic-warning-500",
      danger: "stroke-semantic-error-500",
    },
    size: {
      small: "w-1.5 h-1.5",
      medium: "w-2.5 h-2.5",
      large: "w-3.5 h-3.5",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "small",
  },
});
