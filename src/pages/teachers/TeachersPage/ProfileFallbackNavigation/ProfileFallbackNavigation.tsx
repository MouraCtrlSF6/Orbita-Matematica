import { useSession } from '../../../../app/contexts/hooks/useSession';
import { ProfileBackLink } from '../ProfileBackLink/ProfileBackLink';

export function ProfileFallbackNavigation() {
  const { teacherRoom, teacherRoomName } = useSession();

  if (teacherRoomName && teacherRoom?.status === 'ready') return null;

  return (
    <div className="w-full max-w-[64rem] text-left">
      <ProfileBackLink />
    </div>
  );
}
