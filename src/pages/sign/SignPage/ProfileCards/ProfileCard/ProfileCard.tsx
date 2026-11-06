import { Link } from 'react-router';
import { Icon } from '../../../../../components/Icon/Icon';
import { IconName } from '../../../../../components/icon-names';
import { ProfileCardContent } from './ProfileCardContent/ProfileCardContent';

export interface ProfileCardProps {
  to: string;
  title: string;
  description: string;
  icon: IconName;
  iconClassName: string;
  id: string;
}

export function ProfileCard({ to, title, description, icon, iconClassName, id }: ProfileCardProps) {
  return (
    <Link
      to={to}
      aria-labelledby={id}
      aria-describedby={`${id}-description`}
      className="grid min-w-0 grid-rows-[auto_1fr_auto] gap-3 rounded-dialog border border-selected-border bg-white p-7 text-left text-ink no-underline hover:border-planet-purple hover:bg-selected focus-visible:outline-planet-mint [&>svg]:justify-self-end [&>svg]:text-primary-hover ds-down-mobile:gap-2 ds-down-mobile:p-5"
    >
      <span
        className={`grid h-14 w-14 place-items-center rounded-card text-primary-hover ${iconClassName}`}
      >
        <Icon name={icon} size={30} />
      </span>
      <ProfileCardContent id={id} title={title} description={description} />
      <Icon name={IconName.Arrow} size={26} />
    </Link>
  );
}
