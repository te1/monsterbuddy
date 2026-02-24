export function makeSlug(text: string): string {
  return text
    .replace(/( |\/)/g, '-')
    .replace(/\(|\)/g, '')
    .replace(/-&/, '')
    .toLowerCase();
}

export function keyBy<T, K extends keyof T>(items: T[], key: K): Map<T[K], T> {
  return new Map(items.map((item) => [item[key], item]));
}

export function isEmptyObject(object: object | null | undefined): boolean {
  return !object || Object.keys(object).length === 0;
}
