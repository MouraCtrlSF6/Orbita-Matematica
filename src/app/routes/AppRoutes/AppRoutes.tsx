import { lazy, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router';
import { SignPage } from '../../../pages/sign/SignPage/SignPage';
import { StudentEntryPage } from '../../../pages/students/StudentEntryPage/StudentEntryPage';

const TeachersPage = lazy(() =>
  import('../../../pages/teachers/TeachersPage/TeachersPage').then((module) => ({
    default: module.TeachersPage,
  })),
);

const teacherPage = (
  <Suspense fallback={<p role="status">Carregando área do professor…</p>}>
    <TeachersPage />
  </Suspense>
);

const routes = [
  { path: '/sign', element: <SignPage /> },
  { path: '/students', element: <StudentEntryPage /> },
  { path: '/teachers', element: teacherPage },
  { path: '*', element: <Navigate to="/sign" replace /> },
];

export function AppRoutes() {
  return useRoutes(routes);
}
