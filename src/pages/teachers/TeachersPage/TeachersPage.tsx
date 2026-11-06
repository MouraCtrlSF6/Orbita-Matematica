import { TeacherRoomView } from './TeacherRoomView/TeacherRoomView';
import { ProfileFallbackNavigation } from './ProfileFallbackNavigation/ProfileFallbackNavigation';

export function TeachersPage() {
  return (
    <main className="entry-page min-h-[100vh] grid grid-cols-[minmax(0,1fr)] content-start justify-items-center gap-4 p-6 text-center has-[.create-room-form]:content-center [&_code]:[overflow-wrap:anywhere]">
      <ProfileFallbackNavigation />
      <h1>Área do professor</h1>
      <TeacherRoomView />
    </main>
  );
}
