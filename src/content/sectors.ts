import type { Sector } from '../game/types';

export const sectors: Sector[] = [
  {
    id: 'launch',
    hintLimit: 1,
    number: '01',
    name: 'Estação de lançamento',
    subtitle: 'Primeiros sinais',
    description: 'Descubra como números e letras trabalham juntos.',
    color: 'mint',
    planet: 'mint',
  },
  {
    id: 'workshop',
    hintLimit: 1,
    number: '02',
    name: 'Oficina orbital',
    subtitle: 'Conexões em órbita',
    description: 'Troque letras por valores e dê energia à expedição.',
    color: 'purple',
    planet: 'purple',
  },
  {
    id: 'base',
    hintLimit: 2,
    number: '03',
    name: 'Base de exploração',
    subtitle: 'Novas descobertas',
    description: 'Combine operações e crie o seu próprio desafio.',
    color: 'peach',
    planet: 'peach',
  },
];
