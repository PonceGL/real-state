import { Icon, type IconName } from "@/components/ui/icon";

export interface HighlightProps {
  numberHighlight: number;
  textHighlight: string;
  iconText?: IconName;
}

/**
 * Muestra un dato destacado, como una característica de una propiedad.
 * Puede incluir un número, un texto descriptivo y un ícono opcional.
 *
 * @param {HighlightProps} props - Propiedades para el componente Highlight.
 * @param {number} props.numberHighlight - El número a destacar.
 * @param {string} props.textHighlight - El texto descriptivo.
 * @param {IconName} [props.iconText] - El nombre del ícono a mostrar (opcional).
 * @returns {JSX.Element} El componente de highlight.
 *
 * @example
 * <Highlight numberHighlight={3} textHighlight="Recámaras" iconText="HomeIcon" />
 */
export function Highlight({
  numberHighlight,
  textHighlight,
  iconText,
}: HighlightProps) {
  return (
    <div className="flex flex-col items-center ">
      <span className="font-bold text-brand-primary-500 text-xl">
        {numberHighlight}
      </span>
      {iconText && <Icon name={iconText} />}
      <p className="text-neutral-base-900">{textHighlight}</p>
    </div>
  );
}
