export function getRouteParamAsString(param: unknown): string | undefined {
  return typeof param === 'string' ? param : undefined;
}

export function getLastOrEmpty<T>(array: T[]): T[] {
  // useful for simulating radio group behavior but allowing "unselecting" with UCheckboxGroup
  return array.length > 0 ? [array.at(-1)!] : [];
}
