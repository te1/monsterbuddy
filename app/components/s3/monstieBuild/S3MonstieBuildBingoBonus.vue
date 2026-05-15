<script lang="ts" setup>
  import type { MonstieBuild } from '~/services/3/monstieBuilds';
  import { useMonstieBuildBingos } from '~/composables/3/useMonstieBuildBingos';
  import { formatBingoBonusType, formatBingoBonusValue } from '~/services/3/presentation';

  const props = defineProps<{ build: MonstieBuild }>();

  const { elementBingoCounts, typeBingoCounts, totalBingoCount } = useMonstieBuildBingos(
    () => props.build
  );

  function getBingoBonus(count: number) {
    const bonuses = [0.0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5];
    return bonuses[count] ?? 0.0;
  }
</script>

<template>
  <div class="@container flex w-full flex-1 flex-col gap-1 self-start">
    <h3 class="text-lg font-semibold">Bingo Bonus</h3>

    <div class="flex flex-col gap-3">
      <div class="flex items-center gap-1">
        <span class="font-semibold" v-text="totalBingoCount" />
        <span v-text="totalBingoCount === 1 ? 'Bingo' : 'Bingos'" />
      </div>

      <div v-if="totalBingoCount > 0">
        <h4 class="font-semibold">Damage Done</h4>

        <div class="grid @md:grid-cols-2 @md:gap-x-12 @3xl:grid-cols-3">
          <div
            v-for="count in elementBingoCounts"
            :key="count.element"
            class="flex items-center justify-between gap-2"
          >
            <div class="flex items-center gap-1">
              <ElementIcon :element="count.element" icon2 class="-ml-1.5 size-7.5" />
              <ElementLabel :element="count.element" class="w-28" />
            </div>
            <AppTooltip
              :tooltip="`${count.count} ${count.count === 1 ? 'Bingo' : 'Bingos'}`"
              :content="{ side: 'top' }"
            >
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
              <AttackTypeIcon :type="count.type" icon2 class="-ml-1.5 size-7.5 dark:invert" />
              <AttackTypeLabel :type="count.type" class="w-28" />
            </div>
            <AppTooltip
              :tooltip="`${count.count} ${count.count === 1 ? 'Bingo' : 'Bingos'}`"
              :content="{ side: 'top' }"
            >
              <span class="w-10 text-right font-semibold">
                +{{ getBingoBonus(count.count) * 100 }}%
              </span>
            </AppTooltip>
          </div>
        </div>
      </div>

      <div v-if="build.monstie">
        <h4 class="font-semibold">Monstie Bonus</h4>

        <div class="grid @md:grid-cols-2 @md:gap-x-12 @3xl:grid-cols-3">
          <div
            v-for="bonus in build.monstie?.monstie?.bingoBonuses"
            :key="bonus.type"
            class="flex items-center justify-between gap-2"
            :class="{ 'text-dimmed': totalBingoCount < bonus.bingoCount }"
          >
            <div class="flex h-7.5 items-center gap-1">
              <AppTooltip
                :tooltip="`Requires ${bonus.bingoCount} bingos to activate`"
                :content="{ side: 'top' }"
              >
                <div class="w-6 font-semibold" v-text="bonus.bingoCount" />
              </AppTooltip>
              <div v-text="formatBingoBonusType(bonus.type)" />
            </div>
            <div class="font-semibold" v-text="formatBingoBonusValue(bonus)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
