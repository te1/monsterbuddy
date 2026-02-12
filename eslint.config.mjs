// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default withNuxt(
  {
    'vue/attribute-hyphenation': ['error', 'never'],
  },
  // Your custom configs here
  eslintConfigPrettier
);
