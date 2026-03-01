import type { CatavanStand, CoopQuest, Monster, RidingAction } from './types';
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

export function getCatavanStandSeo(catavanStand: CatavanStand, monsterCount: number) {
  const title = `${catavanStand.name} In ${gameTypeToFullLabel('mhst2')}`;

  let description = `${catavanStand.name} is a catavan stand `;

  if (catavanStand.zone) {
    description += `in ${catavanStand.zone} `;
  }

  description += 'that you can fast travel to.';

  if (monsterCount) {
    description += ` It is home to ${monsterCount} different monsters.`;
  }

  return {
    title,
    description,
  };
}

export function getCoopQuestSeo(coopQuest: CoopQuest, monsterCount: number) {
  const title = `${coopQuest.name} In ${gameTypeToFullLabel('mhst2')}`;

  let description = `${coopQuest.name} is a `;

  if (coopQuest.rarity) {
    description += `${coopQuest.rarity} star rarity `;
  }

  if (coopQuest.type) {
    description += `${coopQuest.type} type `;
  }

  description += 'co-op quest';

  if (coopQuest.type === 'explore') {
    description += `. You can find ${monsterCount} different monstie eggs inside.`;
  }

  return {
    title,
    description,
  };
}

export function getRidingActionSeo(ridingAction: RidingAction, monsterCount: number) {
  const title = `${ridingAction.name} In ${gameTypeToFullLabel('mhst2')}`;

  let description = `${ridingAction.name} is a riding action that `;

  if (monsterCount) {
    description += `${monsterCount} `;
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
