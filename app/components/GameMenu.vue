<template>
  <UDropdownMenu
    v-slot="{ open }"
    :modal="false"
    :items="[
      {
        label: '1',
        to: '/1',
      },
      {
        label: '2',
        to: '/2',
      },
      {
        label: '3',
        to: '/3',
        color: 'primary',
        checked: true,
        type: 'checkbox',
      },
    ]"
    :content="{ align: 'start' }"
    :ui="{ content: 'min-w-fit' }"
    size="xs"
  >
    <UButton
      label="Game"
      variant="subtle"
      trailingIcon="i-lucide-chevron-down"
      size="xs"
      class="-mb-1.5 truncate rounded-full font-semibold"
      :class="[open && 'bg-primary/15']"
      :ui="{
        trailingIcon: ['transition-transform duration-200', open ? 'rotate-180' : undefined]
          .filter(Boolean)
          .join(' '),
      }"
    />
  </UDropdownMenu>
</template>
