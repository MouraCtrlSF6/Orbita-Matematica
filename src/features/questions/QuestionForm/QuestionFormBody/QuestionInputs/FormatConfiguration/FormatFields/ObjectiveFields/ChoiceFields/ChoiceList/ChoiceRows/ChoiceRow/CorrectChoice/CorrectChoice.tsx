interface CorrectChoiceProps {
  id: string;
  number: number;
  checked: boolean;
  onSelect: () => void;
}

export function CorrectChoice({ id, number, checked, onSelect }: CorrectChoiceProps) {
  return (
    <label className="col-start-1 row-start-1 row-span-2 grid grid-rows-subgrid gap-1 text-center">
      <span className="font-semibold">Correta</span>
      <span className="flex min-h-11 items-center justify-center">
        <input
          type="radio"
          name="correctChoice"
          value={id}
          checked={checked}
          onChange={onSelect}
          required
          aria-label={'Alternativa ' + number + ' correta'}
          className="m-0 size-5 min-h-0! p-0! accent-primary"
        />
      </span>
    </label>
  );
}
