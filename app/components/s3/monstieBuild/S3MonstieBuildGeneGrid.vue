<script lang="ts" setup>
  import type { MonstieBuild } from '~/services/3/monstieBuilds';
  import type { Gene } from '~/services/3/types';
  import { uniq } from 'es-toolkit/array';
  import { formatBingoBonusType, formatBingoBonusValue } from '~/services/3/presentation';

  const props = defineProps<{ build: MonstieBuild }>();

  const genes = computed(() => props.build.genes);

  function getBingo(...genes: (Gene | undefined)[]) {
    const result: { bingo: boolean; element?: ElementType; type?: AttackType } = {
      bingo: false,
      element: undefined,
      type: undefined,
    };

    const elements = genes.map((gene) => gene?.element).filter((element) => element != null);
    if (elements.length === 3) {
      const uniqueElements = uniq(elements.filter((element) => element !== 'all'));
      if (uniqueElements.length === 1) {
        result.element = uniqueElements[0];
        result.bingo = true;
      }
    }

    const types = genes.map((gene) => gene?.type).filter((type) => type != null);
    if (types.length === 3) {
      const uniqueTypes = uniq(types.filter((type) => type !== 'all'));
      if (uniqueTypes.length === 1) {
        result.type = uniqueTypes[0];
        result.bingo = true;
      }
    }

    return result;
  }

  const row1Bingo = computed(() => getBingo(genes.value[0], genes.value[1], genes.value[2]));
  const row2Bingo = computed(() => getBingo(genes.value[3], genes.value[4], genes.value[5]));
  const row3Bingo = computed(() => getBingo(genes.value[6], genes.value[7], genes.value[8]));
  const col1Bingo = computed(() => getBingo(genes.value[0], genes.value[3], genes.value[6]));
  const col2Bingo = computed(() => getBingo(genes.value[1], genes.value[4], genes.value[7]));
  const col3Bingo = computed(() => getBingo(genes.value[2], genes.value[5], genes.value[8]));
  const diag1Bingo = computed(() => getBingo(genes.value[0], genes.value[4], genes.value[8]));
  const diag2Bingo = computed(() => getBingo(genes.value[2], genes.value[4], genes.value[6]));

  const allBingos = computed(() => [
    row1Bingo.value,
    row2Bingo.value,
    row3Bingo.value,
    col1Bingo.value,
    col2Bingo.value,
    col3Bingo.value,
    diag1Bingo.value,
    diag2Bingo.value,
  ]);

  const elementBingoCounts = computed(() => {
    const map = new Map<ElementType, number>();

    for (const bingo of allBingos.value) {
      if (bingo.bingo && bingo.element) {
        map.set(bingo.element, (map.get(bingo.element) ?? 0) + 1);
      }
    }

    return [...map.entries()]
      .map(([element, count]) => ({ count, element }))
      .sort((a, b) => b.count - a.count);
  });

  const typeBingoCounts = computed(() => {
    const map = new Map<AttackType, number>();

    for (const bingo of allBingos.value) {
      if (bingo.bingo && bingo.type) {
        map.set(bingo.type, (map.get(bingo.type) ?? 0) + 1);
      }
    }

    return [...map.entries()]
      .map(([type, count]) => ({ count, type }))
      .sort((a, b) => b.count - a.count);
  });

  const totalBingoCount = computed(() => {
    return (
      elementBingoCounts.value.reduce((total, { count }) => total + count, 0) +
      typeBingoCounts.value.reduce((total, { count }) => total + count, 0)
    );
  });

  function getBingoBonus(count: number) {
    switch (count) {
      case 1:
        return 0.05;

      case 2:
        return 0.1;

      case 3:
        return 0.15;

      case 4:
        return 0.2;

      case 5:
        return 0.25;

      case 6:
        return 0.3;

      case 7:
        return 0.4;

      case 8:
        return 0.5;

      default:
        return 0.0;
    }
  }

  function lineColor(bingo: boolean) {
    return bingo ? 'bg-gene-bingo' : 'bg-gene-grid';
  }
</script>

