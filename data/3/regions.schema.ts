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

const RegionAreaSchema = z.object({
  name: z.string(),
  element: ElementTypeSchema,
  permanent: z.array(z.string()),
  feral: z.string(),
  invasive: z.string(),
  endangered: z.string(),
});
export type RegionArea = z.infer<typeof RegionAreaSchema>;

export const RegionSchema = z.object({
  name: z.string(),
  slug: z.string(),
  monsters: RegionMonstersSchema,
  powers: z.object({
    skills: z.record(z.string(), z.string()),
    stats: z.record(z.string(), z.number()),
  }),
  areas: z.array(RegionAreaSchema),
});
export type Region = z.infer<typeof RegionSchema>;
