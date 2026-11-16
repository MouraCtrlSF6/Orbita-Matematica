export const teacherRoomCreation = '/teachers/rooms/create';

export const questionListSearch = '?tab=questions&list=true';

export function teacherPanelPath(roomName: string) {
  return `/teachers/rooms/${encodeURIComponent(roomName)}/panel`;
}
