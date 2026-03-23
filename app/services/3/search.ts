import { markRaw } from 'vue';
import type { Monster } from './types';
import { buildSearchGameRootItem, buildSearchHomePageItem, buildSearchPagesGroup } from '../search';
import S3MonsterIcon from '~/components/s3/monster/S3MonsterIcon.vue';
import { monsters } from './data';
import { formatMonsterTag } from './presentation';

function getMonsterSuffix(monster: Monster) {
  const result: string[] = [];

  result.push(...monster.tags.map(formatMonsterTag).filter(Boolean));

  if (monster.hatchable) {
    result.push('Hatchable');
    result.push('Monstie');
  }

  result.push('Monster');

  return result.join(' ');
}

export function buildMhst3Search(appTitle: string) {
  const monsterItems = monsters.map((monster) => ({
    label: monster.name,
    suffix: getMonsterSuffix(monster),
    to: `/3/monsters/${monster.slug}`,
    data: monster,
  }));

  return {
    groups: [
      {
        id: 'monsters',
        slot: 'monsters',
        label: 'Monsters',
        items: monsterItems,
      },
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
          label: 'Areas & Habitat Restoration',
          to: '/3/areas',
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
  };
}
