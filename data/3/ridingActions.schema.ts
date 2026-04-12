import { z } from 'zod';

export const RidingActionTypeSchema = z.enum([
  //
  'utility',
  'explore',
  'combat',
]);
export type RidingActionType = z.infer<typeof RidingActionTypeSchema>;

export const RidingActionSchema = z.object({
  name: z.string(),
  description: z.string().optional(), // TODO remove optional after all data is gathered
  type: RidingActionTypeSchema,
  slug: z.string(),
});
export type RidingAction = z.infer<typeof RidingActionSchema>;
