import { useTeacherSession } from '../../../rooms/TeacherSession/hooks/useTeacherSession';
import { Link } from 'react-router';

export function ProfileFallbackNavigation() {
  const { teacherRoom, teacherRoomName } = useTeacherSession();

  if (teacherRoomName && teacherRoom?.status === 'ready') return null;

  return <Link to="/sign">Voltar à escolha de perfil</Link>;
}
