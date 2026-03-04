import { makeMonsterFilterStore, type Mode } from './base';
import { monsties } from '~/services/2/data';

const initial = {
  sortKey: 'habitat',
  sortOrder: 'asc',
  mode: 'compact',
  autoSwitchModes: ['location', 'location-coop', 'ridingActions', 'retreat', 'rarity'] as Mode[],
} as const;

const useEggFilter = makeMonsterFilterStore('s2/eggFilter', monsties, initial);

export default useEggFilter;
