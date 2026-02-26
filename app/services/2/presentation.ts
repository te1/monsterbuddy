import type { CoopQuest, CoopQuestType, GrowthType, Monster } from './types';
import {
  getMonsterLocation,
  isColorVariant,
  isDeviant,
  isElementalVariant,
  isSubspecies,
} from './data';

export function formatMonsterNumber(number: number, withHash = true) {
  let result = String(number).padStart(3, '0');

  if (withHash) {
    result = '#' + result;
  }

  return result;
}

export function formatMonsterInfo(monster: Monster) {
  let result = formatMonsterNumber(monster.no);

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

export function formatMonsterPrimaryLocation(monster: Monster) {
  const location = getMonsterLocation(monster, 'catavanStand');

  return location?.sub ?? null;
}

export function formatCoopQuestType(type: CoopQuestType) {
  switch (type) {
    case 'explore':
      return 'Explore';

    case 'slay':
      return 'Slay';

    case 'time':
      return 'Time';

    default:
      return '';
  }
}

export function formatCoopQuest(coopQuest: CoopQuest) {
  let result = formatCoopQuestType(coopQuest.type);

  if (result) {
    result = `(${result}) `;
  }

  if (coopQuest.rarity != null) {
    result = `★${coopQuest.rarity} ${result}`;
  }

  result += coopQuest.name;

  return result;
}

export function formatGrowth(growth?: GrowthType) {
  switch (growth) {
    case 'slow':
      return 'Slow';

    case 'regular':
      return 'Regular';

    case 'quick':
      return 'Quick';

    default:
      return 'Unknown';
  }
}

export function formatPhase(phase: string) {
  if (phase === 'DEFAULT') {
    return 'Default';
  }
  return phase;
}

export function formatPart(part: string) {
  if (part === 'DEFAULT') {
    return 'Default';
  }
  return part;
}
