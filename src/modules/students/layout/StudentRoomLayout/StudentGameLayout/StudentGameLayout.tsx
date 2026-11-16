import type { ReactNode } from 'react';
import { studentGameClassName } from './student-game-class-name';
import { StudentGameSidebar } from './StudentGameSidebar/StudentGameSidebar';
import { StudentGameWorkspace } from './StudentGameWorkspace/StudentGameWorkspace';
import { StudentGameSettings } from './StudentGameSettings/StudentGameSettings';
import { useStudentGame } from '../../../session/hooks/useStudentGame';
import { StudentGameMain } from './StudentGameWorkspace/StudentGameMain/StudentGameMain';

const skipLink = (
  <a className="skip-link fixed -top-25 left-5 z-10 bg-white py-3 px-5 focus:top-3" href="#main">
    Pular para o conteúdo
  </a>
);

interface StudentGameLayoutProps {
  children: ReactNode;
}

export function StudentGameLayout({ children }: StudentGameLayoutProps) {
  const { state } = useStudentGame();

  return (
    <div className={studentGameClassName(state.screen, state.save.preferences)}>
      {skipLink}
      <StudentGameSidebar />
      <StudentGameWorkspace screen={state.screen}>
        <StudentGameMain>{children}</StudentGameMain>
      </StudentGameWorkspace>
      <StudentGameSettings />
    </div>
  );
}
