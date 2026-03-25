import type { Mode, Modes } from './baseMonsterFilter';
import { makeMonsterFilterStore } from './baseMonsterFilter';
import { monsties } from '~/services/3/data';

const initial = {
  sortKey: 'rank',
  sortOrder: 'asc',
  mode: 'compact',
  autoSwitchModes: ['location', 'ridingActions', 'rank'] as Mode[],
} as const;

const useEggFilter = makeMonsterFilterStore('s3/eggFilter', monsties, initial);

export default useEggFilter;

export const modes: Modes = [
  { value: 'compact', label: 'Compact' },
  { value: 'location', label: 'Location' },
  { value: 'ridingActions', label: 'Riding Actions' },
  { value: 'rank', label: 'Rank' },
];
