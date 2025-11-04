interface PriceProps {
    number: number;
}

export function Price({ number }: PriceProps) {

    const formattedNumber = number.toLocaleString("es-MX", {
        style: "currency",
        currency: "MXN",
    });

  return <h1>{formattedNumber}</h1>;
}