import { TagComponent } from "@/components/ui/tag";

export function ExampleTag() {
  return (
    <>
      <div className=" grid grid-cols-3 grid-rows-3 gap-2">
        <TagComponent size="defaultCapsule" variant="success" text="Nuevo" />
        <TagComponent size="defaultCapsule" variant="default" text="Nuevo" />
        <TagComponent size="defaultCapsule" variant="warning" text="Nuevo" />
        <TagComponent size="defaultCapsule" variant="inverted" text="Nuevo" />
        <TagComponent size="defaultCapsule" variant="inverted" text="C" />
        <TagComponent
          size="defaultCapsule"
          variant="outlineInverted"
          text="Nuevo"
        />
        <TagComponent
          size="defaultCapsule"
          variant="outlineInverted"
          text="Nuevo"
        />
        <TagComponent size="defaultCapsule" variant="outline" text="Nuevo" />
      </div>
      <div className=" grid grid-cols-3 grid-rows-3 gap-2">
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
