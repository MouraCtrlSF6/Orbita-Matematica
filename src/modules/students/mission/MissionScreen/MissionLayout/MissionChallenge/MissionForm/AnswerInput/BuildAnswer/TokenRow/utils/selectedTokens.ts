export function selectedTokens(answer: string): string[] {
  return answer ? answer.split(' ') : [];
}
