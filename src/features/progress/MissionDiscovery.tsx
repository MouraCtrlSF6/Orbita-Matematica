import { Icon } from '../../components/Icon';
import { IconName } from '../../components/icon-names';
import { type DiscoveryProps } from './summary-types';
import { DiscoveryDetails } from './DiscoveryDetails';

export function MissionDiscovery(props: DiscoveryProps) {
  return (
    <li>
      <Icon name={props.result ? IconName.Check : IconName.Star} size={19} />
      <DiscoveryDetails {...props} />
    </li>
  );
}
