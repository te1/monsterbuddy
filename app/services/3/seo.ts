import type { Monster, Region, RegionArea, RidingAction } from './types';

export function getMonsterSeo(monster: Monster) {
  const title = `${monster.name} In ${gameTypeToFullLabel('mhst3')}`;

  let description = `${monster.name} is a rank ${monster.rank ?? '?'} `;

  if (monster.hatchable) {
    description += 'hatchable ';
  }

  if (monster.tags.includes('deviant')) {
    description += 'Deviant ';
  }

  if (monster.tags.includes('endangered')) {
    description += 'endangered ';
  }

  if (monster.tags.includes('calamitous')) {
    description += 'Calamitous ';
  }

  description += `${monster.genus}`;

  if (monster.tags.includes('mutation')) {
    description += ' (Mutation)';
  }

  return {
    title,
    description,
  };
}

export function getRegionSeo(region: Region, monsterCount: number) {
  const title = `${region.name} In ${gameTypeToFullLabel('mhst3')}`;

  let description = `${region.name} is a region that contains ${region.areas.length} areas.`;

  description += ` It's home to ${monsterCount} different monsters.`;

  return {
    title,
    description,
  };
}

export function getAreaSeo(area: RegionArea, region: Region, monsterCount: number) {
  const title = `${area.name} In ${gameTypeToFullLabel('mhst3')}`;

  let description = `${area.name} is`;

  if (area.element === 'none') {
    description += ' an';
  } else {
    description += ` a ${formatElement(area.element)} element`;
  }

  description += ` area in ${region.name}.`;
  description += ` It's home to ${monsterCount} different monsters.`;

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
