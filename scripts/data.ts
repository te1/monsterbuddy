import { readFileSync, writeFileSync, existsSync } from 'node:fs';
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

type Job = {
  file: string;
  schema: z.ZodType;
  transform?: (data: unknown) => void;
};

function generate() {
  const root = join(process.cwd());

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

function makeSlug(text: string) {
  return text
    .replace(/( |\/)/g, '-')
    .replace(/\(|\)/g, '')
    .replace(/-&/, '')
    .toLowerCase();
}

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
    monster.related ??= [];
    monster.locations ??= [];
    monster.monster ??= {};

    const monsterData = monster.monster as Record<string, unknown>;
    monsterData.tendency ??= null;
    monsterData.elementalAtk ??= [];
    monsterData.elementalResistance ??= [];
    monsterData.elementalWeakness ??= [];

    monster.hatchable ??= false;

    if (monster.hatchable && monster.monstie) {
      const monstie = monster.monstie as Record<string, unknown>;
      monstie.tendency ??= null;
      monstie.attackElement = getS1MonstieAttackElement(monster);
      monstie.growth ??= null;
      monstie.ridingActions ??= [];
      monstie.kinshipSkill ??= null;
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
  return getS1MonstieBestAttack(monster)?.element ?? null;
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
    monster.related ??= [];

    const monsterData = monster.monster as Record<string, unknown>;
    monsterData.attackPatterns ??= {};
    monsterData.parts ??= {};
    monsterData.elementalWeakness ??= null;

    monster.hatchable ??= false;

    if (monster.hatchable && monster.monstie) {
      const monstie = monster.monstie as Record<string, unknown>;
      monstie.attackElement = getS2MonstieAttackElement(monster);

      const stats = monstie.stats as Record<string, unknown>;
      stats.bestAttack = getS2MonstieBestAttack(monster);
      stats.bestDefense = getS2MonstieBestDefense(monster);
      stats.worstDefense = getS2MonstieWorstDefense(monster);
      stats.otherDefense = getS2MonstieOtherDefense(monster);
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
  for (const monster of monsters) {
    monster.slug = makeSlug(monster.name as string);

    monster.rank ??= null;
    monster.related ??= [];
    monster.element ??= null;
    monster.monster ??= {};
    monster.hatchable ??= false;

    if (monster.stats) {
      const stats = monster.stats as Record<string, unknown>;

      if (stats.base) {
        const base = stats.base as Record<string, unknown>;
        base.hp ??= null;
        base.attack ??= null;
        base.speed ??= null;
        base.defense ??= null;
        base.crit ??= null;
        base.recovery ??= null;
        base.stamina ??= null;
      }

      if (stats.elementalResistance) {
        const elementalResistance = stats.elementalResistance as Record<string, unknown>;
        elementalResistance.none ??= null;
        elementalResistance.fire ??= null;
        elementalResistance.water ??= null;
        elementalResistance.thunder ??= null;
        elementalResistance.ice ??= null;
        elementalResistance.dragon ??= null;
      }

      if (stats.ailmentResistance) {
        const ailmentResistance = stats.ailmentResistance as Record<string, unknown>;
        ailmentResistance.poison ??= null;
        ailmentResistance.burn ??= null;
        ailmentResistance.paralysis ??= null;
        ailmentResistance.sleep ??= null;
      }
    }

    // TODO add back condition when hatchable is known
    if (/* monster.hatchable && */ monster.monstie) {
      const monstie = monster.monstie as Record<string, unknown>;
      monstie.attack ??= null;
      monstie.ridingActions ??= [];
      monstie.kinshipSkill ??= null;
    }
  }
}

function transformS3Regions(data: unknown) {
  const regions = data as Record<string, unknown>[];
  for (const region of regions) {
    region.slug = makeSlug(region.name as string);

    if (region.monsters) {
      const monsters = region.monsters as Record<string, unknown>;
      monsters.calamitous ??= [];
    }
  }
}

// --------------------------------------------------------

generate();
