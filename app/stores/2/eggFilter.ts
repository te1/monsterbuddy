import type { Mode, Modes } from './baseMonsterFilter';
import { makeMonsterFilterStore } from './baseMonsterFilter';
import { monsties } from '~/services/2/data';

const initial = {
  sortKey: 'habitat',
  sortOrder: 'asc',
  mode: 'compact',
  autoSwitchModes: ['location', 'location-coop', 'ridingActions', 'retreat', 'rarity'] as Mode[],
} as const;

const useEggFilter = makeMonsterFilterStore('s2/eggFilter', monsties, initial);

export default useEggFilter;

export const modes: Modes = [
  { value: 'compact', label: 'Compact' },
  { value: 'location', label: 'Location' },
  { value: 'location-coop', label: 'Co-Op Quest' },
  { value: 'ridingActions', label: 'Riding Actions' },
  { value: 'retreat', label: 'Retreat' },
  { value: 'rarity', label: 'Rarity' },
];
