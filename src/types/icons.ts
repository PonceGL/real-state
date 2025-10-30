export type IconSize = "small" | "medium" | "large";
export type IconColor =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "white"
  | "gray"
  | "black";
export interface IconProps {
  size?: IconSize;
  variant?: IconColor;
}
