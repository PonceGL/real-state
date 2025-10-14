'use client'
interface ButtonProps {
    text: string,
    buttonClick: () => void,
    stylePreset?: string,
    styleText?: string,
}



export default function Button({ text, buttonClick, stylePreset, styleText }: ButtonProps) {
    return (
        <button className={`h-[37px] w-[362px] rounded-[8px] ${stylePreset}`} onClick={buttonClick}>
            <p className={`${styleText}`}>{text}</p>
        </button>
    );
}