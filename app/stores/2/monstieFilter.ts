import { makeMonsterFilterStore } from './base';
import { monsties } from '~/services/2/data';

const initial = {
  sortKey: 'no',
  sortOrder: 'asc',
} as const;

const extended = {
  mode: 'location',
  autoSwitchModes: [
    'location',
    'location-coop',
    'location-eldersLair',
    'ridingActions',
    'retreat',
    'rarity',
    'stats',
  ],
} as const;

const useMonstieFilter = makeMonsterFilterStore('s2/monstieFilter', monsties, initial, extended);

export default useMonstieFilter;
