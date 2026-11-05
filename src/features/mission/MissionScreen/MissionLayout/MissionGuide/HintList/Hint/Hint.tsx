export interface HintProps {
  text: string;
  index: number;
}

export function Hint({ text, index }: HintProps) {
  return (
    <li>
      <span>{index + 1}</span>
      <p>{text}</p>
    </li>
  );
}
