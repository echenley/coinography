module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jest/recommended',
    'plugin:flowtype/recommended',
  ],
  env: {
    node: true,
    es6: true,
    'jest/globals': true,
  },
  parser: 'babel-eslint',
  plugins: ['react', 'jest', 'flowtype'],
  rules: {
    'no-unused-vars': 'error',
    'react/jsx-sort-props': 'error',
  },
  globals: {
    fetch: true,
  },
}
