import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import JSON5 from 'json5';
import { maxBy, minBy } from 'es-toolkit/array';
import { z } from 'zod';
import { HabitatSchema as S1HabitatSchema } from '~~/data/1/habitats.schema';
import { MonsterSchema as S1MonsterSchema } from '~~/data/1/monsters.schema';
import { RidingActionSchema as S1RidingActionSchema } from '~~/data/1/ridingActions.schema';
import { CatavanStandSchema as S2CatavanStandSchema } from '~~/data/2/catavanStands.schema';
import { CoopQuestSchema as S2CoopQuestSchema } from '~~/data/2/coopQuests.schema';
import { HabitatSchema as S2HabitatSchema } from '~~/data/2/habitats.schema';
import { MonsterSchema as S2MonsterSchema } from '~~/data/2/monsters.schema';
import { RidingActionSchema as S2RidingActionSchema } from '~~/data/2/ridingActions.schema';
import { MonsterSchema as S3MonsterSchema } from '~~/data/3/monsters.schema';
import { RegionSchema as S3RegionSchema } from '~~/data/3/regions.schema';
import { RidingActionSchema as S3RidingActionSchema } from '~~/data/3/ridingActions.schema';
import { GeneSchema as S3GeneSchema } from '~~/data/3/genes.schema';
import { GeneSourcesSchema as S3GeneSourcesSchema } from '~~/data/3/geneSources.schema';
import { makeSlug } from '~~/app/utils/data';

const generateEggSvgs = false;

type Job = {
  file: string;
  schema: z.ZodType;
  transform?: (data: unknown) => void;
};

const root = join(process.cwd());

function generate() {
  const jobs: Job[] = [
    // -- 1 -------------------------------------------------
    { file: '1/habitats', schema: S1HabitatSchema.array() },
    { file: '1/monsters', schema: S1MonsterSchema.array(), transform: transformS1Monsters },
    {
      file: '1/ridingActions',
      schema: S1RidingActionSchema.array(),
      transform: transformRidingActions,
    },
    // -- 2 -------------------------------------------------
    {
      file: '2/catavanStands',
      schema: S2CatavanStandSchema.array(),
      transform: transformS2CatavanStands,
    },
    { file: '2/coopQuests', schema: S2CoopQuestSchema.array(), transform: transformS2CoopQuests },
    { file: '2/habitats', schema: S2HabitatSchema.array() },
    { file: '2/monsters', schema: S2MonsterSchema.array(), transform: transformS2Monsters },
    {
      file: '2/ridingActions',
      schema: S2RidingActionSchema.array(),
      transform: transformRidingActions,
    },
    // -- 3 -------------------------------------------------
    { file: '3/monsters', schema: S3MonsterSchema.array(), transform: transformS3Monsters },
    { file: '3/regions', schema: S3RegionSchema.array(), transform: transformS3Regions },
    {
      file: '3/ridingActions',
      schema: S3RidingActionSchema.array(),
      transform: transformRidingActions,
    },
    { file: '3/genes', schema: S3GeneSchema.array(), transform: transformS3Genes },
    { file: '3/geneSources', schema: S3GeneSourcesSchema },
  ];

  for (const job of jobs) {
    const input = join(root, 'data', job.file + '.json5');
    const output = join(root, 'app', 'assets', job.file + '.json');

    if (!existsSync(input)) {
      console.error(`Missing source: ${input}`);
      process.exit(1);
    }

    const raw = readFileSync(input, 'utf-8');
    const data = JSON5.parse(raw);

    if (job.transform) {
      job.transform(data);
    }

    if (job.schema) {
      const result = job.schema.safeParse(data);
      if (!result.success) {
        console.error(`Validation failed for ${output}:`);
        console.error(z.prettifyError(result.error));
        process.exit(1);
      }
    }

    writeFileSync(output, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`Generated ${output}`);
  }

  console.log('Done');
}

// -- common ----------------------------------------------

function transformRidingActions(data: unknown) {
  const ridingActions = data as { name: string; slug?: string }[];

  for (const ridingAction of ridingActions) {
    ridingAction.slug = makeSlug(ridingAction.name);
  }
}

// -- 1 ---------------------------------------------------

const s1AllElements = ['fire', 'water', 'thunder', 'ice', 'dragon']; // none is absent for MHST1 handling

function transformS1Monsters(data: unknown) {
  const monsters = data as Record<string, unknown>[];

  for (const monster of monsters) {
    monster.slug = makeSlug(monster.name as string);

    monster.habitat ??= 'Unknown Habitat';

    if (monster.hatchable && monster.monstie) {
      const monstie = monster.monstie as Record<string, unknown>;

      monstie.attackElement = getS1MonstieAttackElement(monster);
      monstie.eggVariants ??= 4;

      if (monstie.stats) {
        const stats = monstie.stats as Record<string, unknown>;

        stats.bestAttack = getS1MonstieBestAttack(monster);
        stats.bestDefense = getS1MonstieBestDefense(monster);
        stats.worstDefense = getS1MonstieWorstDefense(monster);
      }
    }
  }
}

function getS1MonstieAttackElement(monster: Record<string, unknown>) {
  return getS1MonstieBestAttack(monster)?.element;
}

function getS1MonstieBestAttack(monster: Record<string, unknown>) {
  const attack = getS1MonstieAttackStats(monster);

  const result = maxBy(attack, (x: { value: number }) => x.value);
  if (result) {
    (result as Record<string, unknown>).elements = attack
      .filter((x: { value: number }) => x.value === result.value)
      .map((x: { element: string }) => x.element);

    if ((result as unknown as { elements: string[] }).elements.length === s1AllElements.length) {
      return;
    }
  }

  return result;
}

function getS1MonstieAttackStats(monster: Record<string, unknown>) {
  const monstie = monster?.monstie as Record<string, unknown> | undefined;
  const stats = monstie?.stats as Record<string, unknown> | undefined;
  const attack = stats?.attack as Record<string, number> | undefined;

  return Object.entries(attack || {}).map(([key, value]) => ({
    element: key,
    value,
  }));
}

function getS1MonstieBestDefense(monster: Record<string, unknown>) {
  const defense = getS1MonstieDefenseStats(monster);

  const result = maxBy(defense, (x: { value: number }) => x.value);
  if (result) {
    (result as Record<string, unknown>).elements = defense
      .filter((x: { value: number }) => x.value === result.value)
      .map((x: { element: string }) => x.element);

    if ((result as unknown as { elements: string[] }).elements.length === s1AllElements.length) {
      return;
    }
  }

  return result;
}

function getS1MonstieWorstDefense(monster: Record<string, unknown>) {
  const defense = getS1MonstieDefenseStats(monster);

  const result = minBy(defense, (x: { value: number }) => x.value);
  if (result) {
    (result as Record<string, unknown>).elements = defense
      .filter((x: { value: number }) => x.value === result.value)
      .map((x: { element: string }) => x.element);

    if ((result as unknown as { elements: string[] }).elements.length === s1AllElements.length) {
      return;
    }
  }

  return result;
}

function getS1MonstieDefenseStats(monster: Record<string, unknown>) {
  const monstie = monster?.monstie as Record<string, unknown> | undefined;
  const stats = monstie?.stats as Record<string, unknown> | undefined;
  const defense = stats?.defense as Record<string, number> | undefined;

  return Object.entries(defense || {}).map(([key, value]) => ({
    element: key,
    value,
  }));
}

// -- 2 ---------------------------------------------------
function transformS2CatavanStands(data: unknown) {
  const catavanStands = data as { name: string; slug?: string }[];

  for (const catavanStand of catavanStands) {
    catavanStand.slug = makeSlug(catavanStand.name);
  }
}

function transformS2CoopQuests(data: unknown) {
  const coopQuests = data as { name: string; slug?: string }[];

  for (const coopQuest of coopQuests) {
    coopQuest.slug = makeSlug(coopQuest.name);
  }
}

function transformS2Monsters(data: unknown) {
  const monsters = data as Record<string, unknown>[];

  for (const monster of monsters) {
    monster.slug = makeSlug(monster.name as string);

    monster.habitat ??= 'Unknown Habitat';

    if (monster.hatchable && monster.monstie) {
      const monstie = monster.monstie as Record<string, unknown>;

      monstie.attackElement = getS2MonstieAttackElement(monster);

      if (monstie.stats) {
        const stats = monstie.stats as Record<string, unknown>;

        stats.bestAttack = getS2MonstieBestAttack(monster);
        stats.bestDefense = getS2MonstieBestDefense(monster);
        stats.worstDefense = getS2MonstieWorstDefense(monster);
        stats.otherDefense = getS2MonstieOtherDefense(monster);
      }
    }
  }
}

function getS2MonstieAttackElement(monster: Record<string, unknown>) {
  return getS2MonstieBestAttack(monster)?.element;
}

function getS2MonstieBestAttack(monster: Record<string, unknown>) {
  const monstie = monster?.monstie as Record<string, unknown> | undefined;
  const stats = monstie?.stats as Record<string, unknown> | undefined;
  const attack = stats?.attack as Record<string, number> | undefined;

  const arr = Object.entries(attack || {}).map(([key, value]) => ({
    element: key,
    value,
  }));

  return maxBy(arr, (x: { value: number }) => x.value);
}

function getS2MonstieBestDefense(monster: Record<string, unknown>) {
  return maxBy(getS2MonstieDefenseStats(monster), (x: { value: number }) => x.value);
}

function getS2MonstieWorstDefense(monster: Record<string, unknown>) {
  return minBy(getS2MonstieDefenseStats(monster), (x: { value: number }) => x.value);
}

function getS2MonstieOtherDefense(monster: Record<string, unknown>) {
  const defense = getS2MonstieDefenseStats(monster);
  const monstie = monster?.monstie as Record<string, unknown> | undefined;
  const stats = monstie?.stats as Record<string, unknown> | undefined;
  const bestDefense = stats?.bestDefense as { value: number } | undefined;
  const worstDefense = stats?.worstDefense as { value: number } | undefined;

  return defense.find((item: { value: number }) => {
    return item.value !== bestDefense?.value && item.value !== worstDefense?.value;
  });
}

function getS2MonstieDefenseStats(monster: Record<string, unknown>) {
  const monstie = monster?.monstie as Record<string, unknown> | undefined;
  const stats = monstie?.stats as Record<string, unknown> | undefined;
  const defense = stats?.defense as Record<string, number> | undefined;

  return Object.entries(defense || {}).map(([key, value]) => ({
    element: key,
    value,
  }));
}

// -- 3 ---------------------------------------------------

function transformS3Monsters(data: unknown) {
  const monsters = data as Record<string, unknown>[];

  for (let index = 0; index < monsters.length; index++) {
    const monster = monsters[index]!;

    if (monster.hidden) {
      monsters.splice(index, 1);
      index--;
      continue;
    }

    monster.slug = makeSlug(monster.name as string);

    if (monster.stats) {
      const stats = monster.stats as Record<string, unknown>;

      if (stats.base) {
        const base = stats.base as Record<string, unknown>;

        base.bulk = getS3MonsterBulk(base);
        base.total = getS3MonsterTotal(base);
      }
    }

    if (monster.hatchable && monster.monstie) {
      const monstie = monster.monstie as Record<string, unknown>;

      if (
        Array.isArray(monstie.svgEggColors) &&
        monstie.svgEggColors.length === 2 &&
        typeof monstie.svgEggColors[0] === 'string' &&
        typeof monstie.svgEggColors[1] === 'string'
      ) {
        generateEggSvg(monster);
      }

      delete monstie.svgEggColors;
    }
  }
}

function generateEggSvg(monster: Record<string, unknown>) {
  if (!generateEggSvgs) {
    return;
  }

  const monstie = monster.monstie as Record<string, unknown> | undefined;
  const genus = monster.genus as string | undefined;
  if (!monstie || !genus) {
    return;
  }

  const eggColors = monstie.svgEggColors;
  if (
    !Array.isArray(eggColors) ||
    eggColors.length !== 2 ||
    typeof eggColors[0] !== 'string' ||
    typeof eggColors[1] !== 'string'
  ) {
    return;
  }

  const templatePath = join(root, 'data', 'egg', `${genus}.svg`);
  if (!existsSync(templatePath)) {
    return;
  }

  let svg = readFileSync(templatePath, 'utf-8');
  const placeholder1 = '___EGG_COLOR_1___';
  const placeholder2 = '___EGG_COLOR_2___';
  svg = svg
    .replace(/#f00/g, placeholder1)
    .replace(/#0f0/g, placeholder2)
    .replaceAll(placeholder1, eggColors[0])
    .replaceAll(placeholder2, eggColors[1]);

  const outDir = join(root, 'app', 'assets', '3', 'egg');
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, `${monster.name}.svg`);
  writeFileSync(outPath, svg.trimEnd(), 'utf-8');
}

function getS3MonsterBulk(base: Record<string, unknown>) {
  const sum = Number(base.hp ?? 0) + Number(base.defense ?? 0);

  return sum > 0 ? sum : undefined;
}

function getS3MonsterTotal(base: Record<string, unknown>) {
  const sum =
    Number(base.hp ?? 0) +
    Number(base.attack ?? 0) +
    Number(base.speed ?? 0) +
    Number(base.defense ?? 0);

  return sum > 0 ? sum : undefined;
}

function transformS3Regions(data: unknown) {
  const regions = data as Record<string, unknown>[];

  for (const region of regions) {
    region.slug = makeSlug(region.name as string);

    if (region.areas) {
      const areas = region.areas as Record<string, unknown>[];

      for (const area of areas) {
        area.slug = makeSlug(area.name as string);
      }
    }
  }
}

function transformS3Genes(data: unknown) {
  const genes = data as { name: string; slug?: string }[];

  for (const gene of genes) {
    gene.slug = makeSlug(gene.name);
  }
}

// --------------------------------------------------------

generate();
