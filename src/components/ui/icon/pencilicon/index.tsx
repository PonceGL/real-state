import { cva } from "class-variance-authority";

import { cn } from "@/lib/styles/utils";

type IconSize = "small" | "medium" | "large";

type IconColor = "default" | "whatsapp" | "warning" | "danger" | "white" | "black";


interface IconProps {
    size?: IconSize,
    variant?: IconColor
}


export const PencilIcon = ({
    variant,
    size,
}: IconProps) => {

    const buttonVariants = cva(
        "",
        {
            variants: {
                variant: {
                    default:
                        "stroke-brand-primary-500 ",
                    white:
                        "stroke-white",
                    black:
                        "stroke-black",
                    outlineInverted:
                        "stroke-neutral-base-200",
                    whatsapp:
                        "stroke-semantic-success-500",
                    warning:
                        "stroke-semantic-warning-500",
                    danger:
                        "stroke-semantic-error-500",
                },
                size: {
                    small: "w-1.5 h-1.5",
                    medium: "w-2.5 h-2.5",
                    large: "w-3.5 h-3.5",
                },
            },
            defaultVariants: {
                variant: "default",
                size: "small",
            },
        }
    );

    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn(buttonVariants({
                variant,
                size
            }))}
        >
            <path
                d="M14.5 12.4998L16.5 10.4998M11.5 9.4998L13.5 7.4998M8.49999 6.4998L10.5 4.4998M17.5 15.4998L19.5 13.4998M21.3 15.2998C21.5237 15.5228 21.7013 15.7877 21.8224 16.0794C21.9435 16.3712 22.0059 16.6839 22.0059 16.9998C22.0059 17.3157 21.9435 17.6284 21.8224 17.9202C21.7013 18.2119 21.5237 18.4768 21.3 18.6998L18.7 21.2998C18.477 21.5235 18.2121 21.7011 17.9203 21.8222C17.6286 21.9433 17.3159 22.0057 17 22.0057C16.6841 22.0057 16.3713 21.9433 16.0796 21.8222C15.7879 21.7011 15.523 21.5235 15.3 21.2998L2.69999 8.6998C2.25054 8.24818 1.99823 7.63695 1.99823 6.9998C1.99823 6.36265 2.25054 5.75143 2.69999 5.2998L5.29999 2.6998C5.75161 2.25036 6.36283 1.99805 6.99999 1.99805C7.63714 1.99805 8.24836 2.25036 8.69999 2.6998L21.3 15.2998Z"
                stroke={variant}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

