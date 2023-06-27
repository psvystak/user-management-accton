/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'prettier',
    'plugin:vue/vue3-recommended',
    'airbnb-base',
  ],
  ignorePatterns: [
    'src/assets/images/icons/',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    'max-len': [
      'error',
      {
        code: 200,
        ignoreTemplateLiterals: true,
        ignoreStrings: true,
        ignorePattern: '(d||points)="([\\s\\S]*?)"',
      },
    ],
    'vue/valid-v-slot': ['error', {
      allowModifiers: true,
    }],
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'no-return-assign': 'off',
    'vue/v-slot-style': 'off',
    'quote-props': ['error', 'consistent'],
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state'],
      },
    ],
    'vue/no-v-html': 'warn',
    'linebreak-style': 0,
    'global-require': 0,
    'no-shadow': 'off',
    'no-unused-vars': 'off',
  },
  settings: {
    'import/core-modules': ['vue'],
  },
};
