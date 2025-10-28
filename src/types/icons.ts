type IconSize = "small" | "medium" | "large";
type IconColor =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "white"
  | "black";
export interface IconProps {
  size?: IconSize;
  variant?: IconColor;
}
