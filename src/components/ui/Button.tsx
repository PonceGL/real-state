'use client'

import { ReactNode } from "react";

interface ButtonProps {
    text: string,
    buttonClick: () => void,
    stylePreset?: string,
    styleText?: string,
    icon?: ReactNode,
    iconPosition?: 'left' | 'right',
}



export default function Button({ text, buttonClick, stylePreset, styleText }: ButtonProps) {
    return (
        <button className={`h-[37px] w-[362px] rounded-[8px] ${stylePreset}`} onClick={buttonClick}>
            <p className={`${styleText}`}>{text}</p>
        </button>
    );
}