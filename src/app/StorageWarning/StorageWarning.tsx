export interface StorageWarningProps {
  available: boolean;
}

export function StorageWarning({ available }: StorageWarningProps) {
  if (available) return null;
  return (
    <p
      className="storage-warning p-[0.9375rem] [background:#fff4d8] [border:1px_solid_#e9d19b] rounded-option text-[#775625] text-support mb-[1.5625rem]"
      role="status"
    >
      O navegador não permitiu salvar. Você pode continuar jogando, mas o progresso será perdido ao
      fechar ou recarregar.
    </p>
  );
}
