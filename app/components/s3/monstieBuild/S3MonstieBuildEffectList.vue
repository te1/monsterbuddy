<script lang="ts" setup>
  import type { MonstieBuild } from '~/services/3/monstieBuilds';
  import { sortBy, uniq, uniqWith } from 'es-toolkit/array';
  import { isEqual } from 'es-toolkit/predicate';
  import { allAilments, allBuffs, allDebuffs } from '~/services/3/genes';

  const props = defineProps<{ build: MonstieBuild }>();

  const genes = computed(() => {
    return props.build.uniqueGenes;
  });

  const ailmentOrder = new Map(allAilments.map((ailment, index) => [ailment, index]));

  const ailments = computed(() => {
    const all = genes.value.flatMap((gene) => gene.ailments ?? []);

    return uniq(all).toSorted((a, b) => ailmentOrder.get(a)! - ailmentOrder.get(b)!);
  });

  const buffOrder = new Map(allBuffs.map((buff, index) => [buff, index]));
  const buffSizeOrder = new Map(
    [undefined, 'S', 'M', 'L', 'stacking'].map((size, index) => [size, index])
  );

  const buffs = computed(() => {
    const ignored = [
      //
      'Burn Effect',
      'Blast Effect',
      'Paralysis Effect',
    ];

    const all = genes.value
      .flatMap((gene) => gene.buffs ?? [])
      .filter((buff) => !ignored.includes(buff.type));
    const unique = uniqWith(all, (a, b) => isEqual(a, b));

    return sortBy(unique, [
      (buff) => buffOrder.get(buff.type)!,
      (buff) => buffSizeOrder.get(buff.size)!,
    ]);
  });

  const debuffOrder = new Map(allDebuffs.map((debuff, index) => [debuff, index]));

  const debuffs = computed(() => {
    const all = genes.value.flatMap((gene) => gene.debuffs ?? []);
    const unique = uniqWith(all, (a, b) => isEqual(a, b));

    return sortBy(unique, [
      (debuff) => debuffOrder.get(debuff.type)!,
      (debuff) => buffSizeOrder.get(debuff.size)!,
    ]);
  });

  const detailTypes = [
    'damageDone',
    'damageTaken',
    'staminaCost',
    'kinshipGeneration',
    'ailmentInflictRate',
  ];

  const detailOrder = new Map(detailTypes.map((detail, index) => [detail, index]));

  const details = computed(() => {
    const all = genes.value
      .flatMap((gene) => gene.details ?? [])
      .filter((detail) => detailTypes.includes(detail.type))
      .filter((detail) => detail.condition == null);

    return sortBy(all, [(detail) => detailOrder.get(detail.type)!]);
  });

  // TODO egg powers

  const hasEffects = computed(() => {
    return (
      ailments.value.length > 0 ||
      buffs.value.length > 0 ||
      debuffs.value.length > 0 ||
      details.value.length > 0
    );
  });
</script>

<template>
  <section v-if="hasEffects" class="flex flex-col gap-3">
    <div v-if="ailments.length > 0" class="flex flex-col gap-1.5">
      <h3 class="text-lg font-semibold">Ailments</h3>

      <div class="flex gap-2">
        <S3AilmentIcon
          v-for="ailment in ailments"
          :key="ailment"
          :ailment="ailment"
          class="-my-1 h-8 w-6 object-cover"
        />
      </div>
    </div>

    <div v-if="buffs.length > 0">
      <div class="text-lg font-semibold">Buffs</div>

      <div class="flex flex-col gap-1">
        <S3GeneBuffDetails v-for="buff in buffs" :key="buff.type" :buff="buff" />
      </div>
    </div>

    <div v-if="debuffs.length > 0">
      <div class="text-lg font-semibold">Debuffs</div>

      <div class="flex flex-col gap-1">
        <S3GeneDebuffDetails v-for="debuff in debuffs" :key="debuff.type" :debuff="debuff" />
      </div>
    </div>

    <div v-if="details.length > 0">
      <div class="text-lg font-semibold">Passive Effects</div>

      <div class="flex flex-col gap-1">
        <S3SkillDetail v-for="detail in details" :key="detail.type" :detail="detail" verbose />
      </div>
    </div>
  </section>
</template>
