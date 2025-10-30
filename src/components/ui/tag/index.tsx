import { cva } from "class-variance-authority";

import { IconName } from "@/components/ui/icon";
import { cn } from "@/lib/styles/utils";

type TagVariants =
  | "default"
  | "outline"
  | "inverted"
  | "outlineInverted"
  | "success"
  | "warning"
  | "danger";

type TagSize = "default" | "defaultCapsule" | "defaultSquare";

interface TagProps {
  text: string;
  size: TagSize;
  variant?: TagVariants;
  leftIcon?: IconName;
}

const tagVariants = cva(
  "inline-flex items-center gap-1 whitespace-nowrap text-sm font-medium border-2",
  {
    variants: {
      variant: {
        default: "bg-brand-primary-500 border-brand-primary-500 text-white",
        outline: "bg-black border-black text-white",
        inverted: "bg-neutral-base-200 border-neutral-base-200 text-black",
        outlineInverted: "border-neutral-base-200 text-black",
        success:
          "bg-semantic-success-500 border-semantic-success-500 text-white",
        warning:
          "bg-semantic-warning-500 border-semantic-warning-500 text-white",
        danger: "bg-semantic-error-500 border-semantic-error-500 text-white",
      },
      size: {
        default: "px-1 py-1",
        defaultCapsule: " rounded-3xl",
        defaultSquare: " rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

/**
 * Muestra una etiqueta de texto con diferentes estilos y tamaños.
 *
 * @param {TagsProps} props Las propiedades para el componente Tag.
 * @param {TagSize} props.size El tamaño de la etiqueta.
 * @param {TagsVariant} [props.variant="default"] La variante de color y estilo de la etiqueta.
 * @param {string} props.text El texto a mostrar en la etiqueta.
 * @returns {JSX.Element} El componente de etiqueta renderizado.
 *
 * @example
 * <TagComponent size="defaultCapsule" variant="success" text="Nuevo" />
 */
export function TagComponent({ size, variant, text, leftIcon }: TagProps) {
  return (
    <span className={cn(tagVariants({ size, variant }))}>
      {leftIcon}
      {text}
    </span>
  );
}
