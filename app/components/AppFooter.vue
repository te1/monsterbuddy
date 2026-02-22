<script lang="ts" setup>
  const { title } = useAppConfig().seo;
</script>

<template>
  <UFooter :ui="{ container: 'py-2', center: 'flex-col gap-2' }">
    <!-- prettier-ignore -->
    <div class="text-center text-balance text-muted text-sm">
      <PrettyNuxtLink to="/" plain>{{ title }}</PrettyNuxtLink> is a companion app for
      <span class="whitespace-nowrap">
        <PrettyLink href="https://www.capcom.com" plain bare>Capcom</PrettyLink>'s
      </span>
      Monster Hunter Stories games. This project is not affiliated with or endorsed by
      Capcom or the Monster Hunter brand. All trademarks referenced herein are the
      properties of their respective owners.
    </div>

    <UButton
      color="neutral"
      variant="link"
      icon="i-simple-icons-github"
      to="https://github.com/te1/monsterbuddy"
      target="_blank"
      :title="`${title} on GitHub`"
      :aria-label="`${title} on GitHub`"
    />
  </UFooter>
</template>
