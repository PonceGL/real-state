import React from "react";

const MedalIcon = ({
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
                d="M15.477 12.8901L16.992 21.4161C17.009 21.5165 16.9949 21.6197 16.9516 21.7119C16.9084 21.8041 16.838 21.8808 16.7499 21.9319C16.6619 21.983 16.5603 22.006 16.4588 21.9978C16.3573 21.9897 16.2607 21.9507 16.182 21.8861L12.602 19.1991C12.4292 19.07 12.2192 19.0003 12.0035 19.0003C11.7878 19.0003 11.5778 19.07 11.405 19.1991L7.819 21.8851C7.74032 21.9496 7.64386 21.9885 7.54249 21.9967C7.44112 22.0049 7.33967 21.982 7.25166 21.931C7.16365 21.88 7.09327 21.8035 7.04991 21.7115C7.00656 21.6195 6.99228 21.5165 7.009 21.4161L8.523 12.8901"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12 14C15.3137 14 18 11.3137 18 8C18 4.68629 15.3137 2 12 2C8.68629 2 6 4.68629 6 8C6 11.3137 8.68629 14 12 14Z"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default MedalIcon;