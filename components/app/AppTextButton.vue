<template>
  <div class="w-[80px] py-1 cursor-pointer select-none text text-center font-semibold tracking-wider uppercase hover:text-black dark:hover:text-white active:text-gray-500 dark:active:text-cool-400">
    <slot />
  </div>
</template>

<script>
  export default {
    name: 'AppTextButton',
  };
</script>
