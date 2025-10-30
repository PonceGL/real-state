import { cva } from "class-variance-authority";

import { Icon, IconName } from "@/components/ui/icon";
import { cn } from "@/lib/styles/utils";

export type TagColors =
  | "primary"
  | "black"
  | "white"
  | "gray"
  | "success"
  | "warning"
  | "danger";

export type TagVariants = "capsule" | "square";

interface TagProps {
  text: string;
  color: TagColors;
  isOutline?: boolean;
  isFit?: boolean;
  variant?: TagVariants;
  iconName?: IconName;
}

const tagVariants = cva(
  "flex justify-center items-center h-fit w-fit truncate max-w-52 gap-1 border-2",
  {
    variants: {
      variant: {
        capsule: "rounded-3xl",
        square: "rounded-md",
      },
      color: {
        primary: "bg-brand-primary-500 border-brand-primary-500 text-white",
        black: "bg-black border-black text-white",
        white: "border-neutral-base-200 text-black",
        gray: "bg-neutral-base-200 border-neutral-base-200 text-black",
        success:
          "bg-semantic-success-500 border-semantic-success-500 text-white",
        warning:
          "bg-semantic-warning-500 border-semantic-warning-500 text-white",
        danger: "bg-semantic-error-500 border-semantic-error-500 text-white",
      },
      isOutline: {
        filled: "",
        outline: "bg-transparent",
      },
      isFit: {
        full: "py-1 px-3.5",
        fit: "py-0.5 px-1.5",
      },
    },
    defaultVariants: {
      variant: "capsule",
      color: "primary",
      isOutline: "filled",
      isFit: "full",
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
export function Tag({
  variant,
  text,
  iconName,
  color,
  isOutline,
  isFit,
}: TagProps) {
  return (
    <span
      className={cn(
        tagVariants({
          variant,
          color,
          isOutline: isOutline ? "outline" : "filled",
          isFit: isFit ? "fit" : "full",
        })
      )}
    >
      {iconName && <Icon name={iconName} size="small" />}
      {text}
    </span>
  );
}
