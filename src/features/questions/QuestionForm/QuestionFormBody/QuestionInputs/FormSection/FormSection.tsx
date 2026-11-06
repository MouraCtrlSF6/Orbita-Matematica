import { useState, type ReactNode } from 'react';
import { Collapsible } from '../../../../../../components/Collapsible/Collapsible';
import { CollapsibleVariant } from '../../../../../../components/Collapsible/collapsible-styles';
import { FieldLabel } from '../FieldLabel/FieldLabel';

interface FormSectionProps {
  title: string;
  optional?: boolean;
  defaultOpen?: boolean;
  children: ReactNode;
}

export function FormSection({ title, optional, defaultOpen = false, children }: FormSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Collapsible
      title={<FieldLabel label={title} optional={optional} />}
      variant={CollapsibleVariant.Card}
      open={open}
      onOpenChange={setOpen}
      keepMounted
      onInvalidCapture={() => setOpen(true)}
      triggerProps={{
        className:
          'bg-selected text-primary-hover rounded-t-card [&_.text-muted]:text-primary-hover',
      }}
      contentProps={{ className: 'grid gap-4 p-4' }}
    >
      {children}
    </Collapsible>
  );
}
