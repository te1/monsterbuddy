<script lang="ts" setup>
  import type { SkillBuffSize, SkillDebuff } from '~/services/3/types';
  import { formatSkillBuffTurns } from '~/services/3/presentation';
  import { getDebuff, getDebuffDetails } from '~/services/3/genes';

  const props = defineProps<{ debuff: SkillDebuff }>();

  const description = computed(() => {
    return getDebuff(props.debuff.type)?.description;
  });

  const sizes = computed<(SkillBuffSize | undefined)[]>(() => {
    if (props.debuff.size == null) {
      return [undefined];
    }

    if (props.debuff.size === 'stacking') {
      return ['S', 'M', 'L'];
    }

    return [props.debuff.size];
  });
</script>

<template>
  <div>
    <div class="space-x-1">
      <span v-text="debuff.type" />
      <S3BuffSize :size="debuff.size" />
      <span class="text-muted">on <S3SkillTarget :target="debuff.target" /></span>
      <span
        v-if="debuff.turns != null"
        class="text-muted"
        v-text="`(${formatSkillBuffTurns(debuff.turns)})`"
      />
    </div>

    <div v-if="description" class="ml-3 text-muted" v-text="description" />

    <template v-for="size in sizes" :key="size">
      <S3BuffDetail
        v-for="detail in getDebuffDetails(debuff.type, size)"
        :key="detail.type"
        :detail="detail"
        :showSize="debuff.size === 'stacking'"
        class="ml-3 text-muted"
      />
    </template>
  </div>
</template>
