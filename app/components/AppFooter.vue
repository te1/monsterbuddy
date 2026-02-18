<template>
  <UFooter :ui="{ center: 'flex-col gap-2' }">
    <!-- prettier-ignore -->
    <div class="text-center text-balance text-muted">
      <PrettyNuxtLink to="/" plain>Monster Buddy</PrettyNuxtLink> is a companion app for
      <PrettyLink href="https://www.capcom.com" plain bare>Capcom</PrettyLink>'s
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
      title="Monster Buddy on GitHub"
      aria-label="Monster Buddy on GitHub"
    />
  </UFooter>
</template>
