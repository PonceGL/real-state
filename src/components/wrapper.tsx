"use client";
import { Button } from "./ui/button";

export function Wrapper() {
  const printVariant = (_variant: string) => {
    return; // TODO: implement
  };
  return (
    <section className="w-full max-w-96 mx-auto flex flex-col justify-center items-center gap-2">
      <Button
        onAction={() => printVariant("default")}
        size="fit"
        text="Click me"
      />
      <Button onAction={() => printVariant("default")} text="Click me" />
      <Button
        onAction={() => printVariant("default")}
        link="/about"
        text="Is Link"
      />
      <Button
        variant="outline"
        onAction={() => printVariant("outline")}
        text="outline"
      />
      <Button
        variant="inverted"
        onAction={() => printVariant("inverted")}
        text="inverted"
      />
      <Button
        variant="whatsapp"
        onAction={() => printVariant("whatsapp")}
        text="whatsapp"
      />
      <Button
        variant="warning"
        onAction={() => printVariant("warning")}
        text="warning"
      />
      <Button
        variant="danger"
        onAction={() => printVariant("danger")}
        text="danger"
      />
    </section>
  );
}
