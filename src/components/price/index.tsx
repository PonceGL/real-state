export interface PriceProp {
  value: number;
  currenType?: currencyType;
  countrysType?: countryType;
}

export type currencyType = "USD" | "MXN" | "EUR";
export type countryType = "es-US" | "es-MX" | "de-DE";


/**
 * @component
 * @param {PriceProp} props - value - currenType - countrysType.
 *
 * @description
 * Componente que se encarga de formatear y renderizar un número
 * como precio utilizando el objeto nativo Intl.NumberFormat de JavaScript.
 * Esto asegura una correcta localización del formato de moneda.
 *
 * @example
 * <Price value={1234.567} currenType="USD" countrysType="es-US" />
 * Muestra $1,234.57
 *
 * @example
 * <Price value={1234.567} />
 * Muestra $1,234.57 (usa valores por defecto MXN y es-MX)
 */
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
