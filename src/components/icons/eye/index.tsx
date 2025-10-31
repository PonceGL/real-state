import { iconVariants } from "@/lib/styles/iconVariants";
import { cn } from "@/lib/styles/utils";
import { IconProps } from "@/types/icons";

export const EyeIcon = ({ size, variant }: IconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(iconVariants({ size, variant }))}
    >
      <path
        d="M1.069 12.873a1.046 1.046 0 0 1 0-.746 11.589 11.589 0 0 1 4.354-5.18A12.048 12.048 0 0 1 12 5c2.342 0 4.63.677 6.577 1.946a11.588 11.588 0 0 1 4.354 5.181c.092.24.092.505 0 .746a11.588 11.588 0 0 1-4.354 5.18A12.049 12.049 0 0 1 12 20a12.05 12.05 0 0 1-6.577-1.946 11.588 11.588 0 0 1-4.354-5.181Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
