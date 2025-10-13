'use client'
interface ButtonProps {
    text: string,
    buttonClick: () => void,
    stylePreset?: string,
}



export default function Button({ text, buttonClick, stylePreset }: ButtonProps) {
    return (
        <button className={`h-[37px] w-[362px] rounded-[8px] ${stylePreset}`} onClick={buttonClick}>
            <p className="text-white">{text}</p>
        </button>
    );
}