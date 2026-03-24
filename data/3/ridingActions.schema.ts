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
  type: RidingActionTypeSchema,
  slug: z.string(),
});
export type RidingAction = z.infer<typeof RidingActionSchema>;
