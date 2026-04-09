import { z } from 'zod';

// export const EggSkillPresetsSchema = z.record(EggSkillPresetIdSchema, z.array(GeneNameSchema));
// export type EggSkillPresets = z.infer<typeof EggSkillPresetsSchema>;

export const GeneGroupsSchema = z.record(z.string(), z.array(z.string()));
export type GeneGroups = z.infer<typeof GeneGroupsSchema>;

export const GeneSetsSchema = z.record(z.string(), z.array(z.string()));
export type GeneSets = z.infer<typeof GeneSetsSchema>;

export const GeneSourcesSchema = z.object({
  // eggSkillPresets: EggSkillPresetsSchema,
  geneGroups: GeneGroupsSchema,
  geneSets: GeneSetsSchema,
});
export type GeneSources = z.infer<typeof GeneSourcesSchema>;
