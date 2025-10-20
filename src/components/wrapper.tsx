"use client";

import { Button } from "./ui/button";

export function Wrapper() {
  const printVariant = (_variant: string) => {
    return; // TODO: implement
  };
  return (
    <section className="w-full max-w-96 mx-auto flex flex-col justify-center items-center gap-2">
      <Button
        onClick={() => printVariant("default")}
        size="fit"
        text="Click me"
      />
      <Button onClick={() => printVariant("default")} text="Click me" />
      <Button
        onClick={() => printVariant("default")}
        link="/about"
        text="Is Link"
      />
      <Button
        variant="outline"
        onClick={() => printVariant("outline")}
        text="outline"
      />
      <Button
        variant="inverted"
        onClick={() => printVariant("inverted")}
        text="inverted"
      />
      <Button
        variant="outlineInverted"
        onClick={() => printVariant("outlineInverted")}
        text="outlineInverted"
      />
      <Button
        variant="whatsapp"
        onClick={() => printVariant("whatsapp")}
        text="whatsapp"
      />
      <Button
        variant="warning"
        onClick={() => printVariant("warning")}
        text="warning"
      />
      <Button
        variant="danger"
        onClick={() => printVariant("danger")}
        text="danger"
      />
    </section>
  );
}
