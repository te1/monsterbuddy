<template>
  <div class="flex items-center h-[122px]">
    <div class="w-[120px] h-[120px] -mx-3 flex flex-col gap-2 items-center justify-center">
      <MonsterIcon :monster="monster" />

      <div class="flex gap-1 items-center">
        <AttackTypeIcon
          class="w-8 h-8"
          :monster="monster"
        />

        <ElementIcon
          class="w-8 h-8"
          :element="attackElement"
        />
      </div>
    </div>

    <div class="ml-3 text-sm whitespace-nowrap">
      <div
        class="text-gray-500 -mb-0.5"
        v-text="info"
      />
      <div
        class="text-base font-semibold"
        v-text="monster.name"
      />
      <div v-text="monster.genus" />
      <div v-text="monster.habitat" />
      <div
        :class="{ 'opacity-0': !hasLocation }"
        v-text="location"
      />
    </div>

    <MonsterImage
      class="w-auto h-full ml-auto object-contain overflow-hidden"
      :monster="monster"
      hideFallback
    />
  </div>
</template>

<script>
  import { getMonstieAttackElement } from '~/services/data';
  import { formatMonsterInfo, formatMonsterLocation } from '~/services/utils';

  export default {
    name: 'MonstieCard',

    props: {
      monster: {
        type: Object,
        required: true,
      },
    },

    computed: {
      attackElement() {
        return getMonstieAttackElement(this.monster);
      },

      info() {
        return formatMonsterInfo(this.monster);
      },

      location() {
        return formatMonsterLocation(this.monster);
      },

      hasLocation() {
        return this.location !== '-';
      },
    },
  };
</script>
