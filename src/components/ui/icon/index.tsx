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
  MagnifyingIcon,
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
} from "@/components/icons";
import { IconProps } from "@/types/icons";

const ICON_MAP = {
  GraphicArrowIcon,
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
  HandHeartIcon,
  HomeIcon,
  LocationIcon,
  MedalIcon,
  MenuIcon,
  MountainIcon,
  PencilIcon,
  PhoneIcon,
  MagnifyingIcon,
  SendIcon,
  ShieldIcon,
  SquareIcon,
  TreeIcon,
  UsersIcon,
  WhatsAppIcon,
};

export type IconName = keyof typeof ICON_MAP;

interface IconsProps extends IconProps {
  name: IconName;
}

/**
 * Renderiza un ícono dinámicamente basado en su nombre.
 *
 * @param {IconsProps} props - Propiedades para el componente Icon.
 * @param {IconName} props.name - El nombre del ícono a renderizar.
 * @param {IconSize} props.size - Es opcional poner alguno de estos tamaños small medium large.
 * @param {IconColor} props.variant - Es opcional poner alguno de estos colores default success warning danger white black.
 * @returns {JSX.Element} El componente del ícono seleccionado.
 *
 * @example
 * <Icon name="HomeIcon" size="large" variant="success" />
 */
export function Icon({ name, ...rest }: IconsProps) {
  const SelectedIcon = ICON_MAP[name];

  return <SelectedIcon {...rest} />;
}
