interface PriceProps {
  value: number;
  currenType?: currencyType;
  countrysType?: countryType;
}

type currencyType = "USD" | "MXN" | "EUR";
type countryType = "es-US" | "es-MX" | "de-DE";

export function Price({ value, currenType, countrysType }: PriceProps) {
  const formattedNumber = new Intl.NumberFormat(countrysType, {
    style: "currency",
    currency: currenType,
  }).format(value);

  return (
    <h1>
      {currenType}
      {formattedNumber}
    </h1>
  );
}
