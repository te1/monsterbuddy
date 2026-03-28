<script lang="ts" setup>
  const { title } = useAppConfig().seo;
</script>

<template>
  <UFooter :ui="{ container: 'py-2', center: 'flex-col gap-2' }">
    <div class="max-w-4xl text-center text-sm text-pretty text-toned dark:text-muted">
      <AppNuxtLink to="/" :text="title" plain /> is a companion app for
      <AppLink href="https://www.capcom.com" text="Capcom's" plain bare />
      Monster Hunter Stories games. This project is not affiliated with or endorsed by Capcom or the
      Monster Hunter brand. All trademarks referenced herein are the properties of their respective
      owners.
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
