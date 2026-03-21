<script lang="ts" setup>
  const { title } = useAppConfig().seo;
  const headline = gameTypeToFullName('mhst1');

  useSeoMeta({
    titleTemplate: '',
    title: `${title} - Companion App For Monster Hunter Stories 1`,
    description:
      'Includes monster attack types and weaknesses, egg patterns, monstie locations and retreat conditions',
  });

  defineOgImage(
    'Title',
    {
      title,
      description: `Companion App For ${gameTypeToFullLabel('mhst1')}`,
      lines: ['Eggs', 'Monsters', 'Attack Patterns'],
      game: 'mhst1',
    },
    [{ key: 'og' }, { key: 'whatsapp', width: 800, height: 800 }]
  );
</script>

<template>
  <div>
    <UPageHeader
      :title="title"
      description="Monster Buddy is a companion app for Monster Hunter Stories 1 that can help you learn or remember information useful during combat and general gameplay. It's not a complete guide, walkthrough or advanced character / gene planner (yet). You can use it for all versions like the Remastered, iOS, Android and original on the Nintendo 3DS."
      :headline="headline"
    />

    <UPageBody>
      <UPageGrid>
        <UPageCard to="/1/monsters" title="Monster list" :ui="{ container: 'sm:p-4' }">
          <template #description>
            <ProseUl class="my-0">
              <ProseLi>Attack patterns</ProseLi>
              <ProseLi>Elemental weaknesses</ProseLi>
            </ProseUl>
          </template>
        </UPageCard>

        <UPageCard to="/1/monsties" title="Monstie list" :ui="{ container: 'sm:p-4' }">
          <template #description>
            <ProseUl class="my-0">
              <ProseLi>Attack tendencies</ProseLi>
              <ProseLi>Retreat conditions</ProseLi>
              <ProseLi>Locations</ProseLi>
              <ProseLi>Stats</ProseLi>
            </ProseUl>
          </template>
        </UPageCard>

        <UPageCard to="/1/eggs" title="Visual egg list" :ui="{ container: 'sm:p-4' }">
          <template #description>
            <ProseUl class="my-0">
              <ProseLi>Search</ProseLi>
              <ProseLi>Sorting</ProseLi>
              <ProseLi>Filtering</ProseLi>
            </ProseUl>
          </template>
        </UPageCard>
      </UPageGrid>
    </UPageBody>
  </div>
</template>
