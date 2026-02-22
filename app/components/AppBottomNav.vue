<script lang="ts" setup>
  import type { DropdownMenuItem, NavigationMenuItem } from '@nuxt/ui';

  type NavigationMenuItemWithDropdown = NavigationMenuItem & {
    items?: DropdownMenuItem[];
  };

  function typeNavItem(item: unknown): NavigationMenuItemWithDropdown {
    return item as NavigationMenuItemWithDropdown;
  }

  const path = computed(() => useRoute().path);
  const gameType = computed(() => routePathToGameType(path.value));
  const navItems = computed(() => patchNavItemsForBottomNav(getNavItems(path.value)));
</script>

<template>
  <UHeader
    v-if="gameType !== 'none'"
    as="div"
    title=""
    :toggle="false"
    class="lg:hidden"
    :ui="{ root: 'top-auto bottom-0 border-t border-b-0', center: 'flex' }"
  >
    <UNavigationMenu :items="navItems" variant="link">
      <template #more="{ item }">
        <UDropdownMenu as="span" :modal="false" class="p-0" :items="typeNavItem(item).items">
          <UButton :label="typeNavItem(item).label" color="neutral" variant="link" />
        </UDropdownMenu>
      </template>
    </UNavigationMenu>
  </UHeader>
</template>
