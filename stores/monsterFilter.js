import { makeMonsterFilterStore } from './base';
import { monsters } from '~/services/data';

const initial = {
  sortKey: 'no',
  sortOrder: 'asc',
};

const extend = {
  state: {
    mode: 'location',
    allowedModes: ['location', 'location-eldersLair', 'combat', 'rarity'],
  },
};

const useMonsterFilter = makeMonsterFilterStore(
  'monsterFilter',
  monsters,
  initial,
  extend
);

export default useMonsterFilter;
