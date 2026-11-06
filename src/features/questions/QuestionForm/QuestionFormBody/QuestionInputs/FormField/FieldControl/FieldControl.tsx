import { Input, type InputProps } from '../../../../../../../components/Input/Input';
import { Textarea } from '../../../../../../../components/Textarea/Textarea';
import type { FormEventHandler, ReactEventHandler } from 'react';

interface FieldControlProps extends Omit<InputProps, 'onInput' | 'onInvalid'> {
  multiline?: boolean;
  onInput?: FormEventHandler<HTMLElement>;
  onInvalid?: ReactEventHandler<HTMLElement>;
}

export function FieldControl({ multiline, ...props }: FieldControlProps) {
  if (!multiline) return <Input {...props} />;
  return (
    <Textarea
      id={props.id}
      name={props.name}
      required={props.required}
      defaultValue={props.defaultValue}
      maxLength={props.maxLength}
      aria-label={props['aria-label']}
      aria-invalid={props['aria-invalid']}
      aria-describedby={props['aria-describedby']}
      className={props.className}
      onInvalid={props.onInvalid}
      onInput={props.onInput}
    />
  );
}
