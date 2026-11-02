import { useEffect, useRef, useState } from 'react';
import { Icon } from '../../components/Icon';
import { IconName } from '../../components/icon-names';
import type { SavedGame } from '../../game/types';

interface SettingsDialogProps {
  preferences: SavedGame['preferences'];
  onPreference: (key: keyof SavedGame['preferences'], value: boolean) => void;
  onReset: () => void;
  onClose: () => void;
}

export function SettingsDialog({
  preferences,
  onPreference,
  onReset,
  onClose,
}: SettingsDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  useEffect(() => {
    ref.current?.showModal();
  }, []);
  return (
    <dialog
      className="settings-dialog"
      ref={ref}
      aria-labelledby="settings-title"
      onCancel={onClose}
      onClose={onClose}
    >
      <div className="dialog-header">
        <h2 id="settings-title">Do seu jeito</h2>
        <button className="icon-button" onClick={onClose} aria-label="Fechar ajustes">
          <Icon name={IconName.Close} />
        </button>
      </div>
      <p>Ajuste a experiência para explorar com conforto.</p>
      <label className="setting-row">
        <span>
          <strong>Texto maior</strong>
          <small>Amplia os textos de toda a expedição.</small>
        </span>
        <input
          type="checkbox"
          checked={preferences.largeText}
          onChange={(event) => onPreference('largeText', event.target.checked)}
        />
      </label>
      <label className="setting-row">
        <span>
          <strong>Reduzir movimentos</strong>
          <small>Reduz efeitos visuais. Você também pode visitar pela lista de destinos.</small>
        </span>
        <input
          type="checkbox"
          checked={preferences.reducedMotion}
          onChange={(event) => onPreference('reducedMotion', event.target.checked)}
        />
      </label>
      <div className="settings-privacy">
        <h3>Seu progresso, neste navegador</h3>
        <p>
          Não pedimos nome nem cadastro. Limpar os dados do navegador também apaga suas descobertas.
        </p>
      </div>
      {confirmReset ? (
        <div className="reset-confirm">
          <p>Apagar todas as missões concluídas e começar de novo?</p>
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
            <button className="subtle-button" onClick={() => setConfirmReset(false)}>
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <button className="text-button reset-button" onClick={() => setConfirmReset(true)}>
          Reiniciar expedição
        </button>
      )}
    </dialog>
  );
}
