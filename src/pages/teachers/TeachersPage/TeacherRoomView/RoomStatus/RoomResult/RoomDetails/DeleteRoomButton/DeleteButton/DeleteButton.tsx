import { Button } from '../../../../../../../../../components/Button/Button';
import { ButtonVariant } from '../../../../../../../../../components/Button/button-styles';
import { TrashIcon } from '@radix-ui/react-icons';

export interface DeleteButtonProps {
  pending: boolean;
}

export function DeleteButton({ pending }: DeleteButtonProps) {
  return (
    <Button variant={ButtonVariant.DangerSolid} disabled={pending} type="submit">
      <TrashIcon aria-hidden="true" className="size-5 shrink-0" />
      {pending ? 'Excluindo…' : 'Excluir sala'}
    </Button>
  );
}
