import { uniq } from 'es-toolkit/array';
import { monsters } from './data';
import type {
  Gene,
  GeneElement,
  GeneSize,
  GeneType,
  Monster,
  SkillAilmentType,
  SkillBuffType,
  SkillDebuffType,
  SkillEffectType,
  SkillTarget,
  GeneSources,
} from './types';
import genes_ from '~/assets/3/genes.json';
import geneSources_ from '~/assets/3/geneSources.json';

const genes = genes_ as unknown as Gene[];
const geneSources = geneSources_ as unknown as GeneSources;

export { genes, geneSources };
export const genesByName = keyBy(genes, 'name');
export const genesBySlug = keyBy(genes, 'slug');
export const allElements: readonly GeneElement[] = [
  'none',
  'fire',
  'water',
  'thunder',
  'ice',
  'dragon',
  'all',
];
export const allTypes: readonly GeneType[] = [null, 'power', 'speed', 'technical', 'all'];
export const allSizes: readonly GeneSize[] = ['none', 'S', 'M', 'L', 'XL', '-', '+'];
export const allTargets: readonly SkillTarget[] = [
  'singleEnemy',
  'allEnemies',
  'randomEnemy',
  'allAllies',
  'user',
];
export const allAilments: readonly SkillAilmentType[] = [
  'poison',
  'noxiousPoison',
  'severePoison',
  'burn',
  'paralysis',
  'sleep',
  'blastblight',
  'bleeding',
  'darkness',
];
export const allBuffs: readonly SkillBuffType[] = [
  'Attack Up',
  'Non-Elemental Attack Up',
  'Fire Attack Up',
  'Water Attack Up',
  'Thunder Attack Up',
  'Ice Attack Up',
  'Dragon Attack Up',
  'Power Charge',
  'Speed Up',
  'Critical Up',
  'Wyvernfell Up',
  'Ailment Inflict Rate Up',
  'Defense Up',
  'Fire Defense Up',
  'Dodge Up',
  'Guard',
  'Regenerate',
  'Stamina Regen Up',
  'Burn Effect',
  'Blast Effect',
  'Paralysis Effect',
];
export const allDebuffs: readonly SkillDebuffType[] = [
  'Defense Down',
  'Thunder Defense Down',
  'Dragon Defense Down',
  'Wyvernsoul Defense Down',
  'Dodge Down',
  'Evasion Down',
  'Attack Down',
  'Accuracy Down',
  'Speed Down',
];
export const allEffects: readonly SkillEffectType[] = [
  'priority',
  'crit',
  'spam',
  'leech',
  'stun',
  'chaser',
  'nextTurn',
  'explodeBlastblight',
  '1HitKo',
  'recoil',
  'lowAccuracy',
  'evade',
  'procBlastblight',
  'procBurn',
  'procParalysis',
];

export function getGenesByName(name: string, geneList: Gene[] = genes): Gene[] {
  const query = name.toLowerCase();

  return geneList.filter((gene) => gene.name.toLowerCase().includes(query));
}

export function getGeneSizeAsNumber(size: GeneSize): number {
  switch (size) {
    case 'none':
      return 0;

    case 'S':
      return 1;

    case 'M':
      return 2;

    case 'L':
      return 3;

    case 'XL':
      return 4;

    case '-':
      return 5;

    case '+':
      return 6;
  }
}

export function getGenesBySize(size: GeneSize | null, geneList: Gene[] = genes): Gene[] {
  if (size != null) {
    return geneList.filter((gene) => gene.size === size);
  }

  // return only largest size for genes of the same base name

  const geneListByName = keyBy(geneList, 'name');

  return geneList.filter((gene) => {
    // there are no other sizes -> return this one
    if (gene.size === 'none' || gene.sizes == null || gene.sizes.length === 0) {
      return true;
    }

    const size = getGeneSizeAsNumber(gene.size);

    // is there a related gene with a larger size?
    return !gene.sizes.some((relatedName) => {
      const relatedGene = geneListByName.get(relatedName);

      if (relatedGene == null) {
        return false;
      }

      const relatedSize = getGeneSizeAsNumber(relatedGene.size);

      return relatedSize > size;
    });
  });
}

export function getGenesByType(type: GeneType, geneList: Gene[] = genes): Gene[] {
  return geneList.filter((gene) => gene.type === type);
}

export function getGenesByElement(element: GeneElement, geneList: Gene[] = genes): Gene[] {
  return geneList.filter((gene) => gene.element === element);
}

export function getGenesByActive(mustBeActive: boolean, geneList: Gene[] = genes): Gene[] {
  return geneList.filter((gene) => (gene.active ?? false) === mustBeActive);
}

export function getGenesByTarget(target: SkillTarget, geneList: Gene[] = genes): Gene[] {
  return geneList.filter((gene) => gene.target === target);
}

export function getGenesByBreath(mustBeBreath: boolean, geneList: Gene[] = genes): Gene[] {
  return geneList.filter((gene) => (gene.breath ?? false) === mustBeBreath);
}

export function getGenesByEggSkill(mustBeEggSkill: boolean, geneList: Gene[] = genes): Gene[] {
  return geneList.filter((gene) => (gene.eggSkill ?? false) === mustBeEggSkill);
}

export function getGenesByAilment(ailment: SkillAilmentType, geneList: Gene[] = genes): Gene[] {
  return geneList.filter((gene) => gene.ailments?.includes(ailment) ?? false);
}

export function getGenesByBuff(buff: SkillBuffType, geneList: Gene[] = genes): Gene[] {
  return geneList.filter((gene) => gene.buffs?.some((entry) => entry.type === buff) ?? false);
}

export function getGenesByDebuff(debuff: SkillDebuffType, geneList: Gene[] = genes): Gene[] {
  return geneList.filter((gene) => gene.debuffs?.some((entry) => entry.type === debuff) ?? false);
}

export function getGenesByEffect(effect: SkillEffectType, geneList: Gene[] = genes): Gene[] {
  return geneList.filter((gene) => gene.effects?.includes(effect) ?? false);
}

export function getMonstieInnateGenes(monster: Monster): Gene[] {
  return (monster.monstie?.genes?.innate ?? [])
    .map((gene) => {
      return genesByName.get(gene);
    })
    .filter((gene): gene is Gene => gene != null);
}

export function getMonstieSRankGene(monster: Monster): Gene | undefined {
  return genesByName.get(monster.monstie?.genes?.sRank ?? '');
}

export function getMonstieSpecialGenes(monster: Monster): Gene[] {
  return (monster.monstie?.genes?.special ?? [])
    .map((gene) => {
      return genesByName.get(gene);
    })
    .filter((gene): gene is Gene => gene != null);
}

export function getMonstieEggSkills(monster: Monster): { gene: Gene; element: ElementType }[] {
  const group = geneSources.eggSkillGroups[monster.monstie?.genes?.eggSkillGroup ?? ''];

  if (group == null) {
    return [];
  }

  return group
    .map((eggSkill) => {
      return { gene: genesByName.get(eggSkill.gene), element: eggSkill.element };
    })
    .filter((eggSkill): eggSkill is { gene: Gene; element: ElementType } => eggSkill.gene != null);
}

export function getMonstiePassiveGenes(monster: Monster): Gene[] {
  const group = geneSources.geneGroups[monster.monstie?.genes?.passiveGroup ?? ''];

  if (group == null) {
    return [];
  }

  const genes = uniq(
    group
      .map((set) => geneSources.geneSets[set])
      .filter((set) => set != null)
      .flat()
  );

  return genes.map((gene) => genesByName.get(gene)).filter((gene): gene is Gene => gene != null);
}

export function getMonstieGeneCount(monster: Monster): number {
  return (
    getMonstieInnateGenes(monster).length +
    (getMonstieSRankGene(monster) ? 1 : 0) +
    getMonstieSpecialGenes(monster).length +
    getMonstiePassiveGenes(monster).length +
    getMonstieEggSkills(monster).length
  );
}

export function getInnateGeneSources(gene: Gene): Monster[] {
  return monsters.filter((monster) => monster.monstie?.genes?.innate?.includes(gene.name));
}

export function getSRankGeneSources(gene: Gene): Monster[] {
  return monsters.filter((monster) => monster.monstie?.genes?.sRank === gene.name);
}

export function getSpecialGeneSources(gene: Gene): Monster[] {
  return monsters.filter((monster) => monster.monstie?.genes?.special?.includes(gene.name));
}

export function getEggSkillSources(gene: Gene): Monster[] {
  return monsters.filter((monster) =>
    getMonstieEggSkills(monster).some((g) => g.gene.name === gene.name)
  );
}

export function getPassiveGeneSources(gene: Gene): Monster[] {
  return monsters.filter((monster) =>
    getMonstiePassiveGenes(monster).some((g) => g.name === gene.name)
  );
}

let geneMonstieCounts: Map<string, number> | undefined;

function buildGeneMonstieCounts() {
  geneMonstieCounts = new Map<string, number>();

  for (const monster of monsters) {
    const genes = new Set<string>();

    for (const gene of getMonstieInnateGenes(monster)) {
      genes.add(gene.name);
    }

    const sRankGene = getMonstieSRankGene(monster);

    if (sRankGene != null) {
      genes.add(sRankGene.name);
    }

    for (const gene of getMonstieSpecialGenes(monster)) {
      genes.add(gene.name);
    }

    for (const eggSkill of getMonstieEggSkills(monster)) {
      genes.add(eggSkill.gene.name);
    }

    for (const gene of getMonstiePassiveGenes(monster)) {
      genes.add(gene.name);
    }

    for (const gene of genes) {
      geneMonstieCounts.set(gene, (geneMonstieCounts.get(gene) ?? 0) + 1);
    }
  }
}

export function getGeneMonstieCount(gene: Gene): number {
  if (geneMonstieCounts == null) {
    buildGeneMonstieCounts();
  }

  return geneMonstieCounts?.get(gene.name) ?? 0;
}
