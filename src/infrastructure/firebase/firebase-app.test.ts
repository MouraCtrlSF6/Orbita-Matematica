import { afterEach, beforeEach, expect, it, vi } from 'vitest';

const { app, analytics, getAnalytics, isSupported, logEvent } = vi.hoisted(() => ({
  app: {},
  analytics: {},
  getAnalytics: vi.fn(),
  isSupported: vi.fn(),
  logEvent: vi.fn(),
}));

vi.mock('firebase/app', () => ({ initializeApp: () => app }));
vi.mock('firebase/analytics', () => ({ getAnalytics, isSupported, logEvent }));

beforeEach(() => {
  vi.resetModules();
  vi.resetAllMocks();
  vi.stubEnv('VITE_FIREBASE_API_KEY', 'test-key');
  vi.stubEnv('VITE_FIREBASE_PROJECT_ID', 'test-project');
  vi.stubEnv('VITE_FIREBASE_APP_ID', 'test-app');
  isSupported.mockResolvedValue(true);
  getAnalytics.mockReturnValue(analytics);
});

afterEach(() => vi.unstubAllEnvs());

it('uses the existing Firebase app and reuses Analytics for room events', async () => {
  const { logFirebaseEvent } = await import('./firebase-app');

  await logFirebaseEvent('room_created', { room_id: 'room-id' });
  await logFirebaseEvent('student_room_entrance', { room_id: 'room-id' });

  expect(getAnalytics).toHaveBeenCalledExactlyOnceWith(app);
  expect(logEvent.mock.calls).toEqual([
    [analytics, 'room_created', { room_id: 'room-id' }],
    [analytics, 'student_room_entrance', { room_id: 'room-id' }],
  ]);
});

it('skips collection when the browser does not support Analytics', async () => {
  isSupported.mockResolvedValue(false);
  const { logFirebaseEvent } = await import('./firebase-app');

  await logFirebaseEvent('room_deleted', { room_id: 'room-id' });

  expect(getAnalytics).not.toHaveBeenCalled();
  expect(logEvent).not.toHaveBeenCalled();
});

it('contains SDK collection errors', async () => {
  logEvent.mockImplementation(() => {
    throw new Error('Collection blocked');
  });
  const { logFirebaseEvent } = await import('./firebase-app');

  await expect(
    logFirebaseEvent('room_report_pdf_generated', { room_id: 'room-id' }),
  ).resolves.toBeUndefined();
});
