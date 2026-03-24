import { makeMonsterFilterStore, type Mode, type Modes } from './baseMonsterFilter';
import { monsties } from '~/services/3/data';

const initial = {
  sortKey: 'name',
  sortOrder: 'asc',
  mode: 'location',
  autoSwitchModes: ['location', 'ridingActions', 'rank', 'stats'] as Mode[],
} as const;

const useMonstieFilter = makeMonsterFilterStore('s3/monstieFilter', monsties, initial);

export default useMonstieFilter;

export const modes: Modes = [
  { value: 'location', label: 'Location' },
  { value: 'ridingActions', label: 'Riding Actions' },
  { value: 'rank', label: 'Rank' },
  { value: 'stats', label: 'Stats' },
];
