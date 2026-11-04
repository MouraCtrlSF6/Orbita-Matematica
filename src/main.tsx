import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppRouter } from './app/routes/AppRouter';
import { AppRoutes } from './app/routes/AppRoutes';
import { SessionProvider } from './app/contexts/SessionProvider';
import { FirebaseInitializer } from './infrastructure/firebase/FirebaseInitializer';
import './styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FirebaseInitializer />
    <AppRouter>
      <SessionProvider>
        <AppRoutes />
      </SessionProvider>
    </AppRouter>
  </StrictMode>,
);
