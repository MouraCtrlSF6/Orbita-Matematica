import { useDialog } from './hooks/useDialog';
import { type SettingsDialogProps } from './settings-dialog-types';
import { DialogHeader } from './DialogHeader/DialogHeader';
import { SettingsPreferences } from './SettingsPreferences/SettingsPreferences';
import { ResetSection } from './ResetSection/ResetSection';

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
