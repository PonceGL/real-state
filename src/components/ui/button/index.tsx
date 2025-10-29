"use client";
import { cva } from "class-variance-authority";
import Link, { LinkProps } from "next/link";
import { useMemo } from "react";

import { Icon, IconName } from "@/components/ui/icon";
import { cn } from "@/lib/styles/utils";
import { IconColor } from "@/types/icons";

type ButtonVariant =
  | "default"
  | "outline"
  | "inverted"
  | "outlineInverted"
  | "whatsapp"
  | "warning"
  | "danger";

type ButtonSize = "default" | "fit";

interface ButtonProps {
  text: string;
  type?: "submit" | "reset" | "button";
  variant?: ButtonVariant;
  size?: ButtonSize;
  link?: LinkProps["href"];
  onClick?: () => void;
  disabled?: boolean;
  leftIcon?: IconName;
  rightIcon?: IconName;
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
        outlineInverted:
          "border-neutral-base-200 text-neutral-base-200 hover:border-neutral-base-200 active:border-neutral-base-600 active:text-neutral-base-600",
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

/**
 * Un componente de botón versátil y reutilizable que puede renderizarse
 * como un <button> estándar de HTML o como un componente <Link> de Next.js.
 * Soporta múltiples variantes visuales, tamaños y estados.
 *
 * @param {ButtonProps} props - Las propiedades para configurar el botón.
 * @param {string} props.text - El texto que se mostrará dentro del botón. Es obligatorio.
 * @param {"submit" | "reset" | "button"} [props.type="button"] - El atributo `type` nativo del botón. Se ignora si se proporciona la prop `link`.
 * @param {ButtonVariant} [props.variant="default"] - Define el estilo visual del botón (ej. 'default', 'outline', 'danger').
 * @param {ButtonSize} [props.size="default"] - Define el tamaño del botón ('default' para ancho completo, 'fit' para ajustarse al contenido).
 * @param {Url} [props.link] - Si se proporciona una URL, el componente se renderizará como un `next/link` en lugar de un `button`.
 * @param {() => void} [props.onClick] - La función que se ejecutará cuando el usuario haga clic en el botón. Se ignora si se proporciona la prop `link`.
 * @param {boolean} [props.disabled=false] - Si es `true`, el botón se deshabilita y no se puede interactuar con él. Se ignora si se proporciona la prop `link`.
 *
 * @example
 * // Renderiza un botón de acción estándar
 * <Button
 * text="Confirmar"
 * onClick={() => alert('Confirmado!')}
 * variant="whatsapp"
 * />
 *
 * @example
 * // Renderiza un enlace (<a>) con el estilo de un botón
 * <Button
 * text="Ir a la página de inicio"
 * link="/"
 * variant="outline"
 * size="fit"
 * />
 *
 * @example
 * // Renderiza un botón de tipo "submit" para un formulario
 * <Button
 * text="Enviar Formulario"
 * type="submit"
 * />
 *
 * @example
 * // Renderiza un botón deshabilitado
 * <Button
 * text="Acción no disponible"
 * disabled={true}
 * />
 */
function Button({
  text,
  type,
  onClick,
  link,
  variant,
  size,
  disabled,
  leftIcon,
  rightIcon,
}: ButtonProps) {
  const styles = useMemo(() => {
    return cn(buttonVariants({ variant, size }));
  }, [variant, size]);

  const iconVariant: IconColor = useMemo(() => {
    if (variant === "outline" || variant === "inverted") return "default";
    if (variant === "outlineInverted") return "gray";
    if (variant === "warning") return "black";
    return "white";
  }, [variant]);

  return (
    <>
      {!link ? (
        <button
          type={type}
          className={`${styles} ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={onClick}
          disabled={disabled}
        >
          {leftIcon && (
            <Icon name={leftIcon} variant={iconVariant} size="small" />
          )}
          {text}
          {rightIcon && (
            <Icon name={rightIcon} variant={iconVariant} size="small" />
          )}
        </button>
      ) : (
        <Link href={link} className={styles}>
          {text}
        </Link>
      )}
    </>
  );
}

export { Button, buttonVariants };
