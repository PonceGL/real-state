import { Addresses, type AddressesProps } from "@/components/ui/addresses";

const ADDRESSES_VARIANTS: AddressesProps[] = [
  {
    addresses:
      "Margarita Olivo Lara #15 Col. Rafael Lucio, C.P. 91110, Xalapa, Veracruz, México.",
    linkText: "Manzana D-86, Residencial La Molienda, Veracruz",
    icon: "LocationIcon",
    textColor: "white",
  },
  {
    addresses:
      "Margarita Olivo Lara #15 Col. Rafael Lucio, C.P. 91110, Xalapa, Veracruz, México.",
    linkText: "Manzana D-86, Residencial La Molienda, Veracruz",
    icon: "LocationIcon",
    textColor: "black",
  },
];

export const ExampleAddresses = () => {
  return (
    <div className="flex flex-col gap-4">
      {ADDRESSES_VARIANTS.map((item, index) => (
        <Addresses key={index} {...item} />
      ))}
    </div>
  );
};
