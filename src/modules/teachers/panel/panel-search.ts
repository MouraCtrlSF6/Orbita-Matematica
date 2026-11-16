import { questionListSearch } from '../rooms/teacher-routes';

export const studentListSearch = '?tab=students';
export const questionCreationSearch = '?tab=questions&create=true';

export function panelSearch(params: URLSearchParams) {
  const tab = params.get('tab');
  if (tab === 'students') return studentListSearch;
  if (tab === 'questions' && isCreation(params)) {
    return questionCreationSearch;
  }
  return questionListSearch;
}

function isCreation(params: URLSearchParams) {
  return params.get('create') === 'true' && !params.has('list');
}
