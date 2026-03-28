import type { Monster } from './types';
import { loadAsset } from '../assets';

const monsterImages = import.meta.glob<string>('~/assets/2/monster/*.avif', {
  import: 'default',
});

const smallMonsterImages = import.meta.glob<string>('~/assets/2/monster-sm/*.webp', {
  import: 'default',
});

function getMonsterImageKey(monster: Monster, small = false) {
  if (small) {
    return `/assets/2/monster-sm/${monster.name}.webp`;
  }
  return `/assets/2/monster/${monster.name}.avif`;
}

export function hasMonsterImage(monster: Monster, small = false) {
  return getMonsterImageKey(monster, small) in (small ? smallMonsterImages : monsterImages);
}

export async function getMonsterImageUrl(monster: Monster, small = false) {
  return await loadAsset(
    small ? smallMonsterImages : monsterImages,
    getMonsterImageKey(monster, small)
  );
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
