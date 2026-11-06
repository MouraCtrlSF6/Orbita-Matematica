import { Button } from '../../../../../../components/Button/Button';
import { ButtonVariant } from '../../../../../../components/Button/button-styles';

interface CountActionProps {
  count: number;
  limit: number;
  label: string;
  onAdd: () => void;
}

export function CountAction({ count, limit, label, onAdd }: CountActionProps) {
  return (
    <div className="flex justify-end items-center gap-3 text-small text-muted">
      <span>
        {count} de {limit}
      </span>
      <Button
        aria-label={label}
        disabled={count >= limit}
        variant={ButtonVariant.Secondary}
        onClick={onAdd}
      >
        +
      </Button>
    </div>
  );
}
