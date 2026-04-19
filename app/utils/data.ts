export function makeSlug(text: string): string {
  return text
    .replace(/( |\/)/g, '-')
    .replace(/\+/g, '-plus')
    .replace(/[().:']/g, '')
    .replace(/-&/, '')
    .replace(/-+/g, '-')
    .toLowerCase();
}

export function keyBy<T, K extends keyof T>(items: T[], key: K): Map<T[K], T> {
  return new Map(items.map((item) => [item[key], item]));
}

export function isEmptyObject(object: object | null | undefined): boolean {
  return !object || Object.keys(object).length === 0;
}

export function sortKeys(obj: object): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(obj as Record<string, unknown>).sort(([a], [b]) => a.localeCompare(b))
  );
}

export async function hash(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const buffer = await crypto.subtle.digest('SHA-256', data);
  const array = Array.from(new Uint8Array(buffer));

  // format as hex string
  return array.map((byte) => byte.toString(16).padStart(2, '0')).join('');
}
