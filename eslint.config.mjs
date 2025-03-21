import eslint from '@eslint/js';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.all,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    ...jsxA11y.flatConfigs.strict,
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: './',
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-imports': 'error',
      // _ is used for unused parameters to array functors
      'id-length': ['error', { exceptions: ['_'] }],
      'no-magic-numbers': 'off',
      'no-ternary': 'off',
      'no-undefined': 'off',
      'one-var': ['error', 'never'],
    },
  },
);
