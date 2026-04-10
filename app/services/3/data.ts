import { intersection, uniq } from 'es-toolkit/array';
import type { EggColor, Monster, Region, RegionArea, RidingAction } from './types';
import monsters_ from '~/assets/3/monsters.json';
import regions_ from '~/assets/3/regions.json';
import sortedRidingActions_ from '~/assets/3/ridingActions.json';

const monsters = monsters_ as unknown as Monster[];
const regions = regions_ as unknown as Region[];
const sortedRidingActions = sortedRidingActions_ as RidingAction[];

export { monsters, regions, sortedRidingActions };
export const monstersByName = keyBy(monsters, 'name');
export const monstersBySlug = keyBy(monsters, 'slug');
export const monsties = getMonstersByHatchable(true);
export const regionsBySlug = keyBy(regions, 'slug');
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

export function getRidingActions(monsterList: Monster[] = monsties): string[] {
  return uniq(monsterList.flatMap((monster) => monster.monstie?.ridingActions ?? [])).sort();
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

export function getMonstersByIsEndangered(
  mustBeEndangered: boolean,
  monsterList: Monster[] = monsters
): Monster[] {
  return monsterList.filter(
    (monster) => (monster.tags?.includes('endangered') ?? false) === mustBeEndangered
  );
}

export function getMonstersByIsMutation(
  mustBeMutation: boolean,
  monsterList: Monster[] = monsters
): Monster[] {
  return monsterList.filter(
    (monster) => (monster.tags?.includes('mutation') ?? false) === mustBeMutation
  );
}

export function getMonstersByIsDeviant(
  mustBeDeviant: boolean,
  monsterList: Monster[] = monsters
): Monster[] {
  return monsterList.filter(
    (monster) => (monster.tags?.includes('deviant') ?? false) === mustBeDeviant
  );
}

export function getMonstersByHatchable(
  hatchable: boolean,
  monsterList: Monster[] = monsters
): Monster[] {
  return monsterList.filter((monster) =>
    hatchable ? monster.hatchable === hatchable : !monster.hatchable
  );
}

export type MonsterLocationType = 'permanent' | 'world';

export type MonsterLocation = {
  type: MonsterLocationType;
  region: string;
  regionSlug: string;
  area?: string;
  areaSlug?: string;
  areaElement?: ElementType;
};

export function getMonsterLocations(monster: Monster): MonsterLocation[] {
  const locations: MonsterLocation[] = [];

  let feral = false;
  let invasive = false;
  let endangered = false;
  let calamitous = false;

  for (const region of regions) {
    if (region.monsters.world.includes(monster.name)) {
      locations.push({
        type: 'world',
        region: region.name,
        regionSlug: region.slug,
      });
    }

    for (const area of region.areas) {
      if (area.permanent.includes(monster.name)) {
        locations.push({
          type: 'permanent',
          region: region.name,
          regionSlug: region.slug,
          area: area.name,
          areaSlug: area.slug,
          areaElement: area.element,
        });
      }

      if (area.feral.includes(monster.name)) {
        feral = true;

        locations.push({
          type: 'world',
          region: region.name,
          regionSlug: region.slug,
          area: area.name,
          areaSlug: area.slug,
          areaElement: area.element,
        });
      }

      if (area.invasive.includes(monster.name)) {
        invasive = true;

        locations.push({
          type: 'world',
          region: region.name,
          regionSlug: region.slug,
          area: area.name,
          areaSlug: area.slug,
          areaElement: area.element,
        });
      }

      if (area.endangered.includes(monster.name)) {
        endangered = true;

        locations.push({
          type: 'world',
          region: region.name,
          regionSlug: region.slug,
          area: area.name,
          areaSlug: area.slug,
          areaElement: area.element,
        });
      }

      if (area.calamitous.includes(monster.name)) {
        calamitous = true;

        locations.push({
          type: 'world',
          region: region.name,
          regionSlug: region.slug,
          area: area.name,
          areaSlug: area.slug,
          areaElement: area.element,
        });
      }
    }

    if (!feral && region.monsters.feral.includes(monster.name)) {
      feral = true;

      locations.push({
        type: 'world',
        region: region.name,
        regionSlug: region.slug,
      });
    }

    if (!invasive && region.monsters.invasive.includes(monster.name)) {
      invasive = true;

      locations.push({
        type: 'world',
        region: region.name,
        regionSlug: region.slug,
      });
    }

    if (!endangered && region.monsters.endangered.includes(monster.name)) {
      endangered = true;

      locations.push({
        type: 'world',
        region: region.name,
        regionSlug: region.slug,
      });
    }

    if (!calamitous && region.monsters.calamitous.includes(monster.name)) {
      calamitous = true;

      locations.push({
        type: 'world',
        region: region.name,
        regionSlug: region.slug,
      });
    }
  }

  return locations;
}

export function getAreaBySlug(regionSlug: string, areaSlug: string): RegionArea | undefined {
  const region = regionsBySlug.get(regionSlug);

  if (region != null) {
    return region.areas.find((area) => area.slug === areaSlug);
  }

  return undefined;
}

export function getAreasByElement(element: ElementType): { region: Region; area: RegionArea }[] {
  return regions.flatMap((region) =>
    region.areas.filter((area) => area.element === element).map((area) => ({ region, area }))
  );
}
