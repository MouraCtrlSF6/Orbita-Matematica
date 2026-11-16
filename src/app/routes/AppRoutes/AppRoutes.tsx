import { lazy, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router';
import { Spinner } from '../../../components/Spinner/Spinner';
import { SignPage } from '../../../pages/sign/SignPage/SignPage';
import { ActiveMissionPage } from '../../../pages/students/ActiveMissionPage/ActiveMissionPage';
import { EnterRoomPage } from '../../../pages/students/EnterRoomPage/EnterRoomPage';
import { ExplorationPage } from '../../../pages/students/ExplorationPage/ExplorationPage';
import { StudentRoomLayoutPage } from '../../../pages/students/StudentRoomLayoutPage/StudentRoomLayoutPage';
import { SummaryPage } from '../../../pages/students/SummaryPage/SummaryPage';
import { fixedRoutes } from '../fixed-routes';

const CreateRoomPage = lazy(() =>
  import('../../../pages/teachers/CreateRoomPage/CreateRoomPage').then(({ CreateRoomPage }) => ({
    default: CreateRoomPage,
  })),
);
const TeacherPanelPage = lazy(() =>
  import('../../../pages/teachers/TeacherPanelPage/TeacherPanelPage').then(
    ({ TeacherPanelPage }) => ({
      default: TeacherPanelPage,
    }),
  ),
);
const loadingTeacher = (
  <div className="grid min-h-dvh place-items-center">
    <Spinner role="status" label="Carregando área do professor…" size="2rem" />
  </div>
);

const routes = [
  { path: fixedRoutes.sign, element: <SignPage /> },
  { path: fixedRoutes.teachers, element: <Navigate replace to={fixedRoutes.createRoom} /> },
  { path: fixedRoutes.teacherRooms, element: <Navigate replace to={fixedRoutes.createRoom} /> },
  {
    path: fixedRoutes.createRoom,
    element: (
      <Suspense fallback={loadingTeacher}>
        <CreateRoomPage />
      </Suspense>
    ),
  },
  {
    path: '/teachers/rooms/:roomName',
    children: [
      { index: true, element: <Navigate replace to="panel?tab=questions&list=true" /> },
      {
        path: 'panel',
        element: (
          <Suspense fallback={loadingTeacher}>
            <TeacherPanelPage />
          </Suspense>
        ),
      },
    ],
  },
  { path: fixedRoutes.students, element: <Navigate replace to={fixedRoutes.enterRoom} /> },
  { path: fixedRoutes.studentRooms, element: <Navigate replace to={fixedRoutes.enterRoom} /> },
  { path: fixedRoutes.enterRoom, element: <EnterRoomPage /> },
  {
    path: '/students/rooms/:roomName',
    element: <StudentRoomLayoutPage />,
    children: [
      { index: true, element: <Navigate replace to="sectors" /> },
      { path: 'sectors', element: <ExplorationPage /> },
      { path: 'sectors/:sectorId', element: <ExplorationPage /> },
      { path: 'sectors/:sectorId/missions/:missionId', element: <ActiveMissionPage /> },
      { path: 'summary', element: <SummaryPage /> },
    ],
  },
  { path: '*', element: <Navigate to={fixedRoutes.sign} replace /> },
];

export function AppRoutes() {
  return useRoutes(routes);
}
