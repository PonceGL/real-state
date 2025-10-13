'use client'
interface ButtonProps {
    text: string,
    buttonClick: () => void,
}

export default function Button({ text, buttonClick }: ButtonProps) {
    return (
        <button className=" h-[37px] w-[362px] rounded-[8px] bg-[#1062C6] m-2" onClick={buttonClick}>
            <p className="text-white">{text}</p>
        </button>
    );
}