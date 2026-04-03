import { markRaw } from 'vue';
import type { Gene, Monster, RidingAction } from './types';
import { buildSearchGameRootItem, buildSearchHomePageItem, buildSearchPagesGroup } from '../search';
import S3MonsterIcon from '~/components/s3/monster/S3MonsterIcon.vue';
import S3GeneIcon from '~/components/s3/gene/S3GeneIcon.vue';
import { monsters, sortedRidingActions } from './data';
import { genes } from './genes';
import { formatMonsterTag, formatRidingActionType } from './presentation';

function getMonsterSuffix(monster: Monster) {
  const result: string[] = [];

  result.push(...monster.tags.map(formatMonsterTag).filter((tag) => tag != null));

  if (monster.hatchable) {
    result.push('Hatchable');
    result.push('Monstie');
  }

  result.push('Monster');

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

function getGeneSuffix(gene: Gene) {
  const result: string[] = [];

  if (gene.active) {
    result.push('Active');
  } else {
    result.push('Passive');
  }

  result.push('Gene');

  return result.join(' ');
}

export function buildMhst3SearchMonsterGroup() {
  const monsterItems = monsters.map((monster) => ({
    label: monster.name,
    suffix: getMonsterSuffix(monster),
    to: `/3/monsters/${monster.slug}`,
    data: monster,
  }));

  return {
    id: 'monsters',
    slot: 'monsters',
    label: 'Monsters',
    items: monsterItems,
  };
}

export function buildMhst3SearchGeneGroup() {
  const geneItems = genes.map((gene) => ({
    label: gene.name,
    suffix: getGeneSuffix(gene),
    to: `/3/genes/${gene.slug}`,
    data: gene,
  }));

  return {
    id: 'genes',
    slot: 'genes',
    label: 'Genes',
    items: geneItems,
  };
}

export function buildMhst3Search(appTitle: string) {
  const ridingActionItems = sortedRidingActions.map((ridingAction) => ({
    label: ridingAction.name,
    suffix: getRidingActionSuffix(ridingAction),
    icon: 'ph:exclamation-mark-bold',
    to: `/3/riding-actions/${ridingAction.slug}`,
  }));

  return {
    groups: [
      buildMhst3SearchMonsterGroup(),
      {
        id: 'ridingActions',
        label: 'Riding Actions',
        items: ridingActionItems,
      },
      buildMhst3SearchGeneGroup(),
      buildSearchPagesGroup([
        buildSearchHomePageItem(appTitle),
        buildSearchGameRootItem('mhst3'),
        {
          label: 'Monsters',
          to: '/3/monsters',
          icon: 'ph:file-text',
        },
        {
          label: 'Monsties',
          to: '/3/monsties',
          icon: 'ph:file-text',
        },
        {
          label: 'Eggs',
          to: '/3/eggs',
          icon: 'ph:file-text',
        },
        {
          label: 'Habitat Restoration - Regions & Areas',
          to: '/3/habitats',
          icon: 'ph:file-text',
        },
        {
          label: 'Riding Actions',
          to: '/3/riding-actions',
          icon: 'ph:file-text',
        },
        buildSearchGameRootItem('mhst1'),
        buildSearchGameRootItem('mhst2'),
      ]),
    ],
    monsterIconComponent: markRaw(S3MonsterIcon),
    geneIconComponent: markRaw(S3GeneIcon),
  };
}
