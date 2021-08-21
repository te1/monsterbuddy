import { makeMonsterFilterStore } from './base';
import { monsters } from '~/services/data';

const initial = {
  sortKey: 'no',
  sortOrder: 'asc',
};

const extend = {
  state: {
    mode: 'location',
  },
};

const useMonsterFilter = makeMonsterFilterStore(
  'monsterFilter',
  monsters,
  initial,
  extend
);

export default useMonsterFilter;
