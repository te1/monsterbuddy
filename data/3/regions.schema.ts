import { z } from 'zod';
import { ElementTypeSchema } from '~~/data/shared.schema';

export const RegionNameSchema = z.enum([
  //
  'Azuria',
  'Canalta Timberland',
  'Tarkuan',
  'Serathis',
]);
export type RegionName = z.infer<typeof RegionNameSchema>;

const RegionMonstersSchema = z.object({
  permanent: z.array(z.string()),
  world: z.array(z.string()),
  feral: z.array(z.string()),
  invasive: z.array(z.string()),
  endangered: z.array(z.string()),
  calamitous: z.array(z.string()),
});
export type RegionMonsters = z.infer<typeof RegionMonstersSchema>;

const RegionStatsTypeSchema = z.enum(['hp', 'attack', 'defense', 'recovery']);
export type RegionStatsType = z.infer<typeof RegionStatsTypeSchema>;

const RegionAreaSchema = z.object({
  name: z.string(),
  slug: z.string(),
  element: ElementTypeSchema,
  permanent: z.array(z.string()),
  feral: z.array(z.string()),
  invasive: z.array(z.string()),
  endangered: z.array(z.string()),
  calamitous: z.array(z.string()),
});
export type RegionArea = z.infer<typeof RegionAreaSchema>;

export const RegionSchema = z.object({
  name: RegionNameSchema,
  slug: z.string(),
  monsters: RegionMonstersSchema,
  powers: z.object({
    eggPowers: z.array(z.string()),
    stats: z.array(RegionStatsTypeSchema),
  }),
  areas: z.array(RegionAreaSchema),
});
export type Region = z.infer<typeof RegionSchema>;
