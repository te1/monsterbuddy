import type { Monster } from './types';
import { isDeviant } from './data';

export function getMonsterSeo(monster: Monster) {
  const title = `${monster.name} In ${gameTypeToFullLabel('mhst3')}`;

  let description = `${monster.name} is a ${monster.rank} star rarity `;

  if (monster.hatchable) {
    description += 'hatchable ';
  }

  // TODO calamitous, endangered, mutation?
  if (isDeviant(monster)) {
    description += 'Deviant ';
  }

  // TODO location
  description += `${monster.genus}`;

  return {
    title,
    description,
  };
}
