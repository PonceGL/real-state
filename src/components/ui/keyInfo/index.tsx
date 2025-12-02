import { Icon, IconName } from "@/components/ui/icon";

export interface KeyInfoProps {
  value: number;
  label: string;
  iconName?: IconName;
}

/**
 * Muestra una pieza clave de información, como un valor numérico y una etiqueta.
 *
 * @param {KeyInfoProps} props Las propiedades para el componente.
 * @param {number} props.value El valor numérico a mostrar.
 * @param {string} props.label La etiqueta descriptiva para el valor.
 * @param {IconName} [props.iconName] El nombre del ícono a mostrar opcionalmente.
 * @returns {JSX.Element} El componente de información clave.
 *
 * @example
 * <KeyInfo label="Recámaras" value={3} />
 */
export function KeyInfo({ iconName, label, value }: KeyInfoProps) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-0.5 items-center">
      {iconName && <Icon name={iconName} size="large" />}
      <div className="flex flex-col items-start gap-0">
        <p className="text-xl text-neutral-base-400">{label}</p>
        <p className="text-xl font-bold text-black">{value} M²</p>
      </div>
    </div>
  );
}
