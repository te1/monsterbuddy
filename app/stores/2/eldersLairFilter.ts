import { makeMonsterFilterStore } from './base';
import { monsters } from '~/services/2/data';

const initial = {
  sortKey: 'eldersLair',
  sortOrder: 'asc',
} as const;

const extended = {
  mode: 'combat',
  autoSwitchModes: ['location', 'combat'],
} as const;

const filteredMonsters = monsters.filter((monster) => {
  return monster.locations.some((location) => location.type === 'eldersLair');
});

const useEldersLairFilter = makeMonsterFilterStore(
  's2/eldersLairFilter',
  filteredMonsters,
  initial,
  extended
);

export default useEldersLairFilter;
