import { iconVariants } from "@/lib/styles/iconVariants";
import { cn } from "@/lib/styles/utils";
import { IconProps } from "@/types/icons";

export const ChevronRightIcon = ({ size, variant }: IconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(iconVariants({ size, variant }))}
    >
      <path
        d="m7 22 10-10L7 2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
