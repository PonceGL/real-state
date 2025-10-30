"use client";

import { PropsWithChildren } from "react";

type WrapperProps = PropsWithChildren<{
  isDarkBackground?: boolean;
}>;

/**
 * Un componente contenedor que centra su contenido y aplica un fondo claro u oscuro.
 * Es ideal para crear secciones consistentes en la página.
 *
 * @param {object} props Las propiedades para el componente Wrapper.
 * @param {boolean} [props.isDarkBackground=false] Si es `true`, el fondo será oscuro. Por defecto es blanco.
 * @param {React.ReactNode} props.children El contenido a ser renderizado dentro del contenedor.
 * @returns {JSX.Element} El componente Wrapper renderizado.
 *
 * @example
 * // Uso con fondo oscuro
 * <Wrapper isDarkBackground>
 *   <p>Este texto tiene un fondo oscuro.</p>
 * </Wrapper>
 */
export function Wrapper({ isDarkBackground, children }: WrapperProps) {
  return (
    <div
      className={`w-full py-32 px-4 flex flex-col justify-center items-center gap-2 ${
        isDarkBackground ? "bg-neutral-base-900" : "bg-white"
      }`}
    >
      <section className="w-full mx-auto flex flex-col justify-center items-center gap-2">
        {children}
      </section>
    </div>
  );
}
