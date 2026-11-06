import { AddButton } from '../../../../../../components/AddButton/AddButton';

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
      <AddButton aria-label={label} disabled={count >= limit} onClick={onAdd} />
    </div>
  );
}
