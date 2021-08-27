<template>
  <div>
    <div
      class="leading-tight text-gray-500 dark:text-cool-400"
      v-text="info"
    />
    <div
      class="text-base font-semibold leading-snug"
      v-text="monster.name"
    />

    <template v-if="showLocation || showRarity">
      <div v-text="monster.genus" />
      <div v-text="monster.habitat" />

      <div
        v-if="showLocation && location"
        v-text="location"
      />

      <div v-if="showRarity">
        Rarity <span
          class="font-bold"
          v-text="monster.rarity"
        />
      </div>
    </template>

    <template v-if="showCoopQuests">
      <div
        v-for="coopQuest in coopQuests"
        :key="coopQuest"
      >
        {{ coopQuest }}
      </div>
    </template>

    <template v-if="showEldersLairFloors">
      <div
        v-for="floor in eldersLairFloors"
        :key="floor"
      >
        Elder's Lair - {{ floor }}
      </div>
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

    <div v-if="showStats">
      <div v-if="hasStats">
        HP <span
          class="font-bold"
          :class="getStatClass('base.maxHp')"
          v-text="monster.monstie.stats.base.maxHp"
        />,
        Speed <span
          class="font-bold"
          :class="getStatClass('base.speed')"
          v-text="monster.monstie.stats.base.speed"
        />,
        Crit <span
          class="font-bold"
          :class="getStatClass('base.critRate')"
          v-text="monster.monstie.stats.base.critRate"
        />
      </div>

      <div v-if="monster.monstie.stats.bestAttack">
        Attack
        <span
          class="font-bold"
          :class="getStatClass('bestAttack.value')"
          v-text="monster.monstie.stats.bestAttack.value"
        />
      </div>

      <div v-if="defense">
        Defense
        <span
          class="font-bold"
          :class="getStatClass('bestDefense.value', 'otherDefense.value', 'worstDefense.value')"
          v-text="defense"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  import { mapStores } from 'pinia';
  import useMonstieFilter from '~/stores/monstieFilter';
  import {
    formatMonsterInfo,
    formatMonsterPrimaryLocation,
    formatCoopQuest,
    parseSomeMarkdown,
  } from '~/services/utils';
  import { coopQuests, getMonsterLocations } from '~/services/data';

  export default {
    name: 'MonstieListItemContent',

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
      ...mapStores(useMonstieFilter),

      info() {
        return formatMonsterInfo(this.monster);
      },

      location() {
        return formatMonsterPrimaryLocation(this.monster);
      },

      coopQuests() {
        let locations = _.take(getMonsterLocations(this.monster, 'coopQuest'), 3);

        let quests = _.map(locations, (location) => {
          return _.find(coopQuests, { name: location.main });
        });

        return _.map(quests, formatCoopQuest);
      },

      eldersLairFloors() {
        let locations = _.take(
          getMonsterLocations(this.monster, 'eldersLair'),
          3
        );

        return _.map(locations, 'main');
      },

      retreat() {
        return parseSomeMarkdown(this.monster?.monstie?.retreat);
      },

      hasStats() {
        return (
          this.monster?.monstie?.growth && this.monster?.monstie?.growth !== '?'
        );
      },

      defense() {
        let result = [];

        if (this.monster?.monstie?.stats?.bestDefense) {
          result.push(this.monster.monstie.stats.bestDefense.value);
        }

        if (this.monster?.monstie?.stats?.otherDefense) {
          result.push(this.monster.monstie.stats.otherDefense.value);
        }

        if (this.monster?.monstie?.stats?.worstDefense) {
          result.push(this.monster.monstie.stats.worstDefense.value);
        }

        return result.join(' / ');
      },

      showLocation() {
        return _.includes(['location'], this.mode);
      },

      showCoopQuests() {
        return _.includes(['location-coop'], this.mode);
      },

      showEldersLairFloors() {
        return _.includes(['location-eldersLair'], this.mode);
      },

      showRidingActions() {
        return _.includes(['ridingActions'], this.mode);
      },

      showRetreat() {
        return _.includes(['retreat'], this.mode);
      },

      showRarity() {
        return _.includes(['rarity'], this.mode);
      },

      showStats() {
        return _.includes(['stats'], this.mode);
      },
    },

    methods: {
      getStatClass(...statKeys) {
        if (!_.isArray(statKeys)) {
          statKeys = [statKeys];
        }
        statKeys = _.map(statKeys, (statKey) => 'monstie.stats.' + statKey);

        if (_.includes(statKeys, this.monstieFilter.sortKey)) {
          return ['text-brand-600', 'dark:text-brand-400'];
        }
        return null;
      },
    },
  };
</script>
