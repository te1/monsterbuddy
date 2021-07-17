import _ from 'lodash';
import monsters from '~/assets/data/monsters';

export { monsters };
export const monsties = _.filter(monsters, { hatchable: true });
export const genera = _.uniq(_.map(monsters, 'genus'));
export const habitats = _.uniq(_.map(monsters, 'habitat'));

export function getMonstersByGenus(genus, monsterList = monsters) {
  return _.filter(monsterList, { genus });
}

export function getMonstiesByGenus(genus, monstieList = monsties) {
  return _.filter(monstieList, { genus });
}

export function getMonstersByHabitat(habitat, monsterList = monsters) {
  return _.filter(monsterList, { habitat });
}

export function getMonstiesByHabitat(habitat, monstieList = monsties) {
  return _.filter(monstieList, { habitat });
}
