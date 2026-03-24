import { makeMonsterFilterStore, type Mode, type Modes } from './baseMonsterFilter';
import { monsties } from '~/services/3/data';

const initial = {
  sortKey: 'name', // TODO habitat?
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
