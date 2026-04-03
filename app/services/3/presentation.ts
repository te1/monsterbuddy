import type { MonsterLocationType } from './data';
import type { AilmentType, Monster, MonsterTag, RidingActionType, StatsType } from './types';

export function formatMonsterInfoAll(monster: Monster) {
  return monster.tags?.map(formatMonsterTag).join(', ') ?? '';
}

export function formatMonsterInfoShort(monster: Monster) {
  if (monster.tags?.includes('calamitous')) {
    return formatMonsterTag('calamitous');
  }

  if (monster.tags?.includes('endangered')) {
    return formatMonsterTag('endangered');
  }

  if (monster.tags?.includes('mutation')) {
    return formatMonsterTag('mutation');
  }

  if (monster.tags?.includes('deviant')) {
    return formatMonsterTag('deviant');
  }

  if (monster.tags?.includes('subspecies')) {
    return formatMonsterTag('subspecies');
  }
}

export function formatMonsterTag(tag: MonsterTag) {
  switch (tag) {
    case 'subspecies':
      return 'Subspecies';

    case 'deviant':
      return 'Deviant';

    case 'calamitous':
      return 'Calamitous';

    case 'endangered':
      return 'Endangered';

    case 'mutation':
      return 'Mutation';
  }
}

export function formatRidingActionType(type: RidingActionType) {
  switch (type) {
    case 'utility':
      return 'Utility';

    case 'explore':
      return 'Exploration';

    case 'combat':
      return 'Combat';

    default:
      return '';
  }
}

export function formatState(state: string) {
  switch (state) {
    case 'DEFAULT':
      return 'Default';

    case '?':
    case '??':
      return 'Enraged'; // TODO this is placeholder

    default:
      return state;
  }
}

export function formatLocationType(locationType: MonsterLocationType) {
  switch (locationType) {
    case 'permanent':
      return 'Habitat';

    case 'world':
      return 'World';

    default:
      return '';
  }
}

export function intensityToIcon(intensity: number | null) {
  switch (intensity) {
    case 2:
      return 'ph:caret-double-up-bold';

    case 1:
      return 'ph:caret-up-bold';

    case 0:
      return 'ph:number-zero-bold';

    case -1:
      return 'ph:caret-down-bold';

    case -2:
      return 'ph:caret-double-down-bold';

    default:
      return null;
  }
}

export function intensityToTextColor(intensity: number | null) {
  switch (intensity) {
    case -2:
    case -1:
      return 'text-red-500';

    case 1:
    case 2:
      return 'text-blue-500';

    default:
      return 'text-default';
  }
}

export function elementalResistanceTooltip(element: ElementType, intensity: number | null) {
  let modifier = '';

  switch (intensity) {
    case -2:
      modifier = 'greatly increased';
      break;

    case -1:
      modifier = 'increased';
      break;

    case 0:
      modifier = 'normal';
      break;

    case 1:
      modifier = 'reduced';
      break;

    case 2:
      modifier = 'greatly reduced';
      break;

    default:
      modifier = '?';
  }

  return `Takes ${modifier} ${formatElement(element).toLowerCase()} damage`;
}

export function formatAilment(ailment: AilmentType) {
  switch (ailment) {
    case 'poison':
      return 'Poison';

    case 'burn':
      return 'Burn';

    case 'paralysis':
      return 'Paralysis';

    case 'sleep':
      return 'Sleep';

    case 'blastblight':
      return 'Blastblight';

    case 'bleeding':
      return 'Bleeding';

    case 'darkness':
      return 'Darkness';

    default:
      return 'Unknown';
  }
}

export function ailmentResistanceTooltip(ailment: AilmentType, intensity: number | null) {
  let modifier = '';

  switch (intensity) {
    case -2:
      modifier = 'Greatly increased';
      break;

    case -1:
      modifier = 'Increased';
      break;

    case 0:
      modifier = 'Normal';
      break;

    case 1:
      modifier = 'Reduced';
      break;

    case 2:
      modifier = 'Greatly reduced';
      break;

    default:
      modifier = '?';
  }

  return `${modifier} chance to apply ${formatAilment(ailment).toLowerCase()}`;
}

export function statsTypeToText(type: StatsType) {
  switch (type) {
    case 'hp':
      return 'HP';

    case 'attack':
      return 'Attack';

    case 'speed':
      return 'Speed';

    case 'defense':
      return 'Defense';

    case 'crit':
      return 'Crit';

    case 'recovery':
      return 'Recovery';

    case 'stamina':
      return 'Stamina';

    default:
      return '?';
  }
}
