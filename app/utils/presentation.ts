import type { Monster } from '~/services/2/types';

export function gameTypeToShortLabel(gameType: GameType): string {
  switch (gameType) {
    case 'none':
      return 'Game';

    case 'mhst1':
      return 'MHST 1';

    case 'mhst2':
      return 'MHST 2';

    case 'mhst3':
      return 'MHST 3';
  }
}

export function gameTypeToFullLabel(gameType: GameType): string {
  switch (gameType) {
    case 'mhst1':
      return 'Monster Hunter Stories';

    case 'mhst2':
      return 'Monster Hunter Stories 2';

    case 'mhst3':
      return 'Monster Hunter Stories 3';

    default:
      return '';
  }
}

export function gameTypeToDescription(gameType: GameType): string {
  switch (gameType) {
    case 'mhst1':
      return 'Original / Remastered';

    case 'mhst2':
      return 'Wings of Ruin';

    case 'mhst3':
      return 'Twisted Reflection';

    default:
      return '';
  }
}

export function gameTypeToShortName(gameType: GameType): string {
  switch (gameType) {
    case 'mhst1':
    case 'mhst2':
    case 'mhst3':
      return `${gameTypeToShortLabel(gameType)}: ${gameTypeToDescription(gameType)}`;

    default:
      return '';
  }
}

export function gameTypeToFullName(gameType: GameType): string {
  switch (gameType) {
    case 'mhst1':
    case 'mhst2':
    case 'mhst3':
      return `${gameTypeToFullLabel(gameType)}: ${gameTypeToDescription(gameType)}`;

    default:
      return '';
  }
}

export function formatAttackType(attackTypeOrMonster?: AttackType | Monster): string {
  const attackType =
    typeof attackTypeOrMonster === 'string'
      ? attackTypeOrMonster
      : attackTypeOrMonster?.monstie?.attackType;

  switch (attackType) {
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
