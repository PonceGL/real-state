
type IconSize = "small" | "medium" | "large";

type IconColor = "default" | "whatsapp" | "warning" | "danger" | "white" | "black";



export interface IconProps {
    size?: IconSize,
    variant?: IconColor
}
