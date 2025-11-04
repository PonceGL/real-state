import { Price } from "@/components/price";

export function ExamplePrice() {
  return (
    <>
      <Price number={324568798154} />
      <Price number={654812038790} isUSD />
      <Price number={987456251354.24} />
    </>
  );
}
