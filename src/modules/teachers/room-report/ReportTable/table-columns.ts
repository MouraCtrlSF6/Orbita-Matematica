export function tableColumns(headers: string[], weights?: number[]): number[] {
  return weights ?? headers.map(() => 1);
}
