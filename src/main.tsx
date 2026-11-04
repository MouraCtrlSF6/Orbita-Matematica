import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppRouter } from './app/routes/AppRouter';
import { AppRoutes } from './app/routes/AppRoutes';
import { SessionProvider } from './app/contexts/SessionProvider';
import './styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter>
      <SessionProvider>
        <AppRoutes />
      </SessionProvider>
    </AppRouter>
  </StrictMode>,
);
