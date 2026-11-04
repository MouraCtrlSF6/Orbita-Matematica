import { Navigate, useRoutes } from 'react-router';
import { SignPage } from '../../pages/sign/SignPage';
import { StudentsPage } from '../../pages/students/StudentsPage';
import { TeachersPage } from '../../pages/teachers/TeachersPage';
import './routes.css';

const routes = [
  { path: '/sign', element: <SignPage /> },
  { path: '/students', element: <StudentsPage /> },
  { path: '/teachers', element: <TeachersPage /> },
  { path: '*', element: <Navigate to="/sign" replace /> },
];

export function AppRoutes() {
  return useRoutes(routes);
}
