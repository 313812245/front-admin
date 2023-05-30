/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-standard',
    './.eslintrc-auto-import.json'
  ],
  globals: {
    Table: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 'latest'
  },
  env: {
    node: true,
    browser: true,
    commonjs: true,
    amd: true
  },
  rules: {
    'vue/comment-directive': 0,
    'vue/multi-word-component-names': ['error', {
      ignores: []
    }]
  }
}
