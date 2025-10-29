import { TagComponent } from "@/components/ui/tag";

export function ExampleTag() {
  return (
    <>
      <div className="w-full p-2 grid grid-cols-3 grid-rows-3 gap-2">
        <TagComponent size="defaultCapsule" variant="success" />
        <TagComponent size="defaultCapsule" variant="default" />
        <TagComponent size="defaultCapsule" variant="warning" />
        <TagComponent size="defaultCapsule" variant="inverted" />
        <TagComponent size="defaultCapsule" variant="outlineInverted" />
        <TagComponent size="defaultCapsule" variant="outline" />
        <TagComponent size="defaultCapsule" variant="danger" />
      </div>
      <div className="w-full p-2 grid grid-cols-3 grid-rows-3 gap-2">
        <TagComponent size="defaultSquare" variant="outline" />
        <TagComponent size="defaultSquare" variant="inverted" />
        <TagComponent size="defaultSquare" variant="default" />
        <TagComponent size="defaultSquare" variant="danger" />
        <TagComponent size="defaultSquare" variant="outlineInverted" />
        <TagComponent size="defaultSquare" variant="success" />
        <TagComponent size="defaultSquare" variant="warning" />
      </div>
    </>
  );
}
