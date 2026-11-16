export function useAvailablePieces(tokens: string[], onChange: (tokens: string[]) => void) {
  const add = (piece: string) => onChange([...tokens, piece]);
  const remove = (index: number) => onChange(tokens.filter((_, position) => position !== index));

  return { add, remove };
}
