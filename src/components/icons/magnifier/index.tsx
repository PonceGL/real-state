const Magnifier = ({
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
                d="M6.91667 11.5833C9.494 11.5833 11.5833 9.494 11.5833 6.91667C11.5833 4.33934 9.494 2.25 6.91667 2.25C4.33934 2.25 2.25 4.33934 2.25 6.91667C2.25 9.494 4.33934 11.5833 6.91667 11.5833Z"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12.75 12.75L10.2416 10.2417"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default Magnifier;