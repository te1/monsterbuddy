import { isDeviant } from './data';
import type { Monster } from './types';

export function getMonsterSeo(monster: Monster) {
  const title = `${monster.name} In ${gameTypeToFullLabel('mhst2')}`;

  let description = `${monster.name} is a ${monster.rarity} star rarity `;

  if (monster.hatchable) {
    description += 'hatchable ';
  }

  if (isDeviant(monster)) {
    description += 'Deviant ';
  }

  description += `${monster.genus} found in ${monster.habitat}.`;

  return {
    title,
    description,
  };
}
