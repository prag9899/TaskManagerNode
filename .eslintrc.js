module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true
  },
  parserOptions: {
    ecmaVersion: 2021,   // <- modern JS
    sourceType: 'module'  // <- allows import/export if you use them
  },
  extends: 'eslint:recommended',
  rules: {
    'no-console': 'off'
  }
};
