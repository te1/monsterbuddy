<script lang="ts" setup>
  const { title } = useAppConfig().seo;
</script>

<template>
  <UFooter :ui="{ container: 'py-2', center: 'flex-col gap-2' }">
    <!-- prettier-ignore -->
    <div class="text-center text-pretty text-toned dark:text-muted text-sm">
      <AppNuxtLink to="/" plain>{{ title }}</AppNuxtLink> is a companion app for
      <span class="whitespace-nowrap">
        <AppLink href="https://www.capcom.com" plain bare>Capcom</AppLink>'s
      </span>
      Monster Hunter Stories games. This project is not affiliated with or endorsed by
      Capcom or the Monster Hunter brand. All trademarks referenced herein are the
      properties of their respective owners.
    </div>

    <UTooltip :text="`${title} on GitHub`">
      <UButton
        color="neutral"
        variant="link"
        icon="i-simple-icons-github"
        to="https://github.com/te1/monsterbuddy"
        target="_blank"
        :aria-label="`${title} on GitHub`"
      />
    </UTooltip>
  </UFooter>
</template>
