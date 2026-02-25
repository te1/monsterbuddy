import type { CoopQuest, CoopQuestType, Monster } from './types';
import { isColorVariant, isDeviant, isElementalVariant, isSubspecies } from './data';

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
