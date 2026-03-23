import { intersection, uniq } from 'es-toolkit/array';
import type { EggColor, Monster, Region } from './types';
import monsters_ from '~/assets/3/monsters.json';
import regions_ from '~/assets/3/regions.json';

const monsters = monsters_ as unknown as Monster[];
const regions = regions_ as unknown as Region[];

export { monsters, regions };
export const monstersByName = keyBy(monsters, 'name');
export const monstersBySlug = keyBy(monsters, 'slug');
export const monsties = getMonstersByHatchable(true);
export const allElements: ElementType[] = [
  'none',
  'fire',
  'water',
  'thunder',
  'ice',
  'dragon',
] as const;

export function getGenera(monsterList: Monster[] = monsters): GenusType[] {
  return uniq(monsterList.map((monster) => monster.genus)).sort();
}

export function getRidingActions(monsterList: Monster[] = monsties): string[] {
  return uniq(monsterList.flatMap((monster) => monster.monstie?.ridingActions ?? [])).sort();
}

export function getEggColors(monsterList: Monster[] = monsties): EggColor[] {
  return uniq(monsterList.flatMap((monster) => monster.monstie?.eggColors ?? [])).sort();
}

export function getMonstersByName(name: string, monsterList: Monster[] = monsters): Monster[] {
  const query = name.toLowerCase();

  return monsterList.filter((monster) => monster.name.toLowerCase().includes(query));
}

export function getMonstersByGenus(genus: GenusType, monsterList: Monster[] = monsters): Monster[] {
  return monsterList.filter((monster) => monster.genus === genus);
}

export function getMonstiesByAttackType(
  attackType: AttackType,
  monsterList: Monster[] = monsties
): Monster[] {
  return monsterList.filter((monster) => monster.monstie?.attack === attackType);
}

export function getMonstiesByAttackElement(
  element: ElementType,
  monsterList: Monster[] = monsties
): Monster[] {
  return monsterList.filter((monster) => monster.element === element);
}

export function getMonstiesByRidingAction(
  ridingAction: string,
  monsterList: Monster[] = monsties
): Monster[] {
  return monsterList.filter((monster) =>
    (monster.monstie?.ridingActions ?? []).includes(ridingAction)
  );
}

export function getMonstiesByEggColors(
  eggColors: EggColor | EggColor[],
  monsterList: Monster[] = monsties
): Monster[] {
  const colors = Array.isArray(eggColors) ? eggColors : [eggColors];

  return monsterList.filter((monster) => {
    const monsterColors = monster.monstie?.eggColors ?? [];

    return intersection(monsterColors, colors).length > 0;
  });
}

export function getMonstersByIsDeviant(
  mustBeDeviant: boolean,
  monsterList: Monster[] = monsters
): Monster[] {
  return monsterList.filter((monster) => isDeviant(monster) === mustBeDeviant);
}

export function getMonstersByHatchable(
  hatchable: boolean,
  monsterList: Monster[] = monsters
): Monster[] {
  return monsterList.filter((monster) =>
    hatchable ? monster.hatchable === hatchable : !monster.hatchable
  );
}

export function isDeviant(monster: Monster): boolean {
  return monster.tags.includes('deviant');
}
