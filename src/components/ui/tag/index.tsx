import { cva } from "class-variance-authority";

import { cn } from "@/lib/styles/utils";

type TagsVariant =
  | "default"
  | "outline"
  | "inverted"
  | "outlineInverted"
  | "success"
  | "warning"
  | "danger";

type TagSize = "default" | "defaultCapsule" | "defaultSquare";

interface TagsProps {
  variant?: TagsVariant;
  size?: TagSize;
}

const tagsVariant = cva(
  "flex justify-center items-center gap-1 whitespace-nowrap text-sm font-medium border-2",
  {
    variants: {
      variant: {
        default: "bg-brand-primary-500 border-brand-primary-500 text-white",
        outline: "bg-black border-black text-white",
        inverted:
          "bg-neutral-base-200 border-neutral-base-200 text-black border-2",
        outlineInverted: "border-neutral-base-200 text-black border-2",
        success:
          "bg-semantic-success-500 border-semantic-success-500 text-white",
        warning:
          "bg-semantic-warning-500 border-semantic-warning-500 text-white",
        danger: "bg-semantic-error-500 border-semantic-error-500 text-white",
      },
      size: {
        default: "w-19 h-6 rounded-3xl",
        defaultCapsule: "w-19 h-6 rounded-3xl",
        defaultSquare: "w-16 h-7 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export function TagComponent({ size, variant }: TagsProps) {
  return <span className={cn(tagsVariant({ size, variant }))}>Nueva</span>;
}
