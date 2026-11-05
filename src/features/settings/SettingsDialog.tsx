import { useState, type ChangeEventHandler } from 'react';
import { Icon } from '../../components/Icon';
import { IconName } from '../../components/icon-names';
import type { SavedGame } from '../../game/types';
import { useDialog } from './hooks/useDialog';
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
    <label className="setting-row flex items-center justify-between py-[1.0625rem] px-0 [border-top:1px_solid_#eee9f2] gap-5 [&_strong]:text-body [&_strong]:block [&_small]:text-small [&_small]:block [&_small]:text-[#6a5b74] [&_small]:mt-1 [&_input]:w-[1.4375rem] [&_input]:h-[1.4375rem] [&_input]:[accent-color:#8c6db4] [&_input]:shrink-0 [.large-text_&_small]:text-root">
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
    <div className="dialog-header flex items-center justify-between gap-5 [&_h2]:text-dialog-heading">
      <h2 id="settings-title">Do seu jeito</h2>
      <button
        className="icon-button [background:#f2eff7] text-[#746283] [border:0] w-10 h-10 rounded-full grid place-items-center"
        onClick={onClose}
        aria-label="Fechar ajustes"
      >
        <Icon name={IconName.Close} />
      </button>
    </div>
  );
}
const privacy = (
  <div className="settings-privacy [border-top:1px_solid_#eee9f2] my-2.5 mx-0 pt-5.5 [&_h3]:text-body [&_h3]:tracking-[0] [&_p]:text-small [&_p]:mt-[0.4375rem] [&_p]:text-[#685573]">
    <h3>Seu progresso, neste navegador</h3>
    <p>
      Limpar os dados do navegador apaga suas descobertas locais. Os registros compartilhados na
      sala ficam com o professor até ele excluir a sala.
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
    <div className="button-row [.tutorial-pilot_&]:flex [.tutorial-pilot_&]:flex-wrap [.tutorial-pilot_&]:gap-3 [.tutorial-pilot_&]:mt-[0.9375rem] flex gap-2.5 flex-wrap mt-[0.9375rem]">
      <button
        className="button danger min-h-11 [border:0] rounded-control inline-flex justify-center items-center gap-[0.6875rem] py-3 px-5 text-small font-bold no-underline ds-disabled:[opacity:0.48] ds-disabled:[transform:none]! ds-danger:bg-danger ds-danger:text-white ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] [.feedback_&]:mt-[1.0625rem] [.tutorial-card_&]:mt-6"
        onClick={() => {
          onReset();
          onClose();
        }}
      >
        Sim, apagar progresso
      </button>
      <button
        className="subtle-button [background:#f6f5f8] [border:1px_solid_#e6e1ed] text-[#665873] rounded-subtle py-[0.5625rem] px-3 inline-flex items-center justify-center gap-[0.4375rem] text-label min-h-10 ds-hover:[background:#ece6f5] ds-down-mobile:text-caption"
        onClick={onCancel}
      >
        Cancelar
      </button>
    </div>
  );
}
function ResetConfirmation(props: ResetButtonsProps) {
  return (
    <div className="reset-confirm p-[0.9375rem] [background:#fff2f1] rounded-option text-support">
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
    <button
      className="text-button reset-button inline-flex items-center justify-center gap-[0.5625rem] text-label font-semibold [background:none] text-[#9d5661] [border:0] py-2 px-0 ds-hover:underline [.support-banner_&]:ml-auto [.support-banner_&]:whitespace-nowrap [.support-banner_&]:text-caption ds-down-desktop:[.support-banner_&]:ml-13.5 ds-down-tablet:[.support-banner_&]:ml-auto ds-down-mobile:[.support-banner_&]:ml-13.5 ds-down-mobile:[.support-banner_&]:-mt-2.5 mt-3"
      onClick={() => setConfirm(true)}
    >
      Reiniciar expedição
    </button>
  );
}
export function SettingsDialog(props: SettingsDialogProps) {
  const ref = useDialog();
  return (
    <dialog
      className="settings-dialog [border:1px_solid_#d8cfdf] [box-shadow:0_1.5625rem_6.25rem_#16102644] rounded-dialog p-[1.6875rem] max-w-130 [width:calc(100%_-_2.1875rem)] text-ink bg-white [&::backdrop]:[background:#14132299] [&::backdrop]:[backdrop-filter:blur(0.25rem)] [&_>_p]:text-support [&_>_p]:text-[#695876] [&_>_p]:mt-[0.8125rem] [&_>_p]:mr-0 [&_>_p]:mb-[1.4375rem] [&_>_p]:ml-0 [.large-text_&]:text-dialog-body [.large-text_&_p]:text-root"
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
