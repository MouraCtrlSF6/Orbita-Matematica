import { initializeAppCheck, ReCaptchaEnterpriseProvider, type AppCheck } from 'firebase/app-check';
import type { FirebaseApp } from 'firebase/app';

let appCheck: AppCheck | undefined;

export function getRoomAppCheck(app: FirebaseApp) {
  const siteKey = import.meta.env.VITE_FIREBASE_RECAPTCHA_ENTERPRISE_SITE_KEY?.trim();

  if (!siteKey) return;
  return (appCheck ??= initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider(siteKey),
    isTokenAutoRefreshEnabled: true,
  }));
}
