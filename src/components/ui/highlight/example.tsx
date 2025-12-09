import { Highlight, type HighlightProps } from "@/components/ui/highlight";

const HIGHLIGHT_VARIANTS: HighlightProps[] = [
  {
    numberHighlight: 2,
    textHighlight: "Pisos",
  },
  {
    numberHighlight: 3,
    textHighlight: "Recámaras",
  },
  {
    numberHighlight: 2.5,
    textHighlight: "Baños",
  },
  {
    numberHighlight: 2,
    textHighlight: "Autos",
  },
];

export function ExampleHighlight() {
  return (
    <div className="flex justify-around w-xl ">
      {HIGHLIGHT_VARIANTS.map((item) => (
        <Highlight key={item.textHighlight} {...item} />
      ))}
    </div>
  );
}
