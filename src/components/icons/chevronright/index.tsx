const ChevronRight = ({
    width = 15,
    height = 15,
    color = "#F8F9FA",
    className = "",
    ...props
}) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            <path
                d="M5.75 11L9.25 7.5L5.75 4"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default ChevronRight;