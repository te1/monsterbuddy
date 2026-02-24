<script setup lang="ts">
  import { createReusableTemplate } from '@vueuse/core';

  const appConfig = useAppConfig();

  const [DefineButtonTemplate, ReuseButtonTemplate] = createReusableTemplate();

  const open = ref(false);
  const search = ref('');

  const { data: users, status } = await useFetch('https://jsonplaceholder.typicode.com/users', {
    key: 'command-palette-users',
    params: { q: search },
    transform: (data: { id: number; name: string; email: string }[]) => {
      return (
        data?.map((user) => ({
          id: user.id,
          label: user.name,
          suffix: user.email,
          avatar: { src: `https://i.pravatar.cc/120?img=${user.id}` },
        })) || []
      );
    },
    lazy: true,
  });

  const groups = computed(() => [
    {
      id: 'users',
      label: search.value ? `Users matching “${search.value}”...` : 'Users',
      items: users.value || [],
      ignoreFilter: true,
    },
  ]);

  defineShortcuts({
    meta_k: () => (open.value = !open.value),
  });
</script>

<template>
  <DefineButtonTemplate>
    <UButton
      :icon="appConfig.ui.icons.search"
      color="neutral"
      variant="ghost"
      aria-label="Search"
    />
  </DefineButtonTemplate>

  <UModal v-model:open="open">
    <ReuseButtonTemplate v-if="open" />

    <UTooltip v-else text="Search" :kbds="['meta', 'k']">
      <ReuseButtonTemplate />
    </UTooltip>

    <template #content>
      <UCommandPalette
        v-model:searchTerm="search"
        :loading="status === 'pending'"
        :groups="groups"
        placeholder="Search users..."
        class="h-80"
      />
    </template>
  </UModal>
</template>
