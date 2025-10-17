const IconEye = ({
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
                d="M1.70284 7.70297C1.65423 7.572 1.65423 7.42793 1.70284 7.29697C2.17634 6.14888 2.98006 5.16724 4.01213 4.47649C5.04419 3.78574 6.25812 3.41699 7.50001 3.41699C8.7419 3.41699 9.95583 3.78574 10.9879 4.47649C12.02 5.16724 12.8237 6.14888 13.2972 7.29697C13.3458 7.42793 13.3458 7.572 13.2972 7.70297C12.8237 8.85105 12.02 9.83269 10.9879 10.5234C9.95583 11.2142 8.7419 11.5829 7.50001 11.5829C6.25812 11.5829 5.04419 11.2142 4.01213 10.5234C2.98006 9.83269 2.17634 8.85105 1.70284 7.70297Z"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.5 9.25C8.4665 9.25 9.25 8.4665 9.25 7.5C9.25 6.5335 8.4665 5.75 7.5 5.75C6.5335 5.75 5.75 6.5335 5.75 7.5C5.75 8.4665 6.5335 9.25 7.5 9.25Z"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default IconEye;