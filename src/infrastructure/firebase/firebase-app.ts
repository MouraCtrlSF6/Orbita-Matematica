import { initializeApp, type FirebaseOptions } from 'firebase/app';

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
};

export function initializeFirebase() {
  const { apiKey, projectId, appId } = firebaseConfig;
  if (apiKey && projectId && appId) return initializeApp(firebaseConfig);
}

async function loadFirebaseAnalytics() {
  try {
    const app = initializeFirebase();

    if (!app) return;

    const { getAnalytics, isSupported, logEvent } = await import('firebase/analytics');

    const supported = await isSupported();

    if (supported)
      return {
        analytics: getAnalytics(app),
        logEvent,
      };
  } catch {
    /* empty */
  }
}

let analyticsPromise: ReturnType<typeof loadFirebaseAnalytics> | undefined;

export function initializeFirebaseAnalytics() {
  return (analyticsPromise ??= loadFirebaseAnalytics());
}

export async function logFirebaseEvent(name: string, parameters: Record<string, string>) {
  try {
    const sdk = await initializeFirebaseAnalytics();

    sdk?.logEvent(sdk.analytics, name, parameters);
  } catch {
    // Collection failures must not affect the action that triggered the event.
  }
}
