import { z } from 'zod';

export const AttackTypeSchema = z.enum([
  //
  'power',
  'speed',
  'technical',
]);
export type AttackType = z.infer<typeof AttackTypeSchema>;

export const ElementTypeSchema = z.enum([
  //
  'none',
  'fire',
  'water',
  'thunder',
  'ice',
  'dragon',
]);
export type ElementType = z.infer<typeof ElementTypeSchema>;

export const WeaponTypeSchema = z.enum([
  //
  'slash',
  'pierce',
  'blunt',
]);
export type WeaponType = z.infer<typeof WeaponTypeSchema>;

export const GenusTypeSchema = z.enum([
  'Amphibian',
  'Bird Wyvern',
  'Brute Wyvern',
  'Carapaceon',
  'Elder Dragon',
  'Fanged Beast',
  'Fanged Wyvern',
  'Flying Wyvern',
  'Herbivore',
  'Leviathan',
  'Lynian',
  'Neopteron',
  'Piscine Wyvern',
  'Snake Wyvern',
  'Temnoceran',
  '???',
]);
export type GenusType = z.infer<typeof GenusTypeSchema>;
