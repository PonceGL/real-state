import { Fragment } from "react";

import { Tag, TagColors, TagVariants } from "@/components/ui/tag";

import { IconName } from "../icon";

const TAG_COLORS: TagColors[] = [
  "primary",
  "black",
  "white",
  "gray",
  "success",
  "warning",
  "danger",
];

const ICONS_VARIANTS: IconName[] = [
  "BuildingIcon",
  "CalculatorIcon",
  "CheckCircleIcon",
  "ChevronRightIcon",
  "ClockIcon",
  "CloseIcon",
  "DocsIcon",
  "EmailIcon",
  "EyeIcon",
  "FacebookIcon",
  "FilterIcon",
  "GraphicArrowIcon",
  "HandHeartIcon",
  "HomeIcon",
  "LocationIcon",
  "MagnifyingIcon",
  "MedalIcon",
  "MenuIcon",
  "MountainIcon",
  "PencilIcon",
  "PhoneIcon",
  "SendIcon",
  "ShieldIcon",
  "SquareIcon",
  "TreeIcon",
  "UsersIcon",
  "WhatsAppIcon",
];

const TAG_VARIANTS: TagVariants[] = ["capsule", "square"];

export function ExampleTag() {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-20">
      <div className="w-full grid grid-cols-6 gap-4 place-items-center">
        {TAG_COLORS.map((color) => (
          <Fragment key={color}>
            {TAG_VARIANTS.map((variant) => (
              <Fragment key={`${variant}-${color}`}>
                <Tag
                  text={`${variant} ${color}`}
                  color={color}
                  variant={variant}
                />
                <Tag
                  text={`${variant} ${color} isOutline`}
                  color={color}
                  variant={variant}
                  isOutline
                />
                <Tag
                  text={`${variant} ${color} isFit`}
                  color={color}
                  variant={variant}
                  isFit
                />
              </Fragment>
            ))}
          </Fragment>
        ))}
      </div>

      <div className="w-full grid grid-cols-6 gap-4 place-items-center">
        {TAG_COLORS.map((color, index) => (
          <Fragment key={color}>
            {TAG_VARIANTS.map((variant) => (
              <Fragment key={`${variant}-${color}`}>
                <Tag
                  text={`${variant} ${color}`}
                  color={color}
                  variant={variant}
                  iconName={ICONS_VARIANTS[index]}
                />
                <Tag
                  text={`${variant} ${color} isOutline`}
                  color={color}
                  variant={variant}
                  isOutline
                  iconName={ICONS_VARIANTS[index]}
                />
                <Tag
                  text={`${variant} ${color} isFit`}
                  color={color}
                  variant={variant}
                  isFit
                  iconName={ICONS_VARIANTS[index]}
                />
              </Fragment>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
