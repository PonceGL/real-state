import { iconVariants } from "@/lib/styles/iconVariants";
import { cn } from "@/lib/styles/utils";
import { IconProps } from "@/types/icons";

export const MenuIcon = ({ size, variant }: IconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(iconVariants({ size, variant }))}
    >
      <path
        d="M2 12.5H22M2 5H22M2 20H22"
        stroke="Color"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
