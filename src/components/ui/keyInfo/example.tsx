import { KeyInfo } from "@/components/ui/keyInfo";

export function ExampleKeyInfo(){
    return (
        <div className="grid grid-cols-4 gap-4">
            <KeyInfo label="Pisos" value={2}/>
            <KeyInfo label="Recámaras" value={3}/>
            <KeyInfo label="Baños" value={2.5}/>
            <KeyInfo label="Autos" value={2}/>
        </div>
    )
}