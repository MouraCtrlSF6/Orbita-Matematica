import { useId } from 'react';
import { FieldLabel } from '../FieldLabel/FieldLabel';
import { TokenCanvas } from './TokenCanvas/TokenCanvas';
import { TokenComposer } from './TokenComposer/TokenComposer';
import { useTokenEditor } from './hooks/useTokenEditor';
import { TokenPreview } from './TokenPreview/TokenPreview';

export interface TokenEditorProps {
  name: string;
  label: string;
  optional?: boolean;
  available?: string[];
}

export function TokenEditor({ name, label, optional, available }: TokenEditorProps) {
  const id = useId();
  const editor = useTokenEditor(available);

  return (
    <div className="grid gap-3 min-w-0">
      <FieldLabel label={label} optional={optional} />
      <TokenComposer available={available} onAdd={editor.add} />
      <TokenCanvas id={id} name={name} label={label} required={!optional} editor={editor} />
      <TokenPreview
        formula={editor.formula}
        count={editor.tokens.length}
        onClear={editor.setTokens.bind(null, [])}
      />
    </div>
  );
}
