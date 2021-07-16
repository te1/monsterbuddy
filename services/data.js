import _ from 'lodash';
import monsters from '~/assets/data/monsters';

export { monsters };
export const monsties = _.filter(monsters, { hatchable: true });
export const genera = _.uniq(_.map(monsters, 'genus'));
export const habitats = _.uniq(_.map(monsters, 'habitat'));

export function getMonstersByHabitat(habitat) {
  return _.filter(monsters, { habitat });
}

export function getMonstiesByHabitat(habitat) {
  return _.filter(monsties, { habitat });
}
