<template>
  <UDropdownMenu
    v-slot="{ open }"
    :modal="false"
    :items="[
      {
        label: 'Stories 1',
        to: '/1',
      },
      {
        label: 'Stories 2',
        to: '/2',
      },
      {
        label: 'Stories 3',
        to: '/3',
        color: 'primary',
      },
    ]"
    :ui="{ content: 'min-w-fit' }"
  >
    <UButton
      label="Game"
      color="neutral"
      variant="subtle"
      trailingIcon="i-lucide-chevron-down"
      class="truncate font-semibold"
      :class="[open && 'bg-primary/15']"
      :ui="{
        trailingIcon: ['transition-transform duration-200', open ? 'rotate-180' : undefined]
          .filter(Boolean)
          .join(' '),
      }"
    />
  </UDropdownMenu>
</template>
