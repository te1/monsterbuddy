import { makeMonsterFilterStore, type Mode, type Modes } from './baseMonsterFilter';
import { monsters } from '~/services/2/data';

const initial = {
  sortKey: 'no',
  sortOrder: 'asc',
  mode: 'location',
  autoSwitchModes: ['location', 'location-eldersLair', 'combat', 'rarity'] as Mode[],
} as const;

const useMonsterFilter = makeMonsterFilterStore('s2/monsterFilter', monsters, initial);

export default useMonsterFilter;

export const modes: Modes = [
  { value: 'location', label: 'Location' },
  { value: 'location-eldersLair', label: "Elder's Lair" },
  { value: 'combat', label: 'Attack Pattern' },
  { value: 'rarity', label: 'Rarity' },
];
