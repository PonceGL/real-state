"use client";
import { useState } from "react";

import { Button, Input } from "@/components/ui";

export function Wrapper() {
  const [email, setEmail] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const printVariant = (_variant: string) => {
    return; // TODO: implement
  };
  return (
    <>
      <section className="w-full max-w-96 mx-auto flex flex-col justify-center items-center gap-2">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <Input type="text" value="type text" readOnly />
        <Input
          type="search"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="url"
          name="url"
          id="url"
          placeholder="https://example.com"
          pattern="https://.*"
        />
        <Input
          type="file"
          id="avatar"
          name="avatar"
          accept="image/png, image/jpeg"
        />
        <Input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Number"
        />
        <Input
          type="time"
          id="appointment"
          name="appointment"
          min="09:00"
          max="18:00"
          required
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
