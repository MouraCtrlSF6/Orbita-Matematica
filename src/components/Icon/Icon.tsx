import type { ComponentType, SVGProps } from 'react';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  Cross2Icon,
  GearIcon,
  GlobeIcon,
  LockClosedIcon,
  QuestionMarkCircledIcon,
  ReaderIcon,
  RocketIcon,
  SpeakerLoudIcon,
  StarIcon,
  TargetIcon,
} from '@radix-ui/react-icons';
import { IconName } from '../icon-names';
import { OrbitIcon } from './OrbitIcon/OrbitIcon';

const icons: Record<IconName, ComponentType<Omit<SVGProps<SVGSVGElement>, 'children'>>> = {
  [IconName.Orbit]: OrbitIcon,
  [IconName.Map]: GlobeIcon,
  [IconName.Flag]: TargetIcon,
  [IconName.Book]: ReaderIcon,
  [IconName.Settings]: GearIcon,
  [IconName.Arrow]: ArrowRightIcon,
  [IconName.Star]: StarIcon,
  [IconName.Lock]: LockClosedIcon,
  [IconName.Check]: CheckIcon,
  [IconName.Sound]: SpeakerLoudIcon,
  [IconName.Bulb]: QuestionMarkCircledIcon,
  [IconName.Back]: ArrowLeftIcon,
  [IconName.Close]: Cross2Icon,
  [IconName.Rocket]: RocketIcon,
};

export interface IconProps {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 22 }: IconProps) {
  const Component = icons[name];

  return <Component width={size} height={size} aria-hidden="true" focusable="false" />;
}
