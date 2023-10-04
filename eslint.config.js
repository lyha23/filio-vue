// eslint.config.js
const { sxzz } = require('@sxzz/eslint-config');

module.exports = sxzz(
  [
    /* your custom config */
  ],
  { vue: true, prettier: true, markdown: true, unocss: true },
);
