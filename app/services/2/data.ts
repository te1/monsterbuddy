import { intersection, sortBy, uniq } from 'es-toolkit/array';
import type {
  CatavanStand,
  CoopQuest,
  EggColor,
  Habitat,
  LocationType,
  Monster,
  MonsterLocation,
  RidingAction,
} from './types';
import monsters_ from '~/assets/2/monsters.json';
import coopQuests_ from '~/assets/2/coopQuests.json';
import sortedHabitats_ from '~/assets/2/habitats.json';
import sortedCatavanStands_ from '~/assets/2/catavanStands.json';
import sortedRidingActions_ from '~/assets/2/ridingActions.json';

const monsters = monsters_ as unknown as Monster[];
const coopQuests = coopQuests_ as unknown as CoopQuest[];
const sortedHabitats = sortedHabitats_ as unknown as Habitat[];
const sortedCatavanStands = sortedCatavanStands_ as CatavanStand[];
const sortedRidingActions = sortedRidingActions_ as RidingAction[];

export { monsters, coopQuests, sortedHabitats, sortedRidingActions };
export const monstersByName = keyBy(monsters, 'name');
export const monstersBySlug = keyBy(monsters, 'slug');
export const monsties = getMonstersByHatchable(true);
export const catavanStands = getCatavanStandsWithDetails();
export const catavanStandsBySlug = keyBy(catavanStands, 'slug');
export const coopQuestsBySlug = keyBy(coopQuests, 'slug');
export const ridingActionsBySlug = keyBy(sortedRidingActions, 'slug');
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

export function getHabitats(monsterList: Monster[] = monsters): string[] {
  const names = uniq(monsterList.map((monster) => monster.habitat));

  const withSortOrder = names.map((name) => ({
    name,
    sortOrder: sortedHabitats.find((habitat) => habitat.name === name)?.sortOrder ?? name,
  }));

  return sortBy(withSortOrder, ['sortOrder']).map((item) => item.name);
}

export function getCoopQuests(monsterList: Monster[] = monsters): CoopQuest[] {
  return coopQuests.filter((coopQuest) =>
    monsterList.some((monster) =>
      monster.locations.some(
        (location) => location.type === 'coopQuest' && location.main === coopQuest.name
      )
    )
  );
}

export function getCatavanStands(monsterList: Monster[] = monsters): string[] {
  return getCatavanStandsWithDetails(monsterList).map((catavanStand) => catavanStand.name);
}

export function getCatavanStandsWithDetails(monsterList: Monster[] = monsters): CatavanStand[] {
  const names = uniq(
    monsterList.flatMap((monster) =>
      monster.locations
        .filter((location) => location.type === 'catavanStand')
        .map((location) => location.sub)
        .filter((sub): sub is string => sub != null)
    )
  );

  return sortBy(
    names.map((name) => {
      const catavanStand = sortedCatavanStands.find((catavanStand) => catavanStand.name === name);

      return {
        name,
        slug: makeSlug(name),
        zone: catavanStand?.zone ?? 'Unknown',
        sortOrder: catavanStand?.sortOrder ?? Infinity,
      };
    }),
    ['sortOrder']
  );
}

export function getEldersLairFloors(monsterList: Monster[] = monsters): string[] {
  return uniq(
    monsterList.flatMap((monster) =>
      monster.locations
        .filter((location) => location.type === 'eldersLair')
        .map((location) => location.main ?? '?')
    )
  ).sort();
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

export function getMonstersByHabitat(
  habitat: string,
  monsterList: Monster[] = monsters
): Monster[] {
  return monsterList.filter((monster) => monster.habitat === habitat);
}

export function getMonstersByCoopQuest(
  coopQuest: string,
  monsterList: Monster[] = monsters
): Monster[] {
  return monsterList.filter((monster) =>
    monster.locations.some(
      (location) => location.type === 'coopQuest' && location.main === coopQuest
    )
  );
}

export function getMonstersByCatavanStand(
  catavanStand: string,
  monsterList: Monster[] = monsters
): Monster[] {
  return monsterList.filter((monster) =>
    monster.locations.some(
      (location) => location.type === 'catavanStand' && location.sub === catavanStand
    )
  );
}

export function getMonstersByEldersLairFloor(
  eldersLairFloor: string,
  monsterList: Monster[] = monsters
): Monster[] {
  return monsterList.filter((monster) =>
    monster.locations.some(
      (location) => location.type === 'eldersLair' && location.main === eldersLairFloor
    )
  );
}

export function getMonstiesByAttackType(
  attackType: AttackType,
  monsterList: Monster[] = monsties
): Monster[] {
  return monsterList.filter((monster) => monster.monstie?.attackType === attackType);
}

export function getMonstiesByAttackElement(
  attackElement: ElementType,
  monsterList: Monster[] = monsties
): Monster[] {
  return monsterList.filter((monster) => monster.monstie?.attackElement === attackElement);
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

export function isVariant(
  monster: Monster,
  variantType: 'subspeciesOf' | 'deviantOf' | 'color' | 'element'
): boolean {
  return monster.related?.some((relation) => relation.type === variantType) ?? false;
}

export function isSubspecies(monster: Monster): boolean {
  return isVariant(monster, 'subspeciesOf');
}

export function isDeviant(monster: Monster): boolean {
  return isVariant(monster, 'deviantOf');
}

export function isColorVariant(monster: Monster): boolean {
  return isVariant(monster, 'color');
}

export function isElementalVariant(monster: Monster): boolean {
  return isVariant(monster, 'element');
}

export function getMonsterLocation(
  monster: Monster,
  locationType: LocationType
): MonsterLocation | undefined {
  return monster.locations.find((location) => location.type === locationType);
}

export function getMonsterLocations(
  monster: Monster,
  locationType: LocationType
): MonsterLocation[] {
  return monster.locations.filter((location) => location.type === locationType);
}
