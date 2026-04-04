import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const nextCoreWebVitals = require('eslint-config-next/core-web-vitals');

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  {
    ignores: ['.next/**', 'node_modules/**', 'out/**'],
  },
  ...nextCoreWebVitals,
  {
    rules: {
      'react/no-unescaped-entities': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/purity': 'off',
      '@next/next/no-img-element': 'warn',
    },
  },
];

export default eslintConfig;
