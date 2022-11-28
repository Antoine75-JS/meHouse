/* eslint-disable prettier/prettier */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['react', '@typescript-eslint'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.jsx', '.tsx', '.ts', 'js'],
      },
    },
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
      },
    ],
  },
  rules: {
    'max-len': [1, { code: 120 }],
    'brace-style': [
      'error',
      'stroustrup',
      {
        allowSingleLine: true,
      },
    ],
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    'no-mixed-operators': [
      'error',
      {
        allowSamePrecedence: true,
      },
    ],
    'jsx-quotes': ['error', 'prefer-double'],
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/href-no-hash': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/mouse-events-have-key-events': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'react/jsx-filename-extension': 'off',
    'react/forbid-prop-types': 'off',
    'react/no-access-state-in-setstate': 'warn',
    'react/jsx-one-expression-per-line': 'off',
    // if using React 17+; otherwise, turn this on
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'warn',
    'react/jsx-use-react': 'off',
    'react/require-default-props': 'warn',
    'react/destructuring-assignment': 'warn',
    'react/no-unescaped-entities': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/state-in-constructor': 'off',
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'no-console': 'off',
    'space-before-function-paren': 'off',
    'comma-dangle': 'off',
    'func-names': 'off',
    'no-unused-vars': 'warn',
    'object-shorthand': 'off',
    'eol-last': 'error',
    'no-tabs': 'error',
  },
};
