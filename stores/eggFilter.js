import { makeMonsterFilterStore } from './base';
import { monsties } from '~/services/data';

const initial = {
  sortKey: 'habitat',
  sortOrder: 'asc',
};

const extend = {
  state: {
    mode: 'compact',
    autoSwitchModes: [
      'location',
      'location-coop',
      'ridingActions',
      'retreat',
      'rarity',
    ],
  },
};

const useEggFilter = makeMonsterFilterStore(
  'eggFilter',
  monsties,
  initial,
  extend
);

export default useEggFilter;
