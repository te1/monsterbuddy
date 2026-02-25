import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import JSON5 from 'json5';
import { maxBy, minBy } from 'es-toolkit/array';

function generate() {
  const root = join(process.cwd());

  const jobs = [
    // -- 1 -------------------------------------------------
    { file: '1/habitats' },
    { file: '1/monsters', transform: transformMonsters1 },
    { file: '1/ridingActions', transform: transformRidingActions },
    // -- 2 -------------------------------------------------
    { file: '2/catavanStands' },
    { file: '2/coopQuests', transform: transformCoopQuests },
    { file: '2/habitats' },
    { file: '2/monsters', transform: transformMonsters2 },
    { file: '2/ridingActions', transform: transformRidingActions },
    // -- 3 -------------------------------------------------
    { file: '3/monsters', transform: transformMonsters3 },
    { file: '3/regions' },
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

    writeFileSync(output, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`Generated ${output}`);
  }

  console.log('Done');
}

// -- common ----------------------------------------------

function makeSlug(text) {
  return text
    .replace(/( |\/)/g, '-')
    .replace(/\(|\)/g, '')
    .replace(/-&/, '')
    .toLowerCase();
}

function transformRidingActions(ridingActions) {
  for (const ridingAction of ridingActions) {
    ridingAction.slug = makeSlug(ridingAction.name);
  }
}

// -- 1 ---------------------------------------------------

const allElements = ['fire', 'water', 'thunder', 'ice', 'dragon']; // none is absent for MHST1 handling

function transformMonsters1(monsters) {
  for (const monster of monsters) {
    monster.slug = makeSlug(monster.name);

    if (monster.habitat == null) {
      monster.habitat = 'Unknown Habitat';
    }

    if (monster.hatchable && monster.monstie) {
      if (monster.monstie.eggVariants == null) {
        monster.monstie.eggVariants = 4;
      }

      if (monster.monstie.stats) {
        monster.monstie.attackElement = getMonstieAttackElement1(monster);
        monster.monstie.stats.bestAttack = getMonstieBestAttack1(monster);
        monster.monstie.stats.bestDefense = getMonstieBestDefense1(monster);
        monster.monstie.stats.worstDefense = getMonstieWorstDefense1(monster);
      }
    }
  }
}

function getMonstieAttackElement1(monster) {
  return getMonstieBestAttack1(monster)?.element;
}

function getMonstieBestAttack1(monster) {
  const attack = getMonstieAttackStats1(monster);

  const result = maxBy(attack, (x) => x.value);
  if (result) {
    result.elements = attack.filter((x) => x.value === result.value).map((x) => x.element);

    if (result.elements.length === allElements.length) {
      return;
    }
  }

  return result;
}

function getMonstieAttackStats1(monster) {
  const attack = monster?.monstie?.stats?.attack;

  return Object.entries(attack || {}).map(([key, value]) => ({
    element: key,
    value,
  }));
}

function getMonstieBestDefense1(monster) {
  const defense = getMonstieDefenseStats1(monster);

  const result = maxBy(defense, (x) => x.value);
  if (result) {
    result.elements = defense.filter((x) => x.value === result.value).map((x) => x.element);

    if (result.elements.length === allElements.length) {
      return;
    }
  }

  return result;
}

function getMonstieWorstDefense1(monster) {
  const defense = getMonstieDefenseStats1(monster);

  const result = minBy(defense, (x) => x.value);
  if (result) {
    result.elements = defense.filter((x) => x.value === result.value).map((x) => x.element);

    if (result.elements.length === allElements.length) {
      return;
    }
  }

  return result;
}

function getMonstieDefenseStats1(monster) {
  const defense = monster?.monstie?.stats?.defense;

  return Object.entries(defense || {}).map(([key, value]) => ({
    element: key,
    value,
  }));
}

// -- 2 ---------------------------------------------------
function transformCoopQuests(coopQuests) {
  for (const coopQuest of coopQuests) {
    coopQuest.slug = makeSlug(coopQuest.name);
  }
}

function transformMonsters2(monsters) {
  for (const monster of monsters) {
    monster.slug = makeSlug(monster.name);

    if (monster.habitat == null) {
      monster.habitat = 'Unknown Habitat';
    }

    if (monster.hatchable && monster.monstie) {
      monster.monstie.attackElement = getMonstieAttackElement2(monster);
      monster.monstie.stats.bestAttack = getMonstieBestAttack2(monster);
      monster.monstie.stats.bestDefense = getMonstieBestDefense2(monster);
      monster.monstie.stats.worstDefense = getMonstieWorstDefense2(monster);
      monster.monstie.stats.otherDefense = getMonstieOtherDefense2(monster);
    }
  }
}

function getMonstieAttackElement2(monster) {
  return getMonstieBestAttack2(monster)?.element;
}

function getMonstieBestAttack2(monster) {
  const attack = monster?.monstie?.stats?.attack;

  const arr = Object.entries(attack || {}).map(([key, value]) => ({
    element: key,
    value,
  }));

  return maxBy(arr, (x) => x.value);
}

function getMonstieBestDefense2(monster) {
  return maxBy(getMonstieDefenseStats2(monster), (x) => x.value);
}

function getMonstieWorstDefense2(monster) {
  return minBy(getMonstieDefenseStats2(monster), (x) => x.value);
}

function getMonstieOtherDefense2(monster) {
  const defense = getMonstieDefenseStats2(monster);

  return defense.find((item) => {
    return (
      item.value !== monster?.monstie?.stats?.bestDefense?.value &&
      item.value !== monster?.monstie?.stats?.worstDefense?.value
    );
  });
}

function getMonstieDefenseStats2(monster) {
  const defense = monster?.monstie?.stats?.defense;

  return Object.entries(defense || {}).map(([key, value]) => ({
    element: key,
    value,
  }));
}

// -- 3 ---------------------------------------------------

function transformMonsters3(monsters) {
  for (const monster of monsters) {
    monster.slug = makeSlug(monster.name);
  }
}

// --------------------------------------------------------

generate();
