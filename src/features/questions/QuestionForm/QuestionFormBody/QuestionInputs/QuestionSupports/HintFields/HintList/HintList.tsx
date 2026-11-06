import { FormField } from '../../../FormField/FormField';

interface HintListProps {
  count: number;
}

export function HintList({ count }: HintListProps) {
  return (
    <div className="grid gap-3">
      {Array.from({ length: count }, (_, index) => (
        <FormField key={index} name={'hint' + (index + 1)} label={'Dica ' + (index + 1)} optional />
      ))}
    </div>
  );
}
