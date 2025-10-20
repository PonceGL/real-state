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
    </>
  );
}
