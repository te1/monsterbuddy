import _ from 'lodash';
import { deepFreeze } from './utils';
import monsters from '~/assets/data/monsters';

_.forEach(monsters, (monster) => {
  monster.slug = monster.name
    .replace(/ /g, '-')
    .replace(/\(|\)/g, '')
    .toLowerCase();

  if (monster.hatchable && monster.monstie) {
    monster.monstie.attackElement = getMonstieAttackElement(monster);
    monster.monstie.stats.bestAttack = getMonstieBestAttack(monster);
    monster.monstie.stats.bestDefense = getMonstieBestDefense(monster);
    monster.monstie.stats.worstDefense = getMonstieWorstDefense(monster);
    monster.monstie.stats.otherDefense = getMonstieOtherDefense(monster);
  }
});

deepFreeze(monsters);

export { monsters };
export const monstersByNo = Object.freeze(_.keyBy(monsters, 'no'));
export const monstersByName = Object.freeze(_.keyBy(monsters, 'name'));
export const monstersBySlug = Object.freeze(_.keyBy(monsters, 'slug'));
export const monsties = getMonstersByHatchable(true);
export const monstiesByNo = Object.freeze(_.keyBy(monsties, 'no'));
export const monstiesByName = Object.freeze(_.keyBy(monsties, 'name'));
export const monstiesBySlug = Object.freeze(_.keyBy(monsties, 'slug'));
export const genera = getGenera();
export const habitats = getHabitats();
export const ridingActions = getRidingActions();

export function getGenera(monsterList = monsters) {
  return deepFreeze(_.sortBy(_.uniq(_.map(monsterList, 'genus'))));
}

export function getHabitats(monsterList = monsters) {
  return deepFreeze(_.sortBy(_.uniq(_.map(monsterList, 'habitat'))));
}

export function getRidingActions(monsterList = monsties) {
  return deepFreeze(
    _.sortBy(_.uniq(_.flatMap(_.map(monsterList, 'monstie.ridingActions'))))
  );
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

export function getMonstiesByAttackType(attackType, monsterList = monsties) {
  return deepFreeze(
    _.filter(monsterList, (monster) => {
      return monster?.monstie?.attackType === attackType;
    })
  );
}

export function getMonstiesByAttackElement(
  attackElement,
  monsterList = monsties
) {
  return deepFreeze(
    _.filter(monsterList, (monster) => {
      return monster?.monstie?.attackElement === attackElement;
    })
  );
}

export function getMonstiesByRidingAction(
  ridingAction,
  monsterList = monsties
) {
  return deepFreeze(
    _.filter(monsterList, (monster) => {
      return _.includes(monster?.monstie?.ridingActions, ridingAction);
    })
  );
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
  return _.some(monster?.related, (relation) => relation.type === variantType);
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

function getMonstieAttackElement(monster) {
  return getMonstieBestAttack(monster)?.element;
}

function getMonstieBestAttack(monster) {
  let attack = monster?.monstie?.stats?.attack;

  attack = _.transform(
    attack,
    (result, value, key) => {
      result.push({ element: key, value });
    },
    []
  );

  return _.maxBy(attack, 'value');
}

function getMonstieDefenseStats(monster) {
  let defense = monster?.monstie?.stats?.defense;

  defense = _.transform(
    defense,
    (result, value, key) => {
      result.push({ element: key, value });
    },
    []
  );

  return defense;
}

function getMonstieWorstDefense(monster) {
  return _.minBy(getMonstieDefenseStats(monster), 'value');
}

function getMonstieBestDefense(monster) {
  return _.maxBy(getMonstieDefenseStats(monster), 'value');
}

function getMonstieOtherDefense(monster) {
  let defense = getMonstieDefenseStats(monster);

  return _.find(defense, (item) => {
    return (
      item.value !== monster?.monstie?.stats?.bestDefense?.value &&
      item.value !== monster?.monstie?.stats?.worstDefense?.value
    );
  });
}
