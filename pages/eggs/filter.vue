<template>
  <div class="space-y-3">
    <section class="box px-4 py-3 flex flex-col space-y-3">
      <h3 class="text-lg font-semibold">
        Quick Info
      </h3>

      <div
        v-for="mode in modes"
        :key="mode.value"
        class="flex items-center cursor-pointer select-none"
        @click="store.mode = mode.value"
      >
        <label
          class="flex-1 cursor-pointer"
          v-text="mode.caption"
        />

        <div class="w-[180px]">
          <FaIcon
            v-if="store.mode === mode.value"
            :icon="['fas', 'check']"
          />
        </div>
      </div>
    </section>

    <MonsterFilter
      showAttackTypeFilter
      showAttackElementFilter
      showRidingActionFilter
    />

    <section class="flex gap-2 justify-center">
      <NuxtLink to="/eggs/">
        <AppTextButton>
          Apply
        </AppTextButton>
      </NuxtLink>

      <AppTextButton @click="store.resetFilterAndSort">
        Reset
      </AppTextButton>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'PageEggsFilter',

    inject: ['useFilterStore'],

    computed: {
      store() {
        return this.useFilterStore();
      },

      modes() {
        return [
          { value: 'compact', caption: 'Compact' },
          { value: 'location', caption: 'Location' },
          { value: 'ridingActions', caption: 'Riding Actions' },
          { value: 'retreat', caption: 'Retreat' },
        ];
      },
    },
  };
</script>
