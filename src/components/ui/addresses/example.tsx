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
      "Calle Paricutín, C. 3 esq, El Mirador, 91170 Xalapa-Enríquez, Ver.",
    linkText: "Hamburguesas y tacos Cárcamo",
    icon: "LocationIcon",
    textColor: "black",
  },
  {
    addresses:
      "Av. Xalapa s/n, Unidad Magisterial, 91017 Xalapa-Enríquez, Ver.",
    linkText: "MAX Museo de Antropología de Xalapa",
    icon: "LocationIcon",
    textColor: "black",
  },
];

export const ExampleAddresses = () => {
  return (
    <div className="flex flex-col gap-4">
      {ADDRESSES_VARIANTS.map((item) => (
        <Addresses key={item.linkText} {...item} />
      ))}
    </div>
  );
};
