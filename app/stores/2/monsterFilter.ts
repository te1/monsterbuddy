import { makeMonsterFilterStore } from './base';
import { monsters } from '~/services/2/data';

const initial = {
  sortKey: 'no',
  sortOrder: 'asc',
} as const;

const extended = {
  mode: 'location',
  autoSwitchModes: ['location', 'location-eldersLair', 'combat', 'rarity'],
} as const;

const useMonsterFilter = makeMonsterFilterStore('s2/monsterFilter', monsters, initial, extended);

export default useMonsterFilter;
