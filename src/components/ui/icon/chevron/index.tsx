import React from "react";

const ChevronRightIcon = ({
    width = 24,
    height = 24,
    color = "#1C2434",
    className = ""
}) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M9 18L15 12L9 6"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default ChevronRightIcon;