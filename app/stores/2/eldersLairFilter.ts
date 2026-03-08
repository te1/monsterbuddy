import { makeMonsterFilterStore, type Mode, type Modes } from './baseMonsterFilter';
import { monsters } from '~/services/2/data';

const initial = {
  sortKey: 'eldersLair',
  sortOrder: 'asc',
  mode: 'combat',
  autoSwitchModes: ['location', 'combat'] as Mode[],
} as const;

const filteredMonsters = monsters.filter((monster) => {
  return monster.locations.some((location) => location.type === 'eldersLair');
});

const useEldersLairFilter = makeMonsterFilterStore(
  's2/eldersLairFilter',
  filteredMonsters,
  initial
);

export default useEldersLairFilter;

export const modes: Modes = [
  { value: 'location', label: 'Location' },
  { value: 'combat', label: 'Attack Pattern' },
];
