import { makeMonsterFilterStore, type Mode } from './base';
import { monsters } from '~/services/2/data';

const initial = {
  sortKey: 'no',
  sortOrder: 'asc',
  mode: 'location',
  autoSwitchModes: ['location', 'location-eldersLair', 'combat', 'rarity'] as Mode[],
} as const;

const useMonsterFilter = makeMonsterFilterStore('s2/monsterFilter', monsters, initial);

export default useMonsterFilter;
