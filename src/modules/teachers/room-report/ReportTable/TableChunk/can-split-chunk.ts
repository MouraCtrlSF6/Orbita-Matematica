export function canSplitChunk(rows: string[][]) {
  return rows.some((row) => row.some((value) => value.length > 200));
}
