<template>
  <UContainer>
    <UPage>
      <slot />

      <template #right>
        <ClientOnly>
          <UPageAside>
            <ProseH4>Bookmarked</ProseH4>
            <ProseUl>
              <ProseLi>...</ProseLi>
              <ProseLi>...</ProseLi>
              <ProseLi>...</ProseLi>
            </ProseUl>

            <ProseH4>Recent</ProseH4>
            <ProseUl>
              <ProseLi>...</ProseLi>
              <ProseLi>...</ProseLi>
              <ProseLi>...</ProseLi>
            </ProseUl>
          </UPageAside>
        </ClientOnly>
      </template>
    </UPage>
  </UContainer>
</template>
