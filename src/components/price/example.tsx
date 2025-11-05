import { Price } from "@/components/price";

export function ExamplePrice() {
  return (
    <>
      <Price countrysType="es-MX" currenType="MXN" value={1235468465} />
      <Price countrysType="es-US" currenType="USD" value={1235468465} />
      <Price countrysType="de-DE" currenType="EUR" value={1235468465} />
    </>
  );
}
