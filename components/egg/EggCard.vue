<template>
  <div class="flex h-[122px]">
    <EggImage
      class="w-[120px] h-auto -mx-3"
      :monster="monster"
    />

    <div class="flex-1 min-w-[160px] ml-1 text-sm">
      <div class="flex items-center gap-2 pt-1 text-gray-500 -mb-0.5">
        <span class="w-4" />
        <span v-text="info" />
      </div>

      <div class="flex items-center gap-2 text-base font-semibold">
        <span class="w-4" />
        <span v-text="monster.name " />
      </div>

      <div class="flex items-center gap-2 justify-items-start">
        <FaIcon
          class="!w-4 text-gray-600"
          title="Genus"
          :icon="['fas', 'dna']"
        />
        <span v-text="monster.genus" />
      </div>

      <div class="flex items-center gap-2 justify-items-start">
        <FaIcon
          class="!w-4 text-gray-600"
          title="Habitat"
          :icon="['fas', 'map-marker-alt']"
        />
        <span v-text="monster.habitat" />
      </div>

      <div
        v-if="dens"
        class="flex items-center gap-2 justify-items-start"
      >
        <FaIcon
          class="!w-4 text-gray-600"
          title="Den"
          :icon="['fas', 'mountain']"
        />
        <span v-text="dens" />
      </div>
    </div>

    <MonsterImage
      class="w-auto h-full object-contain overflow-hidden pr-2"
      :monster="monster"
    />
  </div>
</template>

<script>
  import { formatNo } from '~/services/utils';
  import { isSubspecies, isDeviant, isElementalVariant } from '~/services/data';

  export default {
    name: 'EggCard',

    props: {
      monster: {
        type: Object,
        required: true,
      },
    },

    computed: {
      eggImageUrl() {
        try {
          return require(`~/assets/eggs/${this.monster.name}.svg`);
        } catch (e) {
          return require('~/assets/eggs/_Unknown.svg');
        }
      },

      info() {
        let result = formatNo(this.monster.no);

        if (isSubspecies(this.monster)) {
          result += ', Subspecies';
        }

        if (isDeviant(this.monster)) {
          result += ', Deviant';
        }

        if (isElementalVariant(this.monster)) {
          result += ', Elemental variant';
        }

        return result;
      },

      dens() {
        if (this.monster.dens && this.monster.dens.length) {
          return this.monster.dens.join(', ');
        }
        return null;
      },
    },
  };
</script>
