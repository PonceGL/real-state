import { iconVariants } from "@/lib/styles/iconVariants";
import { cn } from "@/lib/styles/utils";
import { IconProps } from "@/types/icons";

export const CalculatorIcon = ({ size, variant }: IconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(iconVariants({ size, variant }))}
    >
      <path
        d="M18 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V4C20 2.89543 19.1046 2 18 2Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 6H16M16 14V18M16 10H16.01M12 10H12.01M8 10H8.01M12 14H12.01M8 14H8.01M12 18H12.01M8 18H8.01"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
