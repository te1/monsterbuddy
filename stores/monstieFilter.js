import { makeMonsterFilterStore } from './base';
import { monsties } from '~/services/data';

const initial = {
  sortKey: 'no',
  sortOrder: 'asc',
};

const extend = {
  state: {
    mode: 'location',
    allowedModes: [
      'location',
      'location-coop',
      'location-eldersLair',
      'ridingActions',
      'retreat',
      'rarity',
      'stats',
    ],
  },
};

const useMonstieFilter = makeMonsterFilterStore(
  'monstieFilter',
  monsties,
  initial,
  extend
);

export default useMonstieFilter;
