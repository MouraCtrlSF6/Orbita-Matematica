import type { ReactNode } from 'react';
import { BrowserRouter } from 'react-router';

export interface AppRouterProps {
  children: ReactNode;
}

function getBasename() {
  const relativeBase = document.querySelector<HTMLMetaElement>('meta[name="app-base"]')!.content;

  return import.meta.env.DEV ? '/' : new URL(relativeBase, document.baseURI).pathname;
}

export function AppRouter({ children }: AppRouterProps) {
  return <BrowserRouter basename={getBasename()}>{children}</BrowserRouter>;
}
