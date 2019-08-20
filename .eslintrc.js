module.exports = {
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'standard-react',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  plugins: ['react', 'babel', 'prettier'],
  rules: {
    'object-curly-spacing': [1, 'always'],
    'require-jsdoc': 'off',
    'babel/semi': 1,
    'no-invalid-this': 0,
    'babel/no-invalid-this': 1,
    'prettier/prettier': 'error',
    'react/jsx-boolean-value': [1, 'always'],
  },
};
