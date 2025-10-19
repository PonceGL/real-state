"use client";
import { useState } from "react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Wrapper() {
  const [email, setEmail] = useState<string>("");
  const printVariant = (_variant: string) => {
    return; // TODO: implement
  };
  const changeValue = (value: string) => {
    console.log("====================================");
    console.log("value: ", value);
    console.log("====================================");
    setEmail(value);
  };
  return (
    <>
      <section className="w-full max-w-96 mx-auto flex flex-col justify-center items-center gap-2">
        <Input
          type="email"
          value={email}
          onChange={changeValue}
          placeholder="Email"
        />
      </section>
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
          variant="outlineInverted"
          onAction={() => printVariant("outlineInverted")}
          text="outlineInverted"
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
    </>
  );
}
