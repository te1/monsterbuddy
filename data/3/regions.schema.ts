import { z } from 'zod';
import { ElementTypeSchema } from '~~/data/shared.schema';

const RegionMonstersSchema = z.object({
  large: z.array(z.string()),
  small: z.array(z.string()),
  feral: z.array(z.string()),
  invasive: z.array(z.string()),
  endangered: z.array(z.string()),
  calamitous: z.array(z.string()),
});
export type RegionMonsters = z.infer<typeof RegionMonstersSchema>;

const StatsTypeSchema = z.enum(['hp', 'attack', 'speed', 'defense', 'crit', 'recovery', 'stamina']);
export type StatsType = z.infer<typeof StatsTypeSchema>;

const RegionAreaSchema = z.object({
  name: z.string(),
  element: ElementTypeSchema,
  permanent: z.array(z.string()),
  feral: z.string(),
  invasive: z.string().optional(),
  endangered: z.string().optional(),
});
export type RegionArea = z.infer<typeof RegionAreaSchema>;

export const RegionSchema = z.object({
  name: z.string(),
  slug: z.string(),
  monsters: RegionMonstersSchema,
  powers: z.object({
    skills: z.record(z.string(), z.string()),
    stats: z.array(StatsTypeSchema),
  }),
  areas: z.array(RegionAreaSchema),
});
export type Region = z.infer<typeof RegionSchema>;
