import Link from "next/link";

import { Icon, IconName } from "@/components/ui/icon";
import { GOOGLE_MAPS_BASE_URL } from "@/constants/googleMapsBaseUrl";

export type TextUrlColors = "white" | "black";

export interface AddressesProps {
  addresses: string;
  linkText: string;
  icon: IconName;
  textColor: TextUrlColors;
}

/**
 * Renderiza un enlace a una dirección en Google Maps con un ícono.
 *
 * @param {AddressesProps} props - Las propiedades para el componente.
 * @param {string} props.addresses - La dirección física completa para generar el enlace de Google Maps.
 * @param {string} props.linkText - El texto que se mostrará en el enlace.
 * @param {IconName} props.icon - El nombre del ícono a mostrar junto al enlace.
 * @param {TextUrlColors} props.textColor - El color del texto del enlace y del ícono ('white' o 'black').
 * @returns {JSX.Element} El componente de dirección renderizado.
 *
 * @example
 * <Addresses
 *   addresses="1600 Amphitheatre Parkway, Mountain View, CA"
 *   linkText="Oficinas de Google"
 *   icon="LocationIcon"
 *   textColor="black"
 * />
 */

export const Addresses = ({
  addresses,
  linkText,
  icon,
  textColor,
}: AddressesProps) => {
  const encodedAddresses = encodeURIComponent(addresses);

  const mapUrl = `${GOOGLE_MAPS_BASE_URL}${encodedAddresses}`;

  const colorClassMap = {
    black: "text-black",
    white: "text-white",
  };

  const dynamicTextColorClass = colorClassMap[textColor];

  return (
    <div className="flex items-center gap-2 ">
      <Icon name={icon} size="medium" variant={textColor} />
      <Link
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={dynamicTextColorClass}
      >
        {linkText}
      </Link>
    </div>
  );
};
