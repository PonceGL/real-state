"use client";

import { Button } from "@/components/ui";

export function ExampleButton() {
  const printVariant = (_variant: string) => {
    return; // TODO: implement
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <h4 className="w-full text-left text-2xl font-bold">No Icon</h4>
        <div className="w-full grid grid-cols-3 place-items-center gap-4">
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
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <h4 className="w-full text-left text-2xl font-bold">Icon</h4>
        <div className="w-full grid grid-cols-3 place-items-center gap-4">
          <Button
            onClick={() => printVariant("default")}
            text="default"
            leftIcon="EyeIcon"
            rightIcon="ChevronRightIcon"
          />
          <Button
            onClick={() => printVariant("default")}
            size="fit"
            text="default fit"
            leftIcon="EyeIcon"
          />
          <Button
            link="/about"
            text="Is Link"
            leftIcon="EyeIcon"
            rightIcon="ChevronRightIcon"
          />
          <Button
            variant="outline"
            onClick={() => printVariant("outline")}
            text="outline"
            rightIcon="FilterIcon"
          />
          <Button
            variant="inverted"
            onClick={() => printVariant("inverted")}
            text="inverted"
            rightIcon="MagnifyingIcon"
          />
          <Button
            variant="outlineInverted"
            onClick={() => printVariant("outlineInverted")}
            text="outlineInverted"
            leftIcon="TreeIcon"
            rightIcon="DocsIcon"
          />
          <Button
            variant="whatsapp"
            onClick={() => printVariant("whatsapp")}
            text="whatsapp"
            leftIcon="WhatsAppIcon"
          />
          <Button
            variant="warning"
            onClick={() => printVariant("warning")}
            text="warning"
            leftIcon="ClockIcon"
            rightIcon="EyeIcon"
          />
          <Button
            variant="danger"
            onClick={() => printVariant("danger")}
            text="danger"
            rightIcon="CloseIcon"
          />
        </div>
      </div>
    </div>
  );
}
