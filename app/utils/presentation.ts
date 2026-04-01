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

export function formatAttackType(attackType?: AttackType): string {
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

export function formatWeaponType(weaponType?: WeaponType): string {
  switch (weaponType) {
    case 'slash':
      return 'Slash';

    case 'blunt':
      return 'Blunt';

    case 'pierce':
      return 'Pierce';

    default:
      return 'Unknown';
  }
}

export function formatElement(element?: ElementType): string {
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

export function stripTags(input: string): string {
  if (typeof window !== 'undefined') {
    // https://stackoverflow.com/questions/822452/strip-html-from-text-javascript/47140708#47140708

    const doc = new DOMParser().parseFromString(input, 'text/html');
    return doc.body.textContent || '';
  }

  // DOMParser is not available in SSR, so use a workaround
  // https://stackoverflow.com/questions/822452/strip-html-from-text-javascript/822464#822464
  return input.replace(/<[^>]*>?/gm, '');
}

export function parseSomeMarkdown(input: string): string {
  let result = stripTags(input);

  // **some text** -> <b>some text</b>
  result = result.replace(/\*\*([^**]*)\*\*/g, '<strong class="font-semibold">$1</strong>');

  return result;
}

export function formatDate(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
    timeZone: 'UTC',
  });

  return dateFormatter.format(parsedDate);
}
