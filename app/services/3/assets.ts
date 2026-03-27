import type { AilmentType, Monster } from './types';
import { loadAsset } from '../assets';

const monsterImages = import.meta.glob<string>('~/assets/3/monster/*.webp', {
  import: 'default',
});

function getMonsterImageKey(monster: Monster) {
  return `/assets/3/monster/${monster.name}.webp`;
}

export function hasMonsterImage(monster: Monster) {
  return getMonsterImageKey(monster) in monsterImages;
}

export async function getMonsterImageUrl(monster: Monster) {
  return await loadAsset(monsterImages, getMonsterImageKey(monster));
}

const monsterIcons = import.meta.glob<string>('~/assets/3/monster-icon/*.png', {
  import: 'default',
});

function getMonsterIconKey(monster: Monster) {
  return `/assets/3/monster-icon/${monster.name}.png`;
}

export async function getMonsterIconUrl(monster: Monster) {
  return await loadAsset(
    monsterIcons,
    getMonsterIconKey(monster),
    '/assets/3/monster-icon/_Unknown.png'
  );
}

const eggIcons = import.meta.glob<string>('~/assets/3/egg/*.svg', {
  import: 'default',
});

export async function getEggIconUrlForMonster(monster?: Monster) {
  return await loadAsset(
    eggIcons,
    `/assets/3/egg/${monster?.name}.svg`,
    '/assets/3/egg/_Unknown.svg'
  );
}

export async function getEggIconUrlForGenus(genus: GenusType) {
  return await loadAsset(eggIcons, `/assets/3/egg/_${genus}.svg`, '/assets/3/egg/_Unknown.svg');
}

const ailmentIcons = import.meta.glob<string>('~/assets/icon/ailment-*.webp', {
  eager: true,
  import: 'default',
});

export function getAilmentIconUrl(ailment: AilmentType) {
  return ailmentIcons[`/assets/icon/ailment-${ailment}.webp`];
}
