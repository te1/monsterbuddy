import type { Monster, RidingAction } from './types';
import { isDeviant } from './data';

export function getMonsterSeo(monster: Monster) {
  const title = `${monster.name} In ${gameTypeToFullLabel('mhst3')}`;

  let description = `${monster.name} is a rank ${monster.rank} `;

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

export function getRidingActionSeo(ridingAction: RidingAction, monsterCount: number) {
  const title = `${ridingAction.name} In ${gameTypeToFullLabel('mhst3')}`;

  let description = `${ridingAction.name} is a riding action that `;

  if (monsterCount > 1) {
    description += `${monsterCount} `;
  }

  description += 'monsties can learn.';

  switch (ridingAction.type) {
    case 'utility':
      description += ' It provides general utility.';
      break;

    case 'explore':
      description += ' It helps with exploration in the open world.';
      break;

    case 'combat':
      description += ' It helps with combat in the open world.';
  }

  return {
    title,
    description,
  };
}
