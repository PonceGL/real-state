import { Fragment } from "react";

import { Icon, IconName } from "@/components/ui/icon";
import { IconColor, IconSize } from "@/types/icons";

const SIZES: IconSize[] = ["large", "medium", "small"];
const VARIANTS: IconColor[] = [
  "default",
  "white",
  "success",
  "warning",
  "danger",
  "gray",
  "black",
];

const ICONS_VARIANTS: IconName[] = [
  "GraphicArrowIcon",
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
  "HandHeartIcon",
  "HomeIcon",
  "LocationIcon",
  "MedalIcon",
  "MenuIcon",
  "MountainIcon",
  "PencilIcon",
  "PhoneIcon",
  "MagnifyingIcon",
  "SendIcon",
  "ShieldIcon",
  "SquareIcon",
  "TreeIcon",
  "UsersIcon",
  "WhatsAppIcon",
];

export function ExampleIcons() {
  return (
    <div className="w-full flex flex-col">
      <Fragment>
        {ICONS_VARIANTS.map((icon) => (
          <div
            key={icon}
            className="w-full my-8 p-2 grid grid-cols-7 grid-rows-3 place-items-center gap-4"
          >
            <Fragment>
              {SIZES.map((size) => (
                <Fragment key={`${icon}-${size}`}>
                  {VARIANTS.map((variant) => (
                    <Icon
                      key={`${icon}-${size}-${variant}`}
                      name={icon}
                      variant={variant}
                      size={size}
                    />
                  ))}
                </Fragment>
              ))}
            </Fragment>
          </div>
        ))}
      </Fragment>
    </div>
  );
}
