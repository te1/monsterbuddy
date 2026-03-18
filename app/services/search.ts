import type { Component } from 'vue';
import type { GameType } from '~/utils/types';

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
  };
}

export function buildDefaultSearch(appTitle: string) {
  return buildSearchPageConfig([
    buildSearchHomePageItem(appTitle),
    buildSearchGameRootItem('mhst1'),
    buildSearchGameRootItem('mhst2'),
    buildSearchGameRootItem('mhst3'),
  ]);
}
