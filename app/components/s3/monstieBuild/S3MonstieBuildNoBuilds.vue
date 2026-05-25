<template>
  <div class="box flex min-h-[246px] flex-col items-center justify-center gap-6 px-3 py-6">
    <span class="text-center text-2xl font-medium">
      <slot>No builds created</slot>
    </span>

    <UIcon class="h-16 w-16 text-dimmed" name="ph:file-dashed-thin" />

    <!-- TODO increase contrast -->
    <UButton
      color="neutral"
      variant="soft"
      class="w-32"
      trailingIcon="ph:list-plus"
      label="New build"
      :ui="{ base: 'justify-between font-normal', trailingIcon: 'text-dimmed' }"
      to="/3/builds/monstie/edit?op=new"
    />
  </div>
</template>
