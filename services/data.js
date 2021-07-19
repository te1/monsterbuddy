import _ from 'lodash';
import monsters from '~/assets/data/monsters';

export { monsters };
export const monsties = getMonstersByHatchable(true);
export const genera = getGenera();
export const habitats = getHabitats();

export function getGenera(monsterList = monsters) {
  return _.sortBy(_.uniq(_.map(monsterList, 'genus')));
}

export function getHabitats(monsterList = monsters) {
  return _.sortBy(_.uniq(_.map(monsterList, 'habitat')));
}

export function getMonstersByGenus(genus, monsterList = monsters) {
  return _.filter(monsterList, { genus });
}

export function getMonstersByHabitat(habitat, monsterList = monsters) {
  return _.filter(monsterList, { habitat });
}

export function getMonstersByHatchable(hatchable, monsterList = monsters) {
  return _.filter(monsters, (monster) => {
    if (hatchable) {
      return monster.hatchable === hatchable;
    }
    return !monster.hatchable;
  });
}
