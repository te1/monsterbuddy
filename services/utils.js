import _ from 'lodash';
import {
  isSubspecies,
  isDeviant,
  isColorVariant,
  isElementalVariant,
} from '~/services/data';

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

  if (isColorVariant(monster)) {
    result += ', Color variant';
  }

  if (isElementalVariant(monster)) {
    result += ', Elemental variant';
  }

  return result;
}

export function formatMonsterPrimaryLocation(monster) {
  if (monster.locations?.length) {
    return monster.locations[0].sub;
  }
  return '-';
}

export function formatMonsterLocation(location) {
  let result = location.main;

  if (location.sub) {
    result += ` - ${location.sub}`;
  }

  return result;
}

export function formatMonsterLocations(monster) {
  return _.map(monster.locations, (location) =>
    formatMonsterLocation(location)
  );
}

export function formatMonsterDens(monster) {
  if (monster.dens && monster.dens.length) {
    return monster.dens.join(', ');
  }
  return null;
}

export function formatAttackType(attackTypeOrMonster) {
  if (typeof attackTypeOrMonster !== 'string') {
    attackTypeOrMonster = attackTypeOrMonster?.monstie?.attackType;
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

export function formatElement(element) {
  switch (element) {
    case 'none':
      return 'Non-elemental';

    case 'fire':
      return 'Fire';

    case 'water':
      return 'Water';

    case 'thunder':
      return 'Thunder';

    case 'ice':
      return 'Ice';

    case 'dragon':
      return 'Dragon';

    default:
      return 'Unknown';
  }
}
