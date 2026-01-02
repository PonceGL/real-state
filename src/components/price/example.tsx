import { Price, PriceProp } from "@/components/price";

type PriceDisplay = PriceProp & { id: number };

const pricesToShow: PriceDisplay[] = [
  {
    id: 1,
    countrysType: "es-MX",
    currenType: "MXN",
    value: 1235468465,
  },
  {
    id: 2,
    countrysType: "es-US",
    currenType: "USD",
    value: 1235468465,
  },
  {
    id: 3,
    countrysType: "de-DE",
    currenType: "EUR",
    value: 1235468465,
  },
];

export function ExamplePrice() {
  return (
    <div className="flex flex-col space-y-4">
      {pricesToShow.map((item, index) => (
        <Price key={index} {...item} />
      ))}
    </div>
  );
}
