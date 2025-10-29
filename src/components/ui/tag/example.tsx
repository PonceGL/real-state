import { TagComponent } from "@/components/ui/tag";

export function ExampleTag() {
  return (
    <>
      <div className="w-full p-2 grid grid-cols-3 grid-rows-3 gap-2">
        <TagComponent size="defaultCapsule" variant="success" text="Nueva" />
        <TagComponent size="defaultCapsule" variant="default" text="Nueva" />
        <TagComponent size="defaultCapsule" variant="warning" text="Nueva" />
        <TagComponent size="defaultCapsule" variant="inverted" text="Nueva" />
        <TagComponent
          size="defaultCapsule"
          variant="outlineInverted"
          text="Nueva"
        />
        <TagComponent
          size="defaultCapsule"
          variant="outlineInverted"
          text="Nueva"
        />
        <TagComponent size="defaultCapsule" variant="outline" text="Nueva" />
      </div>
      <div className="w-full p-2 grid grid-cols-3 grid-rows-3 gap-2">
        <TagComponent size="defaultSquare" variant="outline" text="Casa" />
        <TagComponent size="defaultSquare" variant="outline" text="Casa" />
        <TagComponent size="defaultSquare" variant="outline" text="Casa" />
        <TagComponent size="defaultSquare" variant="inverted" text="Casa" />
        <TagComponent size="defaultSquare" variant="inverted" text="Casa" />
        <TagComponent size="defaultSquare" variant="inverted" text="Casa" />
      </div>
    </>
  );
}
