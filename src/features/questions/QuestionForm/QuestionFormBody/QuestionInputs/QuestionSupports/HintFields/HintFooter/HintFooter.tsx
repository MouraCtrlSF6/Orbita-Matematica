import { sectors } from '../../../../../../../../content/sectors';
import { CountAction } from '../../../CountAction/CountAction';

interface HintFooterProps {
  count: number;
  sectorId: string;
  onAdd: () => void;
}

export function HintFooter({ count, sectorId, onAdd }: HintFooterProps) {
  const limit = sectors.find((sector) => sector.id === sectorId)!.hintLimit;

  return (
    <>
      <CountAction count={count} limit={3} label="Adicionar dica" onAdd={onAdd} />
      <p className="text-small text-muted m-0">Dicas disponíveis ao aluno neste setor: {limit}.</p>
    </>
  );
}
