import { useLayoutEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { questionListSearch } from '../../../../../../../rooms/teacher-routes';
import { studentListSearch } from '../../../../../../panel-search';

export enum RoomTab {
  Students = 'students',
  Questions = 'questions',
}

function useVisitedTabs(section: RoomTab) {
  const [visited, setVisited] = useState([section]);

  if (!visited.includes(section)) setVisited([...visited, section]);
  return visited;
}

function useQuestionSearch(search: string, section: RoomTab) {
  const [questionSearch, setQuestionSearch] = useState(questionListSearch);

  if (section === RoomTab.Questions && search !== questionSearch) setQuestionSearch(search);
  return questionSearch;
}

export function useRoomTabs() {
  const { search, key } = useLocation();
  const section = search === studentListSearch ? RoomTab.Students : RoomTab.Questions;
  const visited = useVisitedTabs(section);
  const questionSearch = useQuestionSearch(search, section);

  const select = useSelectRoomTab(key, section, questionSearch);
  return { section, visited, select };
}

function useSelectRoomTab(key: string, section: RoomTab, questionSearch: string) {
  const navigate = useTabNavigation(key);

  return (next: string) => {
    if (next === section) return;
    if (next === RoomTab.Students) navigate(studentListSearch);
    if (next === RoomTab.Questions) navigate(questionSearch);
  };
}

function useTabNavigation(key: string) {
  const navigate = useNavigate();
  const pending = useRef(false);

  useLayoutEffect(() => {
    pending.current = false;
  }, [key]);
  return (search: string) => {
    if (pending.current) return;

    pending.current = true;
    void navigate({ search });
  };
}
