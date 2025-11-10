import { KeyInfo } from "@/components/ui/keyInfo";

export function ExampleKeyInfo(){
    return (
      <div className="grid grid-cols-4 gap-4">
        <KeyInfo label="Terreno" value={220} iconName="SquareIcon" />
        <KeyInfo label="Construcción" value={185} iconName="HomeIcon" />
        <KeyInfo label="Terreno" value={250} iconName="SquareIcon" />
        <KeyInfo label="Construcción" value={220} iconName="HomeIcon" />
      </div>
    );
}