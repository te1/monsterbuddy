import type { EggPower, EggPowerRequirement, Gene, Monster, Region } from './types';
import type { MonstieBuildEntity } from './localDb';
import { orderBy, uniqBy } from 'es-toolkit/array';
import { eggPowersBySlug, monstersBySlug, regionsBySlug } from './data';
import { genesBySlug, getGeneSizeAsNumber } from './genes';

export class MonstieBuild {
  id: string;
  name: string | null = null;
  description: string | null = null;
  monstieSlug: string | null = null;
  geneSlugs: (string | null)[] = [];
  eggPowerSlugs: (string | null)[] = [null, null, null];
  dualElement: ElementType | null = null;
  /** for stat increases */
  regionSlug: string | null = null;

  constructor(id: string) {
    this.id = id;
  }

  static fromPlaceholder(id: string): MonstieBuild {
    const build = new MonstieBuild(id);
    build.name = 'Build 2';
    build.description = 'This is a placeholder build';
    build.monstieSlug = 'grimclaw-tigrex';
    build.geneSlugs = [
      'quick-xl',
      'antiburn-l',
      'stamina-surge-xl',
      'vigilance-xl',
      'fruit-frenzy-plus',
      'antiburn-s',
      'stamina-boost-xl',
      'dragon-buster-xl',
      'critical-xl',
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

  get monstie(): Monster | null | undefined {
    if (this.monstieSlug === null) {
      return null;
    }

    return monstersBySlug.get(this.monstieSlug);
  }

  get genes(): (Gene | undefined)[] {
    return this.geneSlugs.map((slug) => (slug ? genesBySlug.get(slug) : undefined));
  }

  get sortedGenes(): Gene[] {
    return orderBy(
      this.genes.filter((gene) => gene != null),
      [
        (gene) => {
          if (gene.baseName) {
            return `${gene.baseName} ${getGeneSizeAsNumber(gene.size)}`;
          }
          return gene.name;
        },
      ],
      ['asc']
    );
  }

  get uniqueGenes(): Gene[] {
    // reverse to keep the largest size
    // reverse again to restore alphabetical order
    return uniqBy(this.sortedGenes.toReversed(), (gene) => gene.baseName ?? gene.name).toReversed();
  }

  get eggPowers(): (EggPower | null | undefined)[] {
    return this.eggPowerSlugs.map((slug) => {
      if (slug === null) {
        return null;
      }

      return eggPowersBySlug.get(slug);
    });
  }

  get region(): Region | null | undefined {
    if (this.regionSlug === null) {
      return null;
    }

    return regionsBySlug.get(this.regionSlug);
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
      (this.eggPowerSlugs.length === 0 || this.eggPowerSlugs.every((slug) => slug == null)) &&
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
