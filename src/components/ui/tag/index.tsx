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

const tagVariants = cva(
  "flex justify-center items-center h-fit w-fit truncate max-w-52 gap-1 border-2",
  {
    variants: {
      variant: {
        capsule: "rounded-3xl",
        square: "rounded-md",
      },
      color: {
        primary: "bg-brand-primary-500 border-brand-primary-500 text-white ",
        black: "bg-black border-black text-white",
        white: "border-neutral-base-200 text-neutral-base-200",
        gray: "bg-neutral-base-200 border-neutral-base-200 text-black",
        success:
          "bg-semantic-success-500 border-semantic-success-500 text-white",
        warning:
          "bg-semantic-warning-500 border-semantic-warning-500 text-white",
        danger: "bg-semantic-error-500 border-semantic-error-500 text-white",
      },
      isOutline: {
        false: "",
        true: "bg-transparent",
      },
      hasIcon: {
        true: "grid grid-cols-[10%_90%] grid-rows-1 gap-2",
        false: "flex justify-center items-center",
      },
      isFit: {
        false: "py-0.5 px-3.5",
        true: "py-0.5 px-1.5  flex justify-center items-center",
      },
    },
    defaultVariants: {
      variant: "capsule",
      color: "primary",
      isOutline: false,
      isFit: false,
    },
    compoundVariants: [
      {
        color: "primary",
        isOutline: true,
        className: "text-brand-primary-500",
      },
      {
        color: "white",
        isOutline: true,
        className: "text-neutral-base-200",
      },
      {
        color: "black",
        isOutline: true,
        className: "text-black",
      },
      {
        color: "success",
        isOutline: true,
        className: "text-semantic-success-500",
      },
      {
        color: "warning",
        isOutline: true,
        className: "text-semantic-warning-500",
      },
      {
        color: "danger",
        isOutline: true,
        className: "text-semantic-error-500",
      },
    ],
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
          isOutline,
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
      <p className="w-full text-sm leading-4.5 truncate">{text}</p>
    </div>
  );
}
