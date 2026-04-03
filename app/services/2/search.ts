import { markRaw } from 'vue';
import type { CatavanStand, Monster, RidingAction } from './types';
import { buildSearchGameRootItem, buildSearchHomePageItem, buildSearchPagesGroup } from '../search';
import S2MonsterIcon from '~/components/s2/monster/S2MonsterIcon.vue';
import {
  catavanStands,
  coopQuests,
  isDeviant,
  isSubspecies,
  monsters,
  sortedRidingActions,
} from './data';
import { formatCoopQuest, formatRidingActionType } from './presentation';

function getMonsterSuffix(monster: Monster) {
  const result: string[] = [];

  if (isSubspecies(monster)) {
    result.push('Subspecies');
  }

  if (isDeviant(monster)) {
    result.push('Deviant');
  }

  if (monster.hatchable) {
    result.push('Hatchable');
    result.push('Monstie');
  }

  result.push('Monster');

  return result.join(' ');
}

function getCatavanStandSuffix(catavanStand: CatavanStand) {
  const result: string[] = [];

  if (catavanStand.zone) {
    result.push(catavanStand.zone);
  }

  result.push('Catavan Stand');

  return result.join(' ');
}

function getRidingActionSuffix(ridingAction: RidingAction) {
  const result: string[] = [];

  const type = formatRidingActionType(ridingAction.type);

  if (type) {
    result.push(type);
  }

  result.push('Riding Action');

  return result.join(' ');
}

export function buildMhst2Search(appTitle: string) {
  const monsterItems = monsters.map((monster) => ({
    label: monster.name,
    suffix: getMonsterSuffix(monster),
    to: `/2/monsters/${monster.slug}`,
    data: monster,
  }));

  const catavanStandItems = catavanStands.map((catavanStand) => ({
    label: catavanStand.name,
    suffix: getCatavanStandSuffix(catavanStand),
    icon: 'ph:map-pin-fill',
    to: `/2/catavan-stands/${catavanStand.slug}`,
  }));

  const coopQuestItems = coopQuests.map((coopQuest) => ({
    label: formatCoopQuest(coopQuest),
    suffix: 'Co-Op CoOp Quest',
    icon: 'ph:question-mark-bold',
    to: `/2/coop/${coopQuest.slug}`,
  }));

  const ridingActionItems = sortedRidingActions.map((ridingAction) => ({
    label: ridingAction.name,
    suffix: getRidingActionSuffix(ridingAction),
    icon: 'ph:exclamation-mark-bold',
    to: `/2/riding-actions/${ridingAction.slug}`,
  }));

  return {
    groups: [
      {
        id: 'monsters',
        slot: 'monsters',
        label: 'Monsters',
        items: monsterItems,
      },
      {
        id: 'catavanStands',
        label: 'Catavan Stands',
        items: catavanStandItems,
      },
      {
        id: 'coopQuests',
        label: 'Co-Op Quests',
        items: coopQuestItems,
      },
      {
        id: 'ridingActions',
        label: 'Riding Actions',
        items: ridingActionItems,
      },
      buildSearchPagesGroup([
        buildSearchHomePageItem(appTitle),
        buildSearchGameRootItem('mhst2'),
        {
          label: 'Monsters',
          to: '/2/monsters',
          icon: 'ph:file-text',
        },
        {
          label: 'Monsties',
          to: '/2/monsties',
          icon: 'ph:file-text',
        },
        {
          label: 'Eggs',
          to: '/2/eggs',
          icon: 'ph:file-text',
        },
        {
          label: 'Catavan Stands',
          to: '/2/catavan-stands',
          icon: 'ph:file-text',
        },
        {
          label: "Elder's Lair",
          to: '/2/elders-lair',
          icon: 'ph:file-text',
        },
        {
          label: 'Co-Op Quests',
          to: '/2/coop',
          icon: 'ph:file-text',
        },
        {
          label: 'Riding Actions',
          to: '/2/riding-actions',
          icon: 'ph:file-text',
        },
        buildSearchGameRootItem('mhst1'),
        buildSearchGameRootItem('mhst3'),
      ]),
    ],
    monsterIconComponent: markRaw(S2MonsterIcon),
    geneIconComponent: null,
  };
}
