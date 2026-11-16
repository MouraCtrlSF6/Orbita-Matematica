interface StudentLocationProps {
  sector?: string;
}

export function StudentLocation({ sector }: StudentLocationProps) {
  return (
    <p>
      Setor atual · <span className="text-focus font-bold">{sector ?? 'Fora dos setores'}</span>
    </p>
  );
}
