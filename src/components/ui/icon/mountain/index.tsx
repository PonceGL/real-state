import React from "react";

const MountainIcon = ({
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
                d="M8 3L12 11L17 6L22 21H2L8 3Z"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default MountainIcon;