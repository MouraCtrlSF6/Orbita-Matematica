import { useMissionContext } from '../../../../../hooks/useMissionContext';

export function VisualButton() {
  const { session } = useMissionContext();

  return (
    <button
      className="subtle-button [background:#f6f5f8] [border:1px_solid_#e6e1ed] text-[#665873] rounded-subtle py-[0.5625rem] px-3 inline-flex items-center justify-center gap-[0.4375rem] text-label min-h-10 ds-hover:[background:#ece6f5] ds-down-mobile:text-caption"
      aria-expanded={session.visual}
      onClick={session.toggleVisual}
    >
      <span aria-hidden="true">◇</span>
      {session.visual ? 'Ocultar objetos' : 'Ver com objetos'}
    </button>
  );
}
