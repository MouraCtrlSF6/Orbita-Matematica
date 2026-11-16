import { createContext } from 'react';
import type { MissionViewProps } from '../mission-view';

export interface MissionContextValue extends MissionViewProps {
  onNext: () => void;
}

export const MissionContext = createContext<MissionContextValue | null>(null);
