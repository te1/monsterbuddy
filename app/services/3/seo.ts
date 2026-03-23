import type { Monster } from './types';
import { isDeviant } from './data';

export function getMonsterSeo(monster: Monster) {
  const title = `${monster.name} In ${gameTypeToFullLabel('mhst3')}`;

  let description = `${monster.name} is a rank ${monster.rank} `;

  if (monster.hatchable) {
    description += 'hatchable ';
  }

  if (isDeviant(monster)) {
    description += 'Deviant ';
  }

  // TODO feral, invasive, calamitous, endangered, mutation?

  description += `${monster.genus}.`;

  return {
    title,
    description,
  };
}
