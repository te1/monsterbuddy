<template>
  <div class="flex items-center h-[122px]">
    <div class="w-[120px] h-[120px] -mx-3 flex-shrink-0 flex flex-col gap-2 items-center justify-center">
      <MonsterIcon :monster="monster" />

      <div class="flex gap-1 items-center">
        <AttackTypeIcon
          class="w-8 h-8"
          :monster="monster"
        />

        <ElementIcon
          class="w-8 h-8"
          :element="monster.monstie.attackElement"
        />
      </div>
    </div>

    <div class="mt-3 ml-3 text-sm whitespace-nowrap self-start">
      <div
        class="leading-tight text-gray-500 dark:text-cool-400"
        v-text="info"
      />
      <div
        class="text-base font-semibold leading-snug"
        v-text="monster.name"
      />

      <template v-if="showLocation">
        <div v-text="monster.genus" />
        <div v-text="monster.habitat" />
        <div v-text="location" />
      </template>

      <!-- eslint-disable vue/no-v-html -->
      <div
        v-if="showRetreat"
        class="whitespace-normal"
        v-html="retreat"
      />

      <div
        v-if="showRidingActions"
        class="whitespace-normal"
      >
        <span
          v-for="(action, index) in monster.monstie.ridingActions"
          :key="action"
        >
          {{ action }}<span v-if="index+1 < monster.monstie.ridingActions.length">, </span>
        </span>
      </div>

      <div
        v-if="showStats"
        class="tracking-tighter"
      >
        <div v-if="hasStats">
          HP <span
            class="font-semibold"
            v-text="monster.monstie.stats.base.maxHp"
          />,
          Speed <span
            class="font-semibold"
            v-text="monster.monstie.stats.base.speed"
          />,
          Crit <span
            class="font-semibold"
            v-text="monster.monstie.stats.base.critRate"
          />
        </div>

        <div v-if="monster.monstie.stats.bestAttack">
          Atk
          <span
            class="font-semibold"
            v-text="monster.monstie.stats.bestAttack.value"
          />
          <ElementLabel
            :element="monster.monstie.stats.bestAttack.element"
            justText
          />
        </div>

        <div v-if="monster.monstie.stats.worstDefense">
          Def
          <span
            class="font-semibold"
            v-text="monster.monstie.stats.worstDefense.value"
          />
          <ElementLabel
            :element="monster.monstie.stats.worstDefense.element"
            justText
          />
        </div>
      </div>
    </div>

    <MonsterImage
      class="w-full h-full p-2 object-contain object-right"
      :monster="monster"
      hideFallback
    />
  </div>
</template>

<script>
  import _ from 'lodash';
  import {
    formatMonsterInfo,
    formatMonsterPrimaryLocation,
    parseSomeMarkdown,
  } from '~/services/utils';

  export default {
    name: 'MonstieListItem',

    props: {
      monster: {
        type: Object,
        required: true,
      },

      mode: {
        type: String,
        required: false,
        default: 'location',
      },
    },

    computed: {
      info() {
        return formatMonsterInfo(this.monster);
      },

      location() {
        return formatMonsterPrimaryLocation(this.monster);
      },

      retreat() {
        return parseSomeMarkdown(this.monster?.monstie?.retreat);
      },

      hasStats() {
        return (
          this.monster?.monstie?.growth && this.monster?.monstie?.growth !== '?'
        );
      },

      showLocation() {
        return _.includes(['location'], this.mode);
      },

      showRidingActions() {
        return _.includes(['ridingActions'], this.mode);
      },

      showRetreat() {
        return _.includes(['retreat'], this.mode);
      },

      showStats() {
        return _.includes(['stats'], this.mode);
      },
    },
  };
</script>
