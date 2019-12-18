module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: "airbnb-base",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    "no-unused-vars": "off",
    "linebreak-style": "off",
    "no-console": "off",
    "no-new": "off",
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
  }
};
