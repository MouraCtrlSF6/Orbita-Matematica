import { initializeApp, type FirebaseOptions } from 'firebase/app';
import { useEffect } from 'react';

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

function initializeFirebase() {
  const { apiKey, projectId, appId } = firebaseConfig;
  if (apiKey && projectId && appId) initializeApp(firebaseConfig);
}

export function FirebaseInitializer() {
  useEffect(initializeFirebase, []);
  return null;
}
