export interface PriceProp {
  value: number;
  currenType?: currencyType;
  countrysType?: countryType;
}

export type currencyType = "USD" | "MXN" | "EUR";
export type countryType = "es-US" | "es-MX" | "de-DE";

export function Price({
  value,
  currenType = "MXN",
  countrysType = "es-MX",
}: PriceProp) {
  const formattedNumber = new Intl.NumberFormat(countrysType, {
    style: "currency",
    currency: currenType,
  }).format(value);

  return (
    <h1>
      {formattedNumber} {currenType}
    </h1>
  );
}
