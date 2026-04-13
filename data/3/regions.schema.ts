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

export const EggPowerRankSchema = z.enum(['S', 'A', 'B']);
export type EggPowerRank = z.infer<typeof EggPowerRankSchema>;

const StatsTypeSchema = z.enum(['hp', 'attack', 'speed', 'defense', 'crit', 'recovery', 'stamina']);
export type StatsType = z.infer<typeof StatsTypeSchema>;

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
    eggPowers: z.array(
      z.object({
        rank: EggPowerRankSchema,
        name: z.string(),
      })
    ),
    stats: z.array(StatsTypeSchema),
  }),
  areas: z.array(RegionAreaSchema),
});
export type Region = z.infer<typeof RegionSchema>;
