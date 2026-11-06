import { useMatch } from 'react-router';

export function useSessionRole() {
  const student = useMatch('/students');
  const teacher = useMatch('/teachers');

  return student ? 'student' : teacher ? 'teacher' : null;
}
