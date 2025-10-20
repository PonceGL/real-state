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

type HtmlInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type InputProps = Omit<HtmlInputProps, "type" | "size"> & {
  type?: InputType;
  variant?: InputVariant;
  size?: InputSize;
};

const inputVariants = cva(
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

/**
 * Un componente de input estilizado que extiende las capacidades del elemento
 * <input> nativo de HTML. Utiliza class-variance-authority (cva) para
 * aplicar variantes visuales y tamaños de forma consistente.
 *
 * Este componente acepta todas las props estándar de un <input> de HTML
 * (como `placeholder`, `value`, `onChange`, `disabled`, etc.) y las
 * pasa directamente al elemento subyacente.
 *
 * @param {InputProps} props - Las propiedades para configurar el input.
 * @param {InputType} [props.type="text"] - El tipo de input (ej. 'text', 'password', 'email').
 * @param {InputVariant} [props.variant="default"] - Define el estilo visual del input (ej. 'default', 'danger').
 * @param {InputSize} [props.size="default"] - Define el ancho del input ('default' para ancho completo, 'fit' para ajustarse al contenido).
 * @param {...HtmlInputProps} props - Todas las demás props válidas para un elemento <input> de HTML son aceptadas y pasadas directamente.
 *
 * @example
 * // Renderiza un input de texto básico con un placeholder.
 * <Input
 * name="username"
 * placeholder="Nombre de usuario"
 * />
 *
 * @example
 * // Renderiza un input de contraseña con una variante de peligro.
 * <Input
 * type="password"
 * name="password"
 * variant="danger"
 * placeholder="Contraseña"
 * />
 *
 * @example
 * // Renderiza un input controlado, común en formularios de React.
 * const [value, setValue] = useState('');
 * <Input
 * value={value}
 * onChange={(e) => setValue(e.target.value)}
 * placeholder="Escribe algo..."
 * />
 *
 * @example
 * // Renderiza un input deshabilitado con un tamaño ajustado.
 * <Input
 * placeholder="No editable"
 * size="fit"
 * disabled
 * />
 */
export function Input({ variant, size, type, ...props }: InputProps) {
  return (
    <input
      className={cn(
        inputVariants({
          variant,
          size,
        })
      )}
      type={type}
      {...props}
    />
  );
}
