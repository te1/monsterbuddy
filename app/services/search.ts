import type { GameType } from '~/utils/types';
import { buildMhst3SearchMonsterGroup } from './3/search';
import S3MonsterIcon from '~/components/s3/monster/S3MonsterIcon.vue';

export type SearchItem = {
  label: string;
  to: string;
  icon?: string;
  suffix?: string;
  data?: unknown;
};

export type SearchGroup = {
  id: string;
  label: string;
  slot?: string;
  items: SearchItem[];
};

export type SearchConfig = {
  groups: SearchGroup[];
  monsterIconComponent: Component | null;
  geneIconComponent: Component | null;
};

export function buildSearchHomePageItem(appTitle: string) {
  return {
    label: appTitle,
    to: '/',
    icon: 'ph:file-text',
  };
}

export function buildSearchGameRootItem(gameType: GameType) {
  return {
    label: gameTypeToFullName(gameType),
    suffix: `${gameTypeToShortLabel(gameType)} ${gameTypeToDescription(gameType)} ${gameTypeToFullLabel(gameType)}`,
    to: `/${gameType.slice(-1)}`,
    icon: 'ph:file-text',
  };
}

export function buildSearchPagesGroup(items: SearchItem[]) {
  return {
    id: 'pages',
    label: 'Pages',
    items,
  };
}

export function buildSearchPageConfig(items: SearchItem[]) {
  return {
    groups: [buildSearchPagesGroup(items)],
    monsterIconComponent: null,
    geneIconComponent: null,
  };
}

export function buildDefaultSearch(appTitle: string) {
  return {
    groups: [
      buildSearchPagesGroup([
        buildSearchHomePageItem(appTitle),
        buildSearchGameRootItem('mhst1'),
        buildSearchGameRootItem('mhst2'),
        buildSearchGameRootItem('mhst3'),
      ]),
      buildMhst3SearchMonsterGroup(),
    ],
    monsterIconComponent: markRaw(S3MonsterIcon),
    geneIconComponent: null,
  };
}
