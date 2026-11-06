import { useEffect } from 'react';
import { initializeFirebase } from '../firebase-app';

export function FirebaseInitializer() {
  useEffect(() => {
    initializeFirebase();
  }, []);
  return null;
}
