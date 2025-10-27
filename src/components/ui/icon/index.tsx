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
  MagnifyinIcon,
  MedalIcon,
  MenuIcon,
  MountainIcon,
  PencilIcon,
  PhoneIcon,
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
  Calculator: CalculatorIcon,
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
  MagnifyinIcon: MagnifyinIcon,
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
