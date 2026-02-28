import { z } from 'zod';

export const CatavanStandSchema = z.object({
  name: z.string(),
  zone: z.string(),
  sortOrder: z.number(),
  slug: z.string(),
});
export type CatavanStand = z.infer<typeof CatavanStandSchema>;
