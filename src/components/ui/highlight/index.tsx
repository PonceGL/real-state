import { IconName } from "@/components/ui/icon";


export interface HighlightProps{
    numberHighlight: number,
    textHighlight: string,
    iconText?: IconName,
}

export function Highlight({ numberHighlight, textHighlight, iconText }: HighlightProps) {
  return (
    <div className="flex flex-col items-center ">
      <h1 className="font-bold text-brand-primary-500 text-xl">{numberHighlight}</h1>
      <h1>{iconText}</h1>
      <p className="neutral-base-900">{textHighlight}</p>
    </div>
  );
}
