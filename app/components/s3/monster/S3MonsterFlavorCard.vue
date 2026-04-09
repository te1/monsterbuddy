<script lang="ts" setup>
  import type { Monster } from '~/services/3/types';

  const props = withDefaults(
    defineProps<{
      monster: Monster;
      mutationOnly?: boolean;
    }>(),
    {
      mutationOnly: false,
    }
  );

  const flavors = computed(() => {
    return Object.entries(props.monster.flavor ?? {}).map(([label, text]) => {
      return {
        label,
        text,
      };
    });
  });

  const flavorTexts = computed(() =>
    flavors.value.filter((flavor) => !flavor.label.startsWith('MUTATION'))
  );

  const mutationRequirements = computed(() =>
    flavors.value.filter((flavor) => flavor.label.startsWith('MUTATION'))
  );
</script>

<template>
  <section
    v-if="(flavorTexts.length > 0 && !mutationOnly) || mutationRequirements.length > 0"
    class="flex flex-col gap-3 text-toned"
  >
    <template v-if="!mutationOnly">
      <div v-for="flavor in flavorTexts" :key="flavor.label">
        <strong v-if="flavor.label !== 'DEFAULT'" class="font-semibold text-default">
          {{ flavor.label }}:
        </strong>

        {{ flavor.text }}
      </div>
    </template>

    <div v-if="mutationRequirements.length > 0">
      <div class="font-semibold">Mutation Requirements</div>

      <ProseUl>
        <ProseLi
          v-for="requirement in mutationRequirements"
          :key="requirement.label"
          class="leading-normal"
        >
          {{ requirement.text }}
        </ProseLi>
      </ProseUl>
    </div>
  </section>
</template>
