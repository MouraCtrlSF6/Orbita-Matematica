import { useId } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { questionListSearch } from '../../../rooms/teacher-routes';
import { questionCreationSearch } from '../../../panel/panel-search';

export function useQuestionCreation() {
  const id = useId();
  const { search } = useLocation();
  const navigate = useNavigate();
  const open = search === questionCreationSearch;
  const toggle = () =>
    void navigate({ search: open ? questionListSearch : questionCreationSearch });

  return { id, open, toggle };
}

export type QuestionCreation = ReturnType<typeof useQuestionCreation>;