<template>
  <section class="@container">
    <div
      class="flex flex-col place-items-center gap-x-12 gap-y-6 @3xl:flex-row @3xl:place-items-start"
    >
      <!-- grid -->
      <div
        style="
          --half-cell: calc(var(--cell) / 2);
          --inset: calc(var(--cell) / 3.25);
          --half-inset: calc(var(--inset) / 2);
          --diag-inset: calc(var(--inset) / 1.5);
          --gap: calc(var(--cell) / 12);
          --size: calc(var(--cell) * 3 + var(--gap) * 2);
          --line: calc(var(--cell) / 13);
          --half-line: calc(var(--line) / 2);
          --circle: calc(var(--cell) / 3.75);
        "
        class="relative size-(--size) [--cell:100px] @sm:[--cell:120px]"
      >
        <!-- grid background -->
        <div
          class="pointer-events-none absolute inset-(--inset) drop-shadow-sm drop-shadow-black select-none"
        >
          <!-- rows -->
          <div class="absolute inset-0 grid grid-cols-3 grid-rows-3 items-center gap-(--gap)">
            <div
              class="col-span-3 mx-(--half-cell) h-(--line)"
              :class="lineColor(row1Bingo.bingo)"
            />
            <div
              class="col-span-3 mx-(--half-cell) h-(--line)"
              :class="lineColor(row2Bingo.bingo)"
            />
            <div
              class="col-span-3 mx-(--half-cell) h-(--line)"
              :class="lineColor(row3Bingo.bingo)"
            />
          </div>

          <!-- cols -->
          <div
            class="absolute inset-0 grid grid-cols-3 grid-rows-3 justify-items-center gap-(--gap)"
          >
            <div
              class="row-span-3 my-(--half-cell) w-(--line)"
              :class="lineColor(col1Bingo.bingo)"
            />
            <div
              class="row-span-3 my-(--half-cell) w-(--line)"
              :class="lineColor(col2Bingo.bingo)"
            />
            <div
              class="row-span-3 my-(--half-cell) w-(--line)"
              :class="lineColor(col3Bingo.bingo)"
            />
          </div>

          <!-- diagonal top left to bottom right -->
          <div class="absolute inset-0 grid grid-cols-3 grid-rows-3 items-center gap-(--gap)">
            <div
              class="col-span-3 row-start-2 h-(--line) rotate-45"
              :class="lineColor(diag1Bingo.bingo)"
            />
          </div>

          <!-- diagonal top right to bottom left -->
          <div class="absolute inset-0 grid grid-cols-3 grid-rows-3 items-center gap-(--gap)">
            <div
              class="col-span-3 row-start-2 h-(--line) -rotate-45"
              :class="lineColor(diag2Bingo.bingo)"
            />
          </div>

          <!-- bingo rows -->
          <div class="absolute inset-0 grid grid-cols-3 grid-rows-3 items-center gap-(--gap)">
            <div
              v-if="row1Bingo.element"
              class="mr-(--half-cell) -ml-(--half-inset) h-(--line) bg-gene-bingo"
            />
            <div v-else />
            <div />
            <div
              v-if="row1Bingo.type"
              class="-mr-(--half-inset) ml-(--half-cell) h-(--line) bg-gene-bingo"
            />
            <div v-else />

            <div
              v-if="row2Bingo.element"
              class="mr-(--half-cell) -ml-(--half-inset) h-(--line) bg-gene-bingo"
            />
            <div v-else />
            <div />
            <div
              v-if="row2Bingo.type"
              class="-mr-(--half-inset) ml-(--half-cell) h-(--line) bg-gene-bingo"
            />
            <div v-else />

            <div
              v-if="row3Bingo.element"
              class="mr-(--half-cell) -ml-(--half-inset) h-(--line) bg-gene-bingo"
            />
            <div v-else />
            <div />
            <div
              v-if="row3Bingo.type"
              class="-mr-(--half-inset) ml-(--half-cell) h-(--line) bg-gene-bingo"
            />
            <div v-else />
          </div>

          <!-- bingo cols -->
          <div
            class="absolute inset-0 grid grid-cols-3 grid-rows-3 justify-items-center gap-(--gap)"
          >
            <div
              v-if="col1Bingo.element"
              class="-mt-(--half-inset) mb-(--half-cell) w-(--line) bg-gene-bingo"
            />
            <div v-else />
            <div
              v-if="col2Bingo.element"
              class="-mt-(--half-inset) mb-(--half-cell) w-(--line) bg-gene-bingo"
            />
            <div v-else />
            <div
              v-if="col3Bingo.element"
              class="-mt-(--half-inset) mb-(--half-cell) w-(--line) bg-gene-bingo"
            />
            <div v-else />

            <div class="col-span-3" />

            <div
              v-if="col1Bingo.type"
              class="mt-(--half-cell) -mb-(--half-inset) w-(--line) bg-gene-bingo"
            />
            <div v-else />
            <div
              v-if="col2Bingo.type"
              class="mt-(--half-cell) -mb-(--half-inset) w-(--line) bg-gene-bingo"
            />
            <div v-else />
            <div
              v-if="col3Bingo.type"
              class="mt-(--half-cell) -mb-(--half-inset) w-(--line) bg-gene-bingo"
            />
            <div v-else />
          </div>

          <!-- bingo diagonals -->
          <div class="absolute inset-0 grid grid-cols-3 grid-rows-3 items-center gap-(--gap)">
            <div
              v-if="diag1Bingo.element"
              class="-mt-(--half-inset) mr-(--half-cell) mb-(--half-cell) -ml-(--half-inset) h-(--line) rotate-45 bg-gene-bingo"
            />
            <div v-else />
            <div />
            <div
              v-if="diag2Bingo.type"
              class="-mt-(--half-inset) -mr-(--half-inset) mb-(--half-cell) ml-(--half-cell) h-(--line) -rotate-45 bg-gene-bingo"
            />
            <div v-else />

            <div class="col-span-3" />

            <div
              v-if="diag2Bingo.element"
              class="mt-(--half-cell) mr-(--half-cell) -mb-(--half-inset) -ml-(--half-inset) h-(--line) -rotate-45 bg-gene-bingo"
            />
            <div v-else />
            <div />
            <div
              v-if="diag1Bingo.type"
              class="mt-(--half-cell) -mr-(--half-inset) -mb-(--half-inset) ml-(--half-cell) h-(--line) rotate-45 bg-gene-bingo"
            />
            <div v-else />
          </div>

          <!-- bingo circles rows -->
          <div class="absolute inset-0 grid grid-cols-3 grid-rows-3 items-center gap-(--gap)">
            <div
              v-if="row1Bingo.element"
              class="-ml-(--inset) size-(--circle) rounded-full bg-gene-bingo"
            >
              <ElementIcon :element="row1Bingo.element" icon2 />
            </div>
            <div v-else />
            <div />
            <div
              v-if="row1Bingo.type"
              class="-mr-(--inset) size-(--circle) justify-self-end rounded-full bg-gene-bingo"
            >
              <AttackTypeIcon :type="row1Bingo.type" icon2 />
            </div>
            <div v-else />

            <div
              v-if="row2Bingo.element"
              class="-ml-(--inset) size-(--circle) rounded-full bg-gene-bingo"
            >
              <ElementIcon :element="row2Bingo.element" icon2 />
            </div>
            <div v-else />
            <div />
            <div
              v-if="row2Bingo.type"
              class="-mr-(--inset) size-(--circle) justify-self-end rounded-full bg-gene-bingo"
            >
              <AttackTypeIcon :type="row2Bingo.type" icon2 />
            </div>
            <div v-else />

            <div
              v-if="row3Bingo.element"
              class="-ml-(--inset) size-(--circle) rounded-full bg-gene-bingo"
            >
              <ElementIcon :element="row3Bingo.element" icon2 />
            </div>
            <div v-else />
            <div />
            <div
              v-if="row3Bingo.type"
              class="-mr-(--inset) size-(--circle) justify-self-end rounded-full bg-gene-bingo"
            >
              <AttackTypeIcon :type="row3Bingo.type" icon2 />
            </div>
            <div v-else />
          </div>

          <!-- bingo circles cols -->
          <div
            class="absolute inset-0 grid grid-cols-3 grid-rows-3 justify-items-center gap-(--gap)"
          >
            <div
              v-if="col1Bingo.element"
              class="-mt-(--inset) size-(--circle) rounded-full bg-gene-bingo"
            >
              <ElementIcon :element="col1Bingo.element" icon2 />
            </div>
            <div v-else />
            <div
              v-if="col2Bingo.element"
              class="-mt-(--inset) size-(--circle) rounded-full bg-gene-bingo"
            >
              <ElementIcon :element="col2Bingo.element" icon2 />
            </div>
            <div v-else />
            <div
              v-if="col3Bingo.element"
              class="-mt-(--inset) size-(--circle) rounded-full bg-gene-bingo"
            >
              <ElementIcon :element="col3Bingo.element" icon2 />
            </div>
            <div v-else />

            <div class="col-span-3" />

            <div
              v-if="col1Bingo.type"
              class="-mb-(--inset) size-(--circle) self-end rounded-full bg-gene-bingo"
            >
              <AttackTypeIcon :type="col1Bingo.type" icon2 />
            </div>
            <div v-else />
            <div
              v-if="col2Bingo.type"
              class="-mb-(--inset) size-(--circle) self-end rounded-full bg-gene-bingo"
            >
              <AttackTypeIcon :type="col2Bingo.type" icon2 />
            </div>
            <div v-else />
            <div
              v-if="col3Bingo.type"
              class="-mb-(--inset) size-(--circle) self-end rounded-full bg-gene-bingo"
            >
              <AttackTypeIcon :type="col3Bingo.type" icon2 />
            </div>
            <div v-else />
          </div>

          <!-- bingo circles diagonals -->
          <div class="absolute inset-0 grid grid-cols-3 grid-rows-3 items-center gap-(--gap)">
            <div
              v-if="diag1Bingo.element"
              class="-mt-(--diag-inset) -ml-(--diag-inset) size-(--circle) self-start rounded-full bg-gene-bingo"
            >
              <ElementIcon :element="diag1Bingo.element" icon2 />
            </div>
            <div v-else />
            <div />
            <div
              v-if="diag2Bingo.type"
              class="-mt-(--diag-inset) -mr-(--diag-inset) size-(--circle) self-start justify-self-end rounded-full bg-gene-bingo"
            >
              <AttackTypeIcon :type="diag2Bingo.type" icon2 />
            </div>
            <div v-else />

            <div class="col-span-3" />

            <div
              v-if="diag2Bingo.element"
              class="-mb-(--diag-inset) -ml-(--diag-inset) size-(--circle) self-end rounded-full bg-gene-bingo"
            >
              <ElementIcon :element="diag2Bingo.element" icon2 />
            </div>
            <div v-else />
            <div />
            <div
              v-if="diag1Bingo.type"
              class="-mr-(--diag-inset) -mb-(--diag-inset) size-(--circle) self-end justify-self-end rounded-full bg-gene-bingo"
            >
              <AttackTypeIcon :type="diag1Bingo.type" icon2 />
            </div>
            <div v-else />
          </div>

          <!-- gene grid background -->
          <div class="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-(--gap)">
            <img src="~/assets/3/gene/size-s.avif" alt="" aria-hidden="true" />
            <img src="~/assets/3/gene/size-s.avif" alt="" aria-hidden="true" />
            <img src="~/assets/3/gene/size-s.avif" alt="" aria-hidden="true" />
            <img src="~/assets/3/gene/size-s.avif" alt="" aria-hidden="true" />
            <img src="~/assets/3/gene/size-s.avif" alt="" aria-hidden="true" />
            <img src="~/assets/3/gene/size-s.avif" alt="" aria-hidden="true" />
            <img src="~/assets/3/gene/size-s.avif" alt="" aria-hidden="true" />
            <img src="~/assets/3/gene/size-s.avif" alt="" aria-hidden="true" />
            <img src="~/assets/3/gene/size-s.avif" alt="" aria-hidden="true" />
          </div>
        </div>

        <!-- genes -->
        <div
          class="absolute inset-(--inset) grid grid-cols-3 grid-rows-3 place-items-center gap-(--gap)"
        >
          <div class="grid size-full place-items-center">
            <S3GeneIcon v-if="genes[0]" :gene="genes[0]" size="size-full" />
            <div v-else>+</div>
          </div>
          <div class="grid size-full place-items-center">
            <S3GeneIcon v-if="genes[1]" :gene="genes[1]" size="size-full" />
            <div v-else>+</div>
          </div>
          <div class="grid size-full place-items-center">
            <S3GeneIcon v-if="genes[2]" :gene="genes[2]" size="size-full" />
            <div v-else>+</div>
          </div>

          <div class="grid size-full place-items-center">
            <S3GeneIcon v-if="genes[3]" :gene="genes[3]" size="size-full" />
            <div v-else>+</div>
          </div>
          <div class="grid size-full place-items-center">
            <S3GeneIcon v-if="genes[4]" :gene="genes[4]" size="size-full" />
            <div v-else>+</div>
          </div>
          <div class="grid size-full place-items-center">
            <S3GeneIcon v-if="genes[5]" :gene="genes[5]" size="size-full" />
            <div v-else>+</div>
          </div>

          <div class="grid size-full place-items-center">
            <S3GeneIcon v-if="genes[6]" :gene="genes[6]" size="size-full" />
            <div v-else>+</div>
          </div>
          <div class="grid size-full place-items-center">
            <S3GeneIcon v-if="genes[7]" :gene="genes[7]" size="size-full" />
            <div v-else>+</div>
          </div>
          <div class="grid size-full place-items-center">
            <S3GeneIcon v-if="genes[8]" :gene="genes[8]" size="size-full" />
            <div v-else>+</div>
          </div>
        </div>
      </div>

      <!-- bonuses -->
      <div class="@container flex flex-1 flex-col gap-1 self-start">
        <h3 class="text-lg font-semibold">Bingo Bonus</h3>

        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-1">
            <span class="font-semibold" v-text="totalBingoCount" />
            <span v-text="totalBingoCount === 1 ? 'Bingo' : 'Bingos'" />
          </div>

          <div v-if="totalBingoCount > 0">
            <h4 class="font-semibold">Damage Done</h4>

            <div class="grid @sm:grid-cols-2 @sm:gap-x-12 @3xl:grid-cols-3">
              <div
                v-for="count in elementBingoCounts"
                :key="count.element"
                class="flex items-center justify-between gap-2"
              >
                <div class="flex items-center gap-1">
                  <ElementIcon :element="count.element" icon2 class="size-7.5" />
                  <ElementLabel :element="count.element" class="w-28" />
                </div>
                <AppTooltip :tooltip="`${count.count} ${count.count === 1 ? 'Bingo' : 'Bingos'}`">
                  <span class="w-10 text-right font-semibold">
                    +{{ getBingoBonus(count.count) * 100 }}%
                  </span>
                </AppTooltip>
              </div>

              <div
                v-for="count in typeBingoCounts"
                :key="count.type"
                class="flex items-center justify-between gap-2"
              >
                <div class="flex items-center gap-1">
                  <AttackTypeIcon :type="count.type" icon2 class="size-7.5 dark:invert" />
                  <AttackTypeLabel :type="count.type" class="w-28" />
                </div>
                <AppTooltip :tooltip="`${count.count} ${count.count === 1 ? 'Bingo' : 'Bingos'}`">
                  <span class="w-10 text-right font-semibold">
                    +{{ getBingoBonus(count.count) * 100 }}%
                  </span>
                </AppTooltip>
              </div>
            </div>
          </div>

          <div>
            <h4 class="font-semibold">Monstie Bonus</h4>

            <div class="grid @sm:grid-cols-2 @sm:gap-x-12 @3xl:grid-cols-3">
              <div
                v-for="bonus in build.monstie?.monstie?.bingoBonuses"
                :key="bonus.type"
                class="flex items-center justify-between gap-2"
                :class="{ 'text-dimmed': totalBingoCount < bonus.bingoCount }"
              >
                <div class="flex h-7.5 items-center gap-1">
                  <AppTooltip :tooltip="`Requires ${bonus.bingoCount} bingos to activate`">
                    <div class="w-7.5 text-center font-semibold" v-text="bonus.bingoCount" />
                  </AppTooltip>
                  <div v-text="formatBingoBonusType(bonus.type)" />
                </div>
                <div class="font-semibold" v-text="formatBingoBonusValue(bonus)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
