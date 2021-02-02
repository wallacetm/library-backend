export function normalizeNumber(value: unknown): number {
  const valueNumber = +value;
  if (isNaN(valueNumber)) {
    return undefined;
  }
  return valueNumber;
}