import React from "react";

const EyeIcon = ({
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
                d="M2.06199 12.3479C1.97865 12.1234 1.97865 11.8764 2.06199 11.6519C2.87369 9.68373 4.2515 8.00091 6.02076 6.81677C7.79001 5.63263 9.87103 5.00049 12 5.00049C14.1289 5.00049 16.21 5.63263 17.9792 6.81677C19.7485 8.00091 21.1263 9.68373 21.938 11.6519C22.0213 11.8764 22.0213 12.1234 21.938 12.3479C21.1263 14.316 19.7485 15.9988 17.9792 17.183C16.21 18.3671 14.1289 18.9993 12 18.9993C9.87103 18.9993 7.79001 18.3671 6.02076 17.183C4.2515 15.9988 2.87369 14.316 2.06199 12.3479Z"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default EyeIcon;