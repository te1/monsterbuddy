import { makeMonsterFilterStore } from './base';
import { monsties } from '~/services/2/data';

const initial = {
  sortKey: 'habitat',
  sortOrder: 'asc',
} as const;

const extended = {
  mode: 'compact',
  autoSwitchModes: ['location', 'location-coop', 'ridingActions', 'retreat', 'rarity'],
} as const;

const useEggFilter = makeMonsterFilterStore('s2/eggFilter', monsties, initial, extended);

export default useEggFilter;
