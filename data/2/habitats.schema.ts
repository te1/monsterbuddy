import { z } from 'zod';

export const HabitatSchema = z.object({
  name: z.string(),
  sortOrder: z.number(),
});
export type Habitat = z.infer<typeof HabitatSchema>;
