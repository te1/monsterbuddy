import type { Monster, RidingAction } from './types';
import { isDeviant } from './data';

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

export function getRidingActionSeo(ridingAction: RidingAction, monsters: Monster[]) {
  const title = `${ridingAction.name} In ${gameTypeToFullLabel('mhst2')}`;

  let description = `${ridingAction.name} is a riding action that `;

  if (monsters.length) {
    description += `${monsters.length} `;
  }

  description += 'monsties can learn.';

  switch (ridingAction.type) {
    case 'utility':
      description += ' It provides general utility.';
      break;

    case 'explore':
      description += ' It helps with exploration and accessing treasure chests in dens.';
      break;

    case 'search':
      description += ' It helps finding monsters, dens or materials.';
  }

  return {
    title,
    description,
  };
}
