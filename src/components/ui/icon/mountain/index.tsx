import { cn } from "@/lib/styles/utils";
import { IconProps } from "@/types/iconsinterface";
import { iconVariants } from "@/types/iconvariants";

const MountainIcon = ({
    size,
    variant,
}: IconProps) => {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn(iconVariants({ size, variant }))}
        >
            <path
                d="M8 3L12 11L17 6L22 21H2L8 3Z"
                stroke={variant}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default MountainIcon;