import type { MonsterLocationType } from './data';
import type { Monster, MonsterTag, RidingActionType } from './types';

export function formatMonsterInfoAll(monster: Monster) {
  return monster.tags.map(formatMonsterTag).join(', ');
}

export function formatMonsterInfoShort(monster: Monster) {
  if (monster.tags.includes('calamitous')) {
    return formatMonsterTag('calamitous');
  }

  if (monster.tags.includes('endangered')) {
    return formatMonsterTag('endangered');
  }

  if (monster.tags.includes('mutation')) {
    return formatMonsterTag('mutation');
  }

  if (monster.tags.includes('deviant')) {
    return formatMonsterTag('deviant');
  }

  if (monster.tags.includes('subspecies')) {
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
