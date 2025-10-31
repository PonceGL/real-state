import { cva } from "class-variance-authority";
import { useMemo } from "react";

import { Icon, IconName } from "@/components/ui/icon";
import { cn } from "@/lib/styles/utils";
import { IconColor } from "@/types/icons";

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

const tagVariants = cva("h-fit w-fit max-w-52 gap-1 border-2", {
  variants: {
    variant: {
      capsule: "rounded-3xl",
      square: "rounded-md",
    },
    color: {
      primary: "bg-brand-primary-500 border-brand-primary-500 text-white",
      black: "bg-black border-black text-white",
      white: "bg-white border-white text-black",
      gray: "bg-neutral-base-200 border-neutral-base-200 text-black",
      success: "bg-semantic-success-500 border-semantic-success-500 text-white",
      warning: "bg-semantic-warning-500 border-semantic-warning-500 text-black",
      danger: "bg-semantic-error-500 border-semantic-error-500 text-white",
    },
    isOutline: {
      filled: "",
      outline: "bg-transparent",
    },
    hasIcon: {
      true: "grid grid-cols-[10%_90%] grid-rows-1 gap-2",
      false: "flex justify-center items-center",
    },
    isFit: {
      true: "py-0.5 px-1.5 flex justify-center items-center",
      false: "py-1 px-3.5",
    },
  },
  compoundVariants: [
    {
      color: "primary",
      isOutline: "outline",
      className: "bg-transparent text-brand-primary-500",
    },
    {
      color: "black",
      isOutline: "outline",
      className: "bg-transparent text-black",
    },
    {
      color: "white",
      isOutline: "outline",
      className: "bg-transparent text-white",
    },
    {
      color: "gray",
      isOutline: "outline",
      className: "bg-transparent text-neutral-base-200",
    },
    {
      color: "success",
      isOutline: "outline",
      className: "bg-transparent text-semantic-success-500",
    },
    {
      color: "warning",
      isOutline: "outline",
      className: "bg-transparent text-semantic-warning-500",
    },
    {
      color: "danger",
      isOutline: "outline",
      className: "bg-transparent text-semantic-error-500",
    },
  ],
  defaultVariants: {
    variant: "capsule",
    color: "primary",
    isOutline: "filled",
  },
});

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
  isFit = false,
}: TagProps) {
  const iconColor = useMemo(() => {
    if (color === "primary" && isOutline) return "default";
    if (color === "primary") return "white";

    return variant;
  }, [color, isOutline, variant]);

  return (
    <div
      className={cn(
        tagVariants({
          variant,
          color,
          isOutline: isOutline ? "outline" : "filled",
          isFit,
          hasIcon: !!iconName,
        })
      )}
    >
      {!isFit && iconName && (
        <i className="w-full h-full flex justify-center items-center">
          <Icon name={iconName} variant={iconColor as IconColor} size="small" />
        </i>
      )}
      <p className="w-full text-sm leading-none truncate">{text}</p>
    </div>
  );
}
