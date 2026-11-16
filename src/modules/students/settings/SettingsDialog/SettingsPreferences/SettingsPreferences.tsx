import { type PreferenceDefinition, type SettingsDialogProps } from '../settings-dialog-types';
import { PreferenceSetting } from './PreferenceSetting/PreferenceSetting';

const preferenceDefinitions: PreferenceDefinition[] = [
  {
    key: 'largeText',
    title: 'Texto maior e mais contraste',
    description:
      'Amplia os textos, usa caixa alta e aumenta o contraste de botões, alternativas e dicas.',
  },
  {
    key: 'reducedMotion',
    title: 'Reduzir movimentos',
    description: 'Reduz efeitos visuais. Você também pode visitar pela lista de destinos.',
  },
  {
    key: 'soundEnabled',
    title: 'Som da nave',
    description: 'Reproduz um som suave de propulsão ao movimentar a nave.',
  },
];

export function SettingsPreferences(props: SettingsDialogProps) {
  return (
    <>
      {preferenceDefinitions.map((definition) => (
        <PreferenceSetting key={definition.key} definition={definition} {...props} />
      ))}
    </>
  );
}
