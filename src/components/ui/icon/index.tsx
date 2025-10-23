import {
  BuildingIcon,
  CalculatorIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  ClockIcon,
  CloseIcon,
  DocsIcon,
  EmailIcon,
  EyeIcon,
  FacebookIcon,
  FilterIcon,
  GraphicArrowIcon,
  HandHeartIcon,
  HomeIcon,
  LocationIcon,
  MedalIcon,
  MenuIcon,
  MountainIcon,
  PencilIcon,
  PhoneIcon,
  SearchIcon,
  SendIcon,
  ShieldIcon,
  SquareIcon,
  TreeIcon,
  UsersIcon,
  WhatsAppIcon,
} from "@/components/icons/index";
import { IconProps } from "@/types/icons";

const iconMap = {
  BuildingIcon: BuildingIcon,
  CalculatorIcon: CalculatorIcon,
  CheckCircleIcon: CheckCircleIcon,
  ChevronRightIcon: ChevronRightIcon,
  ClockIcon: ClockIcon,
  CloseIcon: CloseIcon,
  DocsIcon: DocsIcon,
  EmailIcon: EmailIcon,
  EyeIcon: EyeIcon,
  FacebookIcon: FacebookIcon,
  FilterIcon: FilterIcon,
  GraphicArrowIcon: GraphicArrowIcon,
  HandHeartIcon: HandHeartIcon,
  HomeIcon: HomeIcon,
  LocationIcon: LocationIcon,
  MedalIcon: MedalIcon,
  MenuIcon: MenuIcon,
  MountainIcon: MountainIcon,
  PencilIcon: PencilIcon,
  PhoneIcon: PhoneIcon,
  SearchIcon: SearchIcon,
  SendIcon: SendIcon,
  ShieldIcon: ShieldIcon,
  SquareIcon: SquareIcon,
  TreeIcon: TreeIcon,
  UsersIcon: UsersIcon,
  WhatsAppIcon: WhatsAppIcon,
};

type IconName = keyof typeof iconMap;

interface NameIcons extends IconProps {
  name: IconName;
}

export function Icon({ name, ...rest }: NameIcons) {
  const SelectdIcon = iconMap[name];

  return <SelectdIcon {...rest} />;
}
