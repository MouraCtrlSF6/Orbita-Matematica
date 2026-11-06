import type { ExpressionEditorProps } from '../ExpressionEditor';

export function ConstantValue({ value, onChange, label = 'Expressão' }: ExpressionEditorProps) {
  if (value.type !== 'constant') return null;
  return (
    <label className="grid gap-1">
      Valor de {label.toLowerCase()}
      <input
        required
        type="number"
        min={-10000}
        max={10000}
        value={value.value}
        onChange={(event) => onChange({ type: 'constant', value: Number(event.target.value) })}
      />
    </label>
  );
}
