import { TrashIcon } from '@radix-ui/react-icons';
import { Button } from '../../../../../../../../../../../../components/Button/Button';
import { ButtonVariant } from '../../../../../../../../../../../../components/Button/button-styles';
import { FormField } from '../../../../../../../FormField/FormField';
import { CorrectChoice } from './CorrectChoice/CorrectChoice';

interface ChoiceRowProps {
  id: string;
  number: number;
  checked: boolean;
  canRemove: boolean;
  onSelect: () => void;
  onRemove: () => void;
}

export function ChoiceRow({ id, number, checked, canRemove, onSelect, onRemove }: ChoiceRowProps) {
  return (
    <div className="flex items-end gap-3 min-w-0">
      <CorrectChoice id={id} number={number} checked={checked} onSelect={onSelect} />
      <FormField name={'choice-' + id} label={'Alternativa ' + number} />
      <Button
        variant={ButtonVariant.Danger}
        aria-label={'Excluir alternativa ' + number}
        disabled={!canRemove}
        onClick={onRemove}
      >
        <TrashIcon aria-hidden />
      </Button>
    </div>
  );
}
