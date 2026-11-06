interface CorrectChoiceProps {
  id: string;
  number: number;
  checked: boolean;
  onSelect: () => void;
}

export function CorrectChoice({ id, number, checked, onSelect }: CorrectChoiceProps) {
  return (
    <label className="grid gap-1 min-h-11 place-items-center text-small">
      Correta
      <input
        type="radio"
        name="correctChoice"
        value={id}
        checked={checked}
        onChange={onSelect}
        required
        aria-label={'Alternativa ' + number + ' correta'}
        className="w-5 h-5 accent-primary mb-3"
      />
    </label>
  );
}
