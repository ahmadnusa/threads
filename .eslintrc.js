module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['components/ui'],
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
  ],
  plugins: ['prettier', 'simple-import-sort', '@typescript-eslint'],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
}
