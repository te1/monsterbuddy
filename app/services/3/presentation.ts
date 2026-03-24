import type { Monster, MonsterTag, RidingActionType } from './types';

export function formatMonsterInfo(monster: Monster) {
  return monster.tags.map(formatMonsterTag).join(', ');
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
