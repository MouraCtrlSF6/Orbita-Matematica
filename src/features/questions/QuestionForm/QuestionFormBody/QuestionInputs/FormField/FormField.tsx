import type { ComponentProps } from 'react';
import { FieldLabel } from '../FieldLabel/FieldLabel';
import { useFieldValidation } from './hooks/useFieldValidation';
import { FieldControl } from './FieldControl/FieldControl';
import { FieldHelp } from './FieldHelp/FieldHelp';

interface FormFieldProps extends Omit<ComponentProps<'input'>, 'size' | 'onInput' | 'onInvalid'> {
  label: string;
  optional?: boolean;
  multiline?: boolean;
  description?: string;
}

export function FormField({ label, optional = false, description, ...input }: FormFieldProps) {
  const field = useFieldValidation(optional);

  return (
    <div className="grid gap-1 min-w-0 flex-1">
      <label htmlFor={field.id}>
        <FieldLabel label={label} optional={optional} />
      </label>
      <FieldControl {...field.control} aria-label={label} {...input} />
      <FieldHelp id={field.id} description={description} error={field.error} />
    </div>
  );
}
