"use client";

import { PropsWithChildren } from "react";

type WrapperProps = PropsWithChildren<{
  isDarkBackground?: boolean;
}>;

export function Wrapper({ isDarkBackground, children }: WrapperProps) {
  return (
    <div
      className={`w-full py-32 px-4 flex flex-col justify-center items-center gap-2 ${
        isDarkBackground ? "bg-neutral-base-900" : "bg-white"
      }`}
    >
      <section className="w-full max-w-96 mx-auto flex flex-col justify-center items-center gap-2">
        {children}
      </section>
    </div>
  );
}
