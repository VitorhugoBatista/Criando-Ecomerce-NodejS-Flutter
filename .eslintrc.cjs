module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: false,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    eqeqeq: 'off',
    'no-console': 'off',
  },
};
