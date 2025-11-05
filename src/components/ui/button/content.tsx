import { memo } from "react";

import { Icon, IconName } from "@/components/ui/icon";
import { BrandColor } from "@/types/brand";

interface ContentProps {
  text: string;
  leftIcon?: IconName;
  rightIcon?: IconName;
  iconVariant: BrandColor;
}

export const Content = memo(function Content({
  text,
  leftIcon,
  rightIcon,
  iconVariant,
}: ContentProps) {
  return (
    <>
      {leftIcon && <Icon name={leftIcon} variant={iconVariant} size="small" />}
      {text}
      {rightIcon && (
        <Icon name={rightIcon} variant={iconVariant} size="small" />
      )}
    </>
  );
});
