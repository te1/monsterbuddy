import type { Mode, Modes } from './baseMonsterFilter';
import { makeMonsterFilterStore } from './baseMonsterFilter';
import { monsters } from '~/services/3/data';

const initial = {
  sortKey: 'name',
  sortOrder: 'asc',
  mode: 'location',
  autoSwitchModes: ['location', 'combat', 'rank'] as Mode[],
} as const;

const useMonsterFilter = makeMonsterFilterStore('s3/monsterFilter', monsters, initial);

export default useMonsterFilter;

export const modes: Modes = [
  { value: 'location', label: 'Location' },
  { value: 'combat', label: 'Attack Pattern' },
  { value: 'rank', label: 'Rank' },
];
