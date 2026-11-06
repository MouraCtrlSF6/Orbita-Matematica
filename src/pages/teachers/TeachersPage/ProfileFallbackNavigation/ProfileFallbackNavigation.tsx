import { useSession } from '../../../../app/contexts/hooks/useSession';
import { Link } from 'react-router';

export function ProfileFallbackNavigation() {
  const { teacherRoom, teacherRoomName } = useSession();

  if (teacherRoomName && teacherRoom?.status === 'ready') return null;

  return <Link to="/sign">Voltar à escolha de perfil</Link>;
}
