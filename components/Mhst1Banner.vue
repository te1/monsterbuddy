<template>
  <client-only>
    <div
      v-show="show || force"
      class="note flex gap-3 bg-[#fef9c3] dark:bg-[#eab308]/25 px-4 py-3"
    >
      <div class="flex-1">
        Looking for info on
        <strong>Monster Hunter Stories 1 / Remake</strong> instead? Check out
        <a class="link" href="https://mhst1.monsterbuddy.app" target="_blank">
          Monster Buddy for MHST1</a
        >.
      </div>

      <div v-if="!force" class="-mt-3 -mr-3">
        <AppIconButton
          :icon="['fas', 'times']"
          title="Don't show this anymore"
          class="text-xl"
          @click="hide"
        />
      </div>
    </div>
  </client-only>
</template>

<script>
export default {
  name: 'Mhst1Banner',

  props: {
    force: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  computed: {
    history() {
      return this.$useHistoryStore();
    },

    show() {
      return this.history.showMhst1Banner;
    },
  },

  methods: {
    hide() {
      this.history.hideMhst1Banner();
    },
  },
};
</script>
