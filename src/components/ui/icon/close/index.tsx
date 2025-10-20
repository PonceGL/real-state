import React from 'react';

const CloseIcon = ({
    width = 24,
    height = 24,
    color = "#1C2434",
    strokeWidth = 2,
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
                d="M22 2L2 22M2 2L22 22"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default CloseIcon;