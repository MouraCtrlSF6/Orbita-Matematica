import { FileTextIcon } from '@radix-ui/react-icons';
import { Spinner } from '../../../../../../../../../../../components/Spinner/Spinner';
interface ExportButtonContentProps {
  pending: boolean;
}
export function ExportButtonContent({ pending }: ExportButtonContentProps) {
  if (pending)
    return (
      <>
        <Spinner label="Gerando PDF…" />
        Gerando PDF…
      </>
    );
  return (
    <>
      <FileTextIcon aria-hidden="true" />
      Exportar PDF
    </>
  );
}
