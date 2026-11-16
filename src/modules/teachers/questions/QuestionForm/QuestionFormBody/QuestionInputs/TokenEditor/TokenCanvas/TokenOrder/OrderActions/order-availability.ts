export function orderAvailability(selected: number, count: number) {
  const active = selected >= 0 && selected < count;

  return { left: active && selected > 0, right: active && selected < count - 1, remove: active };
}
