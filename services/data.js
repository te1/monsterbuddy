import _ from 'lodash';
import { deepFreeze } from './utils';
import monsters from '~/assets/data/monsters';

_.forEach(monsters, (monster) => {
  monster.slug = monster.name
    .replace(/ /g, '-')
    .replace(/\(|\)/g, '')
    .toLowerCase();
});

deepFreeze(monsters);

export { monsters };
export const monstersByNo = Object.freeze(_.keyBy(monsters, 'no'));
export const monstersByName = Object.freeze(_.keyBy(monsters, 'name'));
export const monstersBySlug = Object.freeze(_.keyBy(monsters, 'slug'));
export const monsties = getMonstersByHatchable(true);
export const genera = getGenera();
export const habitats = getHabitats();

export function getGenera(monsterList = monsters) {
  return deepFreeze(_.sortBy(_.uniq(_.map(monsterList, 'genus'))));
}

export function getHabitats(monsterList = monsters) {
  return deepFreeze(_.sortBy(_.uniq(_.map(monsterList, 'habitat'))));
}

export function getMonstersByName(name, monsterList = monsters) {
  name = _.toLower(name);

  return deepFreeze(
    _.filter(monsterList, (monster) => {
      return _.includes(_.toLower(monster.name), name);
    })
  );
}

export function getMonstersByGenus(genus, monsterList = monsters) {
  return deepFreeze(_.filter(monsterList, { genus }));
}

export function getMonstersByHabitat(habitat, monsterList = monsters) {
  return deepFreeze(_.filter(monsterList, { habitat }));
}

export function getMonstersByIsSubspecies(
  mustBeSubspecies,
  monsterList = monsters
) {
  return deepFreeze(
    _.filter(monsterList, (monster) => {
      return isSubspecies(monster) === mustBeSubspecies;
    })
  );
}

export function getMonstersByIsDeviant(mustBeDeviant, monsterList = monsters) {
  return deepFreeze(
    _.filter(monsterList, (monster) => {
      return isDeviant(monster) === mustBeDeviant;
    })
  );
}

export function getMonstersByHatchable(hatchable, monsterList = monsters) {
  return deepFreeze(
    _.filter(monsterList, (monster) => {
      if (hatchable) {
        return monster.hatchable === hatchable;
      }
      return !monster.hatchable;
    })
  );
}

export function isVariant(monster, variantType) {
  return !!(
    monster &&
    monster.related &&
    monster.related.length &&
    _.some(monster.related, (relation) => relation.type === variantType)
  );
}

export function isSubspecies(monster) {
  return isVariant(monster, 'subspeciesOf');
}

export function isDeviant(monster) {
  return isVariant(monster, 'deviantOf');
}

export function isColorVariant(monster) {
  return isVariant(monster, 'color');
}

export function isElementalVariant(monster) {
  return isVariant(monster, 'element');
}
