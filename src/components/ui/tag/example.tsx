import { Fragment } from "react";

import { Tag, TagColors, TagVariants } from "@/components/ui/tag";

const TAG_COLORS: TagColors[] = [
  "primary",
  "black",
  "white",
  "gray",
  "success",
  "warning",
  "danger",
];

const TAG_VARIANTS: TagVariants[] = ["capsule", "square"];

export function ExampleTag() {
  return (
    <div className=" grid grid-cols-6 gap-2">
      {TAG_COLORS.map((color) => (
        <Fragment key={color}>
          {TAG_VARIANTS.map((variant) => (
            <Fragment key={`${variant}-${color}`}>
              <Tag
                text={variant}
                color={color}
                variant={variant}
                iconName="BuildingIcon"
              />
              <Tag text={variant} color={color} variant={variant} isOutline />
              <Tag text={variant} color={color} variant={variant} isFit />
            </Fragment>
          ))}
        </Fragment>
      ))}
    </div>
  );
}
