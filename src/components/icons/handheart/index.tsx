import { iconVariants } from "@/lib/styles/iconVariants";
import { cn } from "@/lib/styles/utils";
import { IconProps } from "@/types/icons";

export const HandHeartIcon = ({ size, variant }: IconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(iconVariants({ size, variant }))}
    >
      <path
        d="M11 14H13C13.5304 14 14.0391 13.7893 14.4142 13.4142C14.7893 13.0391 15 12.5304 15 12C15 11.4696 14.7893 10.9609 14.4142 10.5858C14.0391 10.2107 13.5304 10 13 10H10C9.4 10 8.9 10.2 8.6 10.6L3 16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 19.9998L8.6 18.5998C8.9 18.1998 9.4 17.9998 10 17.9998H14C15.1 17.9998 16.1 17.5998 16.8 16.7998L21.4 12.3998C21.7859 12.0351 22.0111 11.5321 22.0261 11.0014C22.0411 10.4706 21.8447 9.95567 21.48 9.56978C21.1153 9.18389 20.6123 8.95867 20.0816 8.94367C19.5508 8.92867 19.0359 9.12511 18.65 9.48978L14.45 13.3898M2 14.9998L8 20.9998"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.5 8.5C20.2 7.8 21 6.9 21 5.8C21.0699 5.18893 20.9314 4.57216 20.6069 4.04964C20.2825 3.52712 19.7911 3.12947 19.2124 2.92114C18.6337 2.71281 18.0016 2.706 17.4185 2.90182C16.8355 3.09763 16.3356 3.4846 16 4C15.643 3.52458 15.143 3.17613 14.5734 3.00578C14.0039 2.83544 13.3947 2.85219 12.8353 3.05356C12.2759 3.25494 11.7958 3.63034 11.4655 4.12465C11.1352 4.61896 10.972 5.20614 11 5.8C11 7 11.8 7.8 12.5 8.6L16 12L19.5 8.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
