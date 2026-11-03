export type Validator = (value: unknown) => boolean;
export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
export function matchesFields(
  value: Record<string, unknown>,
  fields: Record<string, Validator>,
): boolean {
  return Object.entries(fields).every(([field, validate]) => validate(value[field]));
}
export function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}
export function isText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}
export function isTextArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isText);
}
export function optional(validate: Validator): Validator {
  return (value) => value === undefined || validate(value);
}
