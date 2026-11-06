import { useState } from 'react';

export enum RoomTab {
  Students = 'students',
  Questions = 'questions',
}

interface RoomTabsState {
  section: RoomTab;
  visited: RoomTab[];
}

function visitTab(state: RoomTabsState, section: RoomTab): RoomTabsState {
  return {
    section,
    visited: state.visited.includes(section) ? state.visited : [...state.visited, section],
  };
}

export function useRoomTabs() {
  const [navigation, setNavigation] = useState<RoomTabsState>({
    section: RoomTab.Students,
    visited: [RoomTab.Students],
  });
  const select = (section: string) => {
    if (section !== RoomTab.Students && section !== RoomTab.Questions) return;

    setNavigation((current) => visitTab(current, section));
  };

  return { ...navigation, select };
}
