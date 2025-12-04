import { Icon, IconName } from "@/components/ui/icon";

export type TextUrlColors = "white" | "black";

export interface AddressesProps {
  addresses: string;
  linkText: string;
  icon: IconName;
  textColor: TextUrlColors;
}

export const Addresses = ({
  addresses,
  linkText,
  icon,
  textColor,
}: AddressesProps) => {
  const encodedAddresses = encodeURIComponent(addresses);

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddresses}`;

  const colorClassMap = {
    black: "text-black",
    white: "text-white",
  };

  const dynamicTextColorClass = colorClassMap[textColor];

  return (
    <div className="flex items-center gap-2 ">
      <Icon name={icon} size="medium" variant={textColor} />
      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${dynamicTextColorClass}`}
      >
        {linkText}
      </a>
    </div>
  );
};
