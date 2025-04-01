import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tanstackQueryPlugin from "@tanstack/eslint-plugin-query";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  eslintPluginPrettier,
  {
    files: ["**/*.{js,jsx,ts,tsx}"], // 적용 대상 파일 명시
    plugins: {
      "@tanstack/query": tanstackQueryPlugin,
    },
    rules: {
      ...tanstackQueryPlugin.configs.recommended.rules, // 추천 규칙 적용
    },
  },
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/jsx-props-no-spreading": "off",
      "react/require-default-props": "off",
      // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md
      "react/function-component-definition": [
        "error",
        {
          namedComponents: ["arrow-function", "function-declaration"],
          unnamedComponents: "function-expression",
        },
      ],
      // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/label-has-associated-control.md
      "jsx-a11y/label-has-associated-control": [
        "error",
        {
          assert: "either",
        },
      ],
      "import/prefer-default-export": "off",
      "import/no-extraneous-dependencies": [
        "warn",
        { bundledDependencies: false },
      ],
      "import/order": [
        "error",
        {
          "newlines-between": "never",
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "unknown",
          ],
          pathGroups: [
            {
              pattern: "react",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "next/*",
              group: "builtin",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: [],
          alphabetize: {
            order: "asc",
          },
        },
      ],
      "no-plusplus": "off",
    },
  }),
];

export default eslintConfig;
