"use client";

import { useState } from "react";

import { Input } from "@/components/ui";

export function ExampleInput() {
  const [email, setEmail] = useState<string>("");
  const [number, setNumber] = useState<string>("");

  return (
    <>
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
    </>
  );
}
