import { cva } from "class-variance-authority";

export const iconVariants = cva("", {
  variants: {
    variant: {
      default: "text-brand-primary-500",
      white: "text-white",
      black: "text-black",
      outlineInverted: "text-neutral-base-200",
      success: "text-semantic-success-500",
      warning: "text-semantic-warning-500",
      danger: "text-semantic-error-500",
    },
    size: {
      small: "w-3.5 h-3.5",
      medium: "w-6 h-6",
      large: "w-9 h-9",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "small",
  },
});
