import {
  BuildingIcon,
  CalculatorIcon,
  FacebookIcon,
  MenuIcon,
  MountainIcon,
  PencilIcon,
  SearchIcon,
  WhatsAppIcon,
} from "@/components/icons/index";

export function ExampleIcons() {
  return (
    <>
      <div className="w-full flex flex-row">
        <FacebookIcon />
        <BuildingIcon />
        <CalculatorIcon />
        <SearchIcon />
        <PencilIcon />
        <MountainIcon />
        <MenuIcon />
        <WhatsAppIcon />
      </div>
    </>
  );
}
