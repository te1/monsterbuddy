import { z } from 'zod';
import { AttackTypeSchema, ElementTypeSchema } from '~~/data/shared.schema';

export const GeneTypeSchema = z.union([AttackTypeSchema, z.literal('all')]).nullable();
export type GeneType = z.infer<typeof GeneTypeSchema>;

export const GeneElementSchema = z.union([ElementTypeSchema, z.literal('all')]);
export type GeneElement = z.infer<typeof GeneElementSchema>;

export const GeneSchema = z.object({
  name: z.string(),
  slug: z.string(),
  type: GeneTypeSchema,
  element: GeneElementSchema,
  active: z.boolean(),
  stamina: z.number().nullable(),
  power: z.number().nullable(),
  wyvernfell: z.number().nullable(),
  description: z.string(),
  sizes: z.array(z.string()),
});
export type Gene = z.infer<typeof GeneSchema>;
