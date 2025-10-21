"use client";

import { Button } from "@/components/ui";

export function ExampleButton() {

    const printVariant = (_variant: string) => {
        return; // TODO: implement
    }
    
    return (
      <>
        <Button onClick={() => printVariant("default")} text="default" />
        <Button
          onClick={() => printVariant("default")}
          size="fit"
          text="default fit"
        />
        <Button link="/about" text="Is Link" />
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
      </>
    );
}