import { IconName } from "../icon";
import { Tag } from "../tag";

interface KeyInfoProp{
    value: number;
    label:string;
    iconName?: IconName
}

export function KeyInfo ({iconName,label,value}:KeyInfoProp) {
    return <div className="flex flex-col items-center">
        <h1 className="text-brand-primary-500 font-bold">{value}</h1>
        <span>{iconName}</span>
        <h3>{label}</h3>
        <Tag text="Jardin Pequeño" color="success"/>
    </div>
}