import Image from "next/image";

type PropertyCardProps = {
  imageUrl: string;
  imageAlt: string;
};

/**
 * Muestra una tarjeta con la información principal de una propiedad.
 *
 * @param imageUrl La URL de la imagen de la propiedad.
 * @param imageAlt El texto alternativo para la imagen.
 *
 * @example
 * <PropertyCard
 *   imageUrl="/images/terreno.png"
 *   imageAlt="Casa Residencial Moderna con Jardín"
 * />
 */
export function PropertyCard({ imageUrl, imageAlt }: PropertyCardProps) {
  return (
    <div className="w-87 h-183 rounded-3xl shadow-md overflow-hidden">
      <div className="relative h-68 ">
        <Image src={imageUrl} alt={imageAlt} fill={true} className="z-0" />
      </div>
    </div>
  );
}
