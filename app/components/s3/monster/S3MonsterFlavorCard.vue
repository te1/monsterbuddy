<script lang="ts" setup>
  import type { Monster } from '~/services/3/types';

  const props = defineProps<{ monster: Monster }>();

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
    v-if="flavorTexts.length > 0 || mutationRequirements.length > 0"
    class="flex flex-col gap-3 text-toned"
  >
    <div v-for="flavor in flavorTexts" :key="flavor.label">
      <strong v-if="flavor.label !== 'DEFAULT'" class="font-medium text-default">
        {{ flavor.label }}:
      </strong>

      {{ flavor.text }}
    </div>

    <div v-if="mutationRequirements.length > 0">
      <div class="font-medium">Mutation Requirements</div>

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
