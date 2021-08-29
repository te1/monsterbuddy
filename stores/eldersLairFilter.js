import _ from 'lodash';
import { makeMonsterFilterStore } from './base';
import { monsters } from '~/services/data';

const initial = {
  sortKey: 'eldersLair',
  sortOrder: 'asc',
};

const extend = {
  state: {
    mode: 'combat',
    autoSwitchModes: ['location', 'combat'],
  },
};

let filteredMonsters = _.filter(monsters, (monster) => {
  return _.some(monster.locations, { type: 'eldersLair' });
});

const useEldersLairFilter = makeMonsterFilterStore(
  'eldersLairFilter',
  filteredMonsters,
  initial,
  extend
);

export default useEldersLairFilter;
