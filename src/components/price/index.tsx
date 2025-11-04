interface PriceProps {
  number: number;
  isUSD?: boolean;
}

export function Price({ number, isUSD = false }: PriceProps) {
  const currencyText: string = isUSD ? "USD" : "MXN";
  const locale = isUSD ? "en-US" : "es-MX";
  const currencySymbol = isUSD ? "USD" : "MXN";

  const formattedNumber = number.toLocaleString(locale, {
    style: "currency",
    currency: currencySymbol,
  });

  return (
    <h1>
      {currencyText} {formattedNumber}
    </h1>
  );
}
