import { useContext } from 'react';
import { TeacherSessionContext } from '../contexts/teacher-session-context';

export function useTeacherSession() {
  const session = useContext(TeacherSessionContext);

  if (!session) throw new Error('TeacherSession is required.');
  return session;
}
