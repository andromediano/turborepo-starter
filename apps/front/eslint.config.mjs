import baseConfig from "@repo/eslint-config/eslint.config.mjs";

/** @type {import('eslint').Linter.FlatConfig[]} */
const eslintConfig = [
  ...baseConfig,
  // any project-specific overrides can go here
];

export default eslintConfig;
