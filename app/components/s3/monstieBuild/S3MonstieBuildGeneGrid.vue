<script lang="ts" setup>
  import type { MonstieBuild } from '~/services/3/monstieBuilds';
  import useMonstieBuildStore from '~/stores/3/monstieBuildStore';

  defineProps<{ build: MonstieBuild }>();

  const buildStore = useMonstieBuildStore();

  const {
    genes,
    row1Bingo,
    row2Bingo,
    row3Bingo,
    col1Bingo,
    col2Bingo,
    col3Bingo,
    diag1Bingo,
    diag2Bingo,
  } = storeToRefs(buildStore);

  function lineColor(bingo: boolean) {
    return bingo ? 'bg-gene-bingo' : 'bg-gene-grid';
  }
</script>

<template>
  <section class="@container">
    <div
      class="flex flex-col place-items-center gap-x-12 gap-y-6 @3xl:flex-row @3xl:place-items-start"
    >
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

      <S3MonstieBuildBingoBonus :build="build" />
    </div>
  </section>
</template>
