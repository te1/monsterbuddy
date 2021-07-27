import _ from 'lodash';
import { isSubspecies, isDeviant, isElementalVariant } from '~/services/data';

export function deepFreeze(object) {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze

  const propNames = Object.getOwnPropertyNames(object);

  for (const name of propNames) {
    const value = object[name];

    if (value && typeof value === 'object') {
      deepFreeze(value);
    }
  }

  return Object.freeze(object);
}

export function formatMonsterNo(no, withHash = true) {
  let result = _.padStart(no, 3, '0');

  if (withHash) {
    result = '#' + result;
  }

  return result;
}

export function formatMonsterInfo(monster) {
  let result = formatMonsterNo(monster.no);

  if (isSubspecies(monster)) {
    result += ', Subspecies';
  }

  if (isDeviant(monster)) {
    result += ', Deviant';
  }

  if (isElementalVariant(monster)) {
    result += ', Elemental variant';
  }

  return result;
}

export function formatMonsterDens(monster) {
  if (monster.dens && monster.dens.length) {
    return monster.dens.join(', ');
  }
  return null;
}

export function formatAttackType(attackTypeOrMonster) {
  if (typeof attackTypeOrMonster !== 'string') {
    attackTypeOrMonster =
      attackTypeOrMonster &&
      attackTypeOrMonster.monstie &&
      attackTypeOrMonster.monstie.attackType;
  }

  switch (attackTypeOrMonster) {
    case 'power':
      return 'Power';

    case 'speed':
      return 'Speed';

    case 'technical':
      return 'Technical';

    default:
      return 'Unknown';
  }
}
