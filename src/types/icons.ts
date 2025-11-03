import { BrandColor } from "./brand";
export type IconSize = "small" | "medium" | "large";

export interface IconProps {
  size?: IconSize;
  variant?: BrandColor;
}
