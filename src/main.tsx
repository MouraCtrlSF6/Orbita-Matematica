import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppRouter } from './app/routes/AppRouter/AppRouter';
import { AppRoutes } from './app/routes/AppRoutes/AppRoutes';
import { SessionProvider } from './app/contexts/SessionProvider/SessionProvider';
import { FirebaseInitializer } from './infrastructure/firebase/FirebaseInitializer/FirebaseInitializer';
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
