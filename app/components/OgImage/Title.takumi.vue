<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      title: string;
      description?: string;
      lines?: string[];
      game?: GameType;
    }>(),
    {
      description: '',
      lines: () => [],
      game: 'mhst2',
    }
  );

  const icon = computed(() => {
    switch (props.game) {
      case 'mhst1':
        return 'app1.png';

      case 'mhst2':
        return 'app2.png';

      case 'mhst3':
        return 'app3.png';

      default:
        return 'app2.png';
    }
  });

  function prettyLine(line: string): string {
    return line
      .replace('**', '<span class="font-semibold text-sky-500 dark:text-sky-400 mr-2">')
      .replace('**', '</span>');
  }
</script>

<template>
  <div
    class="flex size-full flex-col justify-between bg-default px-10 py-5 text-default lg:pt-20 lg:pb-10"
    :style="{
      backgroundImage: 'linear-gradient(to top left, oklch(14.8% 0.004 228.8), transparent)',
    }"
  >
    <section class="flex flex-col gap-6 font-medium text-pretty lg:gap-3">
      <h1 class="text-[110px] leading-tight lg:text-[80px]">
        {{ title }}
      </h1>

      <p v-if="description" class="text-7xl leading-tight text-primary lg:text-5xl">
        {{ description }}
      </p>
    </section>

    <ul v-if="lines.length > 0" class="hidden flex-col gap-6 text-5xl text-toned lg:flex">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <li v-for="line in lines" :key="line" v-html="prettyLine(line)" />
    </ul>
  </div>

  <img
    :src="`/${icon}`"
    alt="Icon"
    class="absolute right-[-300px] bottom-[-300px] size-[700px] -rotate-23 opacity-60"
  />
</template>
