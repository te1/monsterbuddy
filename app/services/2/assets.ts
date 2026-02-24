import type { Monster } from './types';

const monsterImages = import.meta.glob<string>('~/assets/2/monster/*.webp', {
  eager: true,
  import: 'default',
});

export function getMonsterImageUrl(monster: Monster) {
  return monsterImages[`/assets/2/monster/${monster.name}.webp`] ?? null;
}

const monsterIcons = import.meta.glob<string>('~/assets/2/monster-icon/*.png', {
  eager: true,
  import: 'default',
});

export function getMonsterIconUrl(monster: Monster) {
  return (
    monsterIcons[`/assets/2/monster-icon/${monster.name}.png`] ??
    monsterIcons['/assets/2/monster-icon/_Unknown.png']
  );
}

const eggIcons = import.meta.glob<string>('~/assets/2/egg/*.svg', {
  eager: true,
  import: 'default',
});

export function getEggIconUrlForGenus(genus: GenusType) {
  return eggIcons[`/assets/2/egg/_${genus}.svg`] ?? eggIcons['/assets/2/egg/_Unknown.svg'];
}

export function getEggIconUrlForMonster(monster?: Monster) {
  return eggIcons[`/assets/2/egg/${monster?.name}.svg`] ?? eggIcons['/assets/2/egg/_Unknown.svg'];
}
