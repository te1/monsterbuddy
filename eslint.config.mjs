// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default withNuxt(
  {
    ignores: ['public/**', '.agents/**'],
  },
  {
    rules: {
      'vue/attribute-hyphenation': ['error', 'never'],
      'vue/v-on-event-hyphenation': ['error', 'never'],
    },
  },
  eslintConfigPrettier
);
