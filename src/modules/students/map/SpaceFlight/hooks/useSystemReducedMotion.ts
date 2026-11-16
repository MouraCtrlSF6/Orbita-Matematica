import { useEffect, useState } from 'react';

function subscribeToMotion(update: (value: boolean) => void) {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');

  const changed = () => update(media.matches);

  changed();
  media.addEventListener('change', changed);
  return () => media.removeEventListener('change', changed);
}

export function useSystemReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => subscribeToMotion(setReduced), []);
  return reduced;
}
