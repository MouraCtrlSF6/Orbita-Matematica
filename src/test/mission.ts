import { missionById } from '../content/missions';

export function mission(id: string) {
  const value = missionById.get(id);
  if (!value) throw new Error(`Missão de teste não encontrada: ${id}`);
  return value;
}
