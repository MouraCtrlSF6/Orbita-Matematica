interface SupportUsageProps {
  used: boolean;
}

export function SupportUsage({ used }: SupportUsageProps) {
  return (
    <span className={`font-bold ${used ? 'text-lime-600' : 'text-black'}`}>
      {used ? 'Sim' : 'Não'}
    </span>
  );
}
