import { useEffect, useRef, useState, type ChangeEventHandler } from 'react';
import { Icon } from '../../components/Icon';
import { IconName } from '../../components/icon-names';
import type { SavedGame } from '../../game/types';
interface SettingsDialogProps {
  preferences: SavedGame['preferences'];
  onPreference: (key: keyof SavedGame['preferences'], value: boolean) => void;
  onReset: () => void;
  onClose: () => void;
}
interface SettingRowProps {
  title: string;
  description: string;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}
function SettingRow({ title, description, checked, onChange }: SettingRowProps) {
  return (
    <label className="setting-row">
      <span>
        <strong>{title}</strong>
        <small>{description}</small>
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} />
    </label>
  );
}
interface PreferenceDefinition {
  key: keyof SavedGame['preferences'];
  title: string;
  description: string;
}
const preferenceDefinitions: PreferenceDefinition[] = [
  { key: 'largeText', title: 'Texto maior', description: 'Amplia os textos de toda a expedição.' },
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
function PreferenceSetting({
  definition,
  preferences,
  onPreference,
}: {
  definition: PreferenceDefinition;
  preferences: SavedGame['preferences'];
  onPreference: SettingsDialogProps['onPreference'];
}) {
  return (
    <SettingRow
      title={definition.title}
      description={definition.description}
      checked={preferences[definition.key]}
      onChange={(event) => onPreference(definition.key, event.target.checked)}
    />
  );
}
function SettingsPreferences(props: SettingsDialogProps) {
  return (
    <>
      {preferenceDefinitions.map((definition) => (
        <PreferenceSetting key={definition.key} definition={definition} {...props} />
      ))}
    </>
  );
}
function DialogHeader({ onClose }: { onClose: SettingsDialogProps['onClose'] }) {
  return (
    <div className="dialog-header">
      <h2 id="settings-title">Do seu jeito</h2>
      <button className="icon-button" onClick={onClose} aria-label="Fechar ajustes">
        <Icon name={IconName.Close} />
      </button>
    </div>
  );
}
const privacy = (
  <div className="settings-privacy">
    <h3>Seu progresso, neste navegador</h3>
    <p>
      Não pedimos nome nem cadastro. Limpar os dados do navegador também apaga suas descobertas.
    </p>
  </div>
);
const introduction = <p>Ajuste a experiência para explorar com conforto.</p>;
interface ResetButtonsProps {
  onReset: () => void;
  onClose: () => void;
  onCancel: () => void;
}
function ResetButtons({ onReset, onClose, onCancel }: ResetButtonsProps) {
  return (
    <div className="button-row">
      <button
        className="button danger"
        onClick={() => {
          onReset();
          onClose();
        }}
      >
        Sim, apagar progresso
      </button>
      <button className="subtle-button" onClick={onCancel}>
        Cancelar
      </button>
    </div>
  );
}
function ResetConfirmation(props: ResetButtonsProps) {
  return (
    <div className="reset-confirm">
      <p>Apagar todas as missões concluídas e começar de novo?</p>
      <ResetButtons {...props} />
    </div>
  );
}
function ResetSection({ onReset, onClose }: SettingsDialogProps) {
  const [confirm, setConfirm] = useState(false);
  return confirm ? (
    <ResetConfirmation onReset={onReset} onClose={onClose} onCancel={() => setConfirm(false)} />
  ) : (
    <button className="text-button reset-button" onClick={() => setConfirm(true)}>
      Reiniciar expedição
    </button>
  );
}
function useDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    ref.current?.showModal();
  }, []);
  return ref;
}
export function SettingsDialog(props: SettingsDialogProps) {
  const ref = useDialog();
  return (
    <dialog
      className="settings-dialog"
      ref={ref}
      aria-labelledby="settings-title"
      onCancel={props.onClose}
      onClose={props.onClose}
    >
      <DialogHeader onClose={props.onClose} />
      {introduction}
      <SettingsPreferences {...props} />
      {privacy}
      <ResetSection {...props} />
    </dialog>
  );
}
