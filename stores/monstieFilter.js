import { makeMonsterFilterStore } from './base';
import { monsties } from '~/services/data';

const initial = {
  sortKey: 'no',
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
