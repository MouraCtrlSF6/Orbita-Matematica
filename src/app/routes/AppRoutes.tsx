import { Navigate, useRoutes } from 'react-router';
import { SignPage } from '../../pages/sign/SignPage';
import { StudentEntryPage } from '../../pages/students/StudentEntryPage';
import { TeachersPage } from '../../pages/teachers/TeachersPage';

const routes = [
  { path: '/sign', element: <SignPage /> },
  { path: '/students', element: <StudentEntryPage /> },
  { path: '/teachers', element: <TeachersPage /> },
  { path: '*', element: <Navigate to="/sign" replace /> },
];

export function AppRoutes() {
  return useRoutes(routes);
}
