import { useEffect } from 'react';
import { initializeFirebaseAnalytics } from '../firebase-app';

export function FirebaseInitializer() {
  useEffect(() => {
    void initializeFirebaseAnalytics();
  }, []);
  return null;
}
