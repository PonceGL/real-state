import React from 'react';

const FilterIcon = ({
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
                d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default FilterIcon;