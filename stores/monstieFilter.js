import { makeMonsterFilterStore } from './base';
import { monsties } from '~/services/data';

const initial = {
  sortKey: 'no',
  sortOrder: 'asc',
};

const extend = {
  state: {
    mode: 'location',
  },
};

const useMonstieFilter = makeMonsterFilterStore(
  'monstieFilter',
  monsties,
  initial,
  extend
);

export default useMonstieFilter;
