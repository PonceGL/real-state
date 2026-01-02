import { Fragment } from "react";

import { KeyInfo, KeyInfoProps } from "@/components/ui/keyInfo";

const KEY_INFO_PROPS: KeyInfoProps[] = [
  { value: 220, label: "Terreno", iconName: "SquareIcon" },
  { value: 185, label: "Construcción", iconName: "BuildingIcon" },
  { value: 230, label: "Dormitorios", iconName: "ClockIcon" },
  { value: 185, label: "Baños", iconName: "BuildingIcon" },
];

export function ExampleKeyInfo() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {KEY_INFO_PROPS.map((keyInfo) => (
        <Fragment key={keyInfo.label + keyInfo.value + keyInfo.iconName}>
          <KeyInfo {...keyInfo} />
        </Fragment>
      ))}
    </div>
  );
}
