import Image from "next/image";

export function PropertyCard() {
  return (
    <div className="w-87 h-183 rounded-3xl shadow-md overflow-hidden">
      <div className="relative h-68 ">
        <Image src="/images/terreno.png" alt="Casa Residencial Moderna con Jardín" fill={true}  className="z-0"/>
      </div>
    </div>
  );
}
