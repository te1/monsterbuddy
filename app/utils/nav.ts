export function getRouteParamAsString(param: unknown): string | undefined {
  return typeof param === 'string' ? param : undefined;
}
