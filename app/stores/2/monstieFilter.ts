import { makeMonsterFilterStore, type Mode, type Modes } from './baseMonsterFilter';
import { monsties } from '~/services/2/data';

const initial = {
  sortKey: 'no',
  sortOrder: 'asc',
  mode: 'location',
  autoSwitchModes: [
    'location',
    'location-coop',
    'location-eldersLair',
    'ridingActions',
    'retreat',
    'rarity',
    'stats',
  ] as Mode[],
} as const;

const useMonstieFilter = makeMonsterFilterStore('s2/monstieFilter', monsties, initial);

export default useMonstieFilter;

export const modes: Modes = [
  { value: 'location', label: 'Location' },
  { value: 'location-coop', label: 'Co-Op Quest' },
  { value: 'location-eldersLair', label: "Elder's Lair" },
  { value: 'ridingActions', label: 'Riding Actions' },
  { value: 'retreat', label: 'Retreat' },
  { value: 'rarity', label: 'Rarity' },
  { value: 'stats', label: 'Stats' },
];
