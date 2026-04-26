import type { EggPower, EggPowerRequirement, Gene, Monster, Region } from './types';
import type { MonstieBuildEntity } from './localDb';
import { eggPowersBySlug, monstersBySlug, regionsBySlug } from './data';
import { genesBySlug } from './genes';

export class MonstieBuild {
  id: string;
  name: string | null = null;
  description: string | null = null;
  monstieSlug: string | null = null;
  geneSlugs: string[] = [];
  eggPowerSlugs: string[] = [];
  dualElement: ElementType | null = null;
  /** for stat increases */
  regionSlug: string | null = null;

  constructor(id: string) {
    this.id = id;
  }

  static fromPlaceholder(id: string): MonstieBuild {
    const build = new MonstieBuild(id);
    build.name = 'Build 1';
    build.description = 'This is a placeholder build';
    build.monstieSlug = 'silverwind-nargacuga';
    build.geneSlugs = [
      'antiburn-s',
      'antiburn-s',
      'antiburn-s',
      'antiburn-s',
      'antiburn-s',
      'antiburn-s',
      'antiburn-s',
      'antiburn-s',
      'antiburn-s',
    ];
    build.eggPowerSlugs = ['resonance', 'best-buds', 'hardiness'];
    build.dualElement = 'fire';
    build.regionSlug = 'azuria';

    return build;
  }

  static fromEntity(entity: MonstieBuildEntity): MonstieBuild {
    const build = new MonstieBuild(entity.data.id);

    build.name = entity.data.name;
    build.description = entity.data.description;
    build.monstieSlug = entity.data.monstieSlug;
    build.geneSlugs = Array.from(entity.data.geneSlugs);
    build.eggPowerSlugs = Array.from(entity.data.eggPowerSlugs);
    build.dualElement = entity.data.dualElement;
    build.regionSlug = entity.data.regionSlug;

    return build;
  }

  get nameWithFallback(): string {
    if (this.name) {
      return this.name;
    }

    if (this.monstie) {
      return `${this.monstie.name} Build`;
    }

    return 'New Build';
  }

  get monstie(): Monster | undefined {
    return this.monstieSlug ? monstersBySlug.get(this.monstieSlug) : undefined;
  }

  get genes(): (Gene | undefined)[] {
    return this.geneSlugs.map((slug) => genesBySlug.get(slug));
  }

  get eggPowers(): (EggPower | undefined)[] {
    return this.eggPowerSlugs.map((slug) => eggPowersBySlug.get(slug));
  }

  get region(): Region | undefined {
    return this.regionSlug ? regionsBySlug.get(this.regionSlug) : undefined;
  }

  isEggPowerAwakened(eggPower: EggPower): boolean {
    let result = true;

    for (const requirement of eggPower.variants[1]?.requirements ?? []) {
      if ('type' in requirement) {
        if (this.genes.every((gene) => gene?.type !== requirement.type)) {
          result = false;
        }
      }

      if ('element' in requirement) {
        if (this.genes.every((gene) => gene?.element !== requirement.element)) {
          result = false;
        }
      }
    }

    return result;
  }

  hasRequirement(requirement: EggPowerRequirement): boolean {
    if ('type' in requirement) {
      return this.genes.some((gene) => gene?.type === requirement.type);
    }

    if ('element' in requirement) {
      return this.genes.some((gene) => gene?.element === requirement.element);
    }

    return false;
  }

  isEmpty(): boolean {
    return (
      this.name == null &&
      this.description == null &&
      this.monstieSlug == null &&
      this.geneSlugs.length === 0 &&
      this.eggPowerSlugs.length === 0 &&
      this.dualElement == null &&
      this.regionSlug == null
    );
  }

  toStableJson({ ignoreId = false } = {}): string {
    const stable = sortKeys({ ...this });

    if (ignoreId) {
      delete stable.id;
    }

    return JSON.stringify(stable);
  }

  async getContentHash({ ignoreId = false } = {}): Promise<string> {
    const json = this.toStableJson({ ignoreId });

    return await hash(json);
  }
}

/*
export const MonstieBuildSchema = z.object({
  id: z.nanoid(),
  name: z.string().nullable(),
  description: z.string().nullable(),
  monstieSlug: z.string().nullable(),
  geneSlugs: z.array(z.string()),
  eggPowerSlugs: z.array(z.string()),
  dualElement: ElementTypeSchema.nullable(),
  regionSlug: z.string().nullable(),
});
*/
