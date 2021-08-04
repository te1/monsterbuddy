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

export const allElements = [
  'none',
  'fire',
  'water',
  'thunder',
  'ice',
  'dragon',
];

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

export function formatWeaponType(weaponType) {
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

export function formatGrowth(growth) {
  switch (growth) {
    case 'regular':
      return 'Regular';

    case 'quick':
      return 'Quick';

    default:
      return 'Unknown';
  }
}

export function stripTags(input) {
  // https://stackoverflow.com/questions/822452/strip-html-from-text-javascript/47140708#47140708

  let doc = new DOMParser().parseFromString(input, 'text/html');
  return doc.body.textContent || '';
}

export function parseSomeMarkdown(input) {
  let result = stripTags(input);

  // **some text** -> <b>some text</b>
  result = result.replace(/\*\*([^**]*)\*\*/g, '<b>$1</b>');

  return result;
}

export function makeHead(config = {}) {
  let result = {
    meta: [],
    link: [],
  };

  if (config.title) {
    result.title = config.title;

    result.meta.push({
      hid: 'twitter:title',
      name: 'twitter:title',
      content: config.title,
    });

    result.meta.push({
      hid: 'og:title',
      name: 'og:title',
      content: config.title,
    });
  }

  if (config.description) {
    result.meta.push({
      hid: 'description',
      name: 'description',
      content: config.description,
    });

    result.meta.push({
      hid: 'twitter:description',
      name: 'twitter:description',
      content: config.description,
    });

    result.meta.push({
      hid: 'og:description',
      name: 'og:description',
      content: config.description,
    });
  }

  if (config.canonical) {
    result.link.push({
      hid: 'canonical',
      rel: 'canonical',
      href: config.canonical,
    });
  }

  if (config.image) {
    result.meta.push({
      hid: 'twitter:image',
      name: 'twitter:image',
      content: config.image,
    });

    result.meta.push({
      hid: 'og:image',
      name: 'og:image',
      content: config.image,
    });

    result.meta.push({
      hid: 'og:image:secure_url',
      name: 'og:image:secure_url',
      content: config.image,
    });
  }

  if (config.imageAlt) {
    result.meta.push({
      hid: 'twitter:image:alt',
      name: 'twitter:image:alt',
      content: config.imageAlt,
    });

    result.meta.push({
      hid: 'og:image:alt',
      name: 'og:image:alt',
      content: config.imageAlt,
    });
  }

  return result;
}
