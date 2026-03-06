import { makeMonsterFilterStore, type Mode } from './baseMonsterFilter';
import { monsties } from '~/services/2/data';

const initial = {
  sortKey: 'no',
  sortOrder: 'asc',
  mode: 'location',
  autoSwitchModes: [
    'location',
    'location-coop',
    'location-eldersLair',
    'ridingActions',
    'retreat',
    'rarity',
    'stats',
  ] as Mode[],
} as const;

const useMonstieFilter = makeMonsterFilterStore('s2/monstieFilter', monsties, initial);

export default useMonstieFilter;
