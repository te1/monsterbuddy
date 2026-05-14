export function getQueryString(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}
