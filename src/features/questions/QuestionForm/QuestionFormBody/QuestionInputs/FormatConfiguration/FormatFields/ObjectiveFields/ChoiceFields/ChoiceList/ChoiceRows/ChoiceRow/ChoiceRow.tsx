import { TrashIcon } from '@radix-ui/react-icons';
import { TooltipButton } from '../../../../../../../../../../../../components/Tooltip/TooltipButton/TooltipButton';
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
    <div className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] gap-x-3 gap-y-1">
      <CorrectChoice id={id} number={number} checked={checked} onSelect={onSelect} />
      <FormField
        name={'choice-' + id}
        label={'Alternativa ' + number}
        containerClassName="col-start-2 row-start-1 row-span-3 grid-rows-subgrid"
      />
      <TooltipButton
        variant={ButtonVariant.Danger}
        className="col-start-3 row-start-2 size-11 self-center p-0"
        aria-label={'Excluir alternativa ' + number}
        disabled={!canRemove}
        onClick={onRemove}
      >
        <TrashIcon aria-hidden="true" className="size-5" />
      </TooltipButton>
    </div>
  );
}
