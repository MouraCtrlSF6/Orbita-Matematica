export const roomNameMaxLength = 48;

export function normalizeRoomName(value: FormDataEntryValue | null) {
  const name = String(value ?? '')
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
  return /^[a-z0-9][a-z0-9 -]{1,46}[a-z0-9]$/.test(name) ? name : null;
}

export const invalidRoomName =
  'Use de 3 a 48 caracteres. O nome aceita letras, números, espaços e hífens.';
