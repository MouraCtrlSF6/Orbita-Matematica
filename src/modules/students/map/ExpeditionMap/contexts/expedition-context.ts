import { createContext } from 'react';
import type { Expedition } from '../expedition';

export const ExpeditionContext = createContext<Expedition | null>(null);
