import type { Monster } from './types';
import { loadAsset } from '../assets';

const monsterImages = import.meta.glob<string>('~/assets/2/monster/*.webp', {
  import: 'default',
});

function getMonsterImageKey(monster: Monster) {
  return `/assets/2/monster/${monster.name}.webp`;
}

export function hasMonsterImage(monster: Monster) {
  return getMonsterImageKey(monster) in monsterImages;
}

export async function getMonsterImageUrl(monster: Monster) {
  return await loadAsset(monsterImages, getMonsterImageKey(monster));
}

const monsterIcons = import.meta.glob<string>('~/assets/2/monster-icon/*.png', {
  import: 'default',
});

export async function getMonsterIconUrl(monster: Monster) {
  return await loadAsset(
    monsterIcons,
    `/assets/2/monster-icon/${monster.name}.png`,
    '/assets/2/monster-icon/_Unknown.png'
  );
}

const eggIcons = import.meta.glob<string>('~/assets/2/egg/*.svg', {
  import: 'default',
});

export async function getEggIconUrlForGenus(genus: GenusType) {
  return await loadAsset(eggIcons, `/assets/2/egg/_${genus}.svg`, '/assets/2/egg/_Unknown.svg');
}

export async function getEggIconUrlForMonster(monster?: Monster) {
  return await loadAsset(
    eggIcons,
    `/assets/2/egg/${monster?.name}.svg`,
    '/assets/2/egg/_Unknown.svg'
  );
}
