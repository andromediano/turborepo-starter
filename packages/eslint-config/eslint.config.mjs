import eslint from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import tanstackQueryPlugin from "@tanstack/eslint-plugin-query";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import importPlugin from "eslint-plugin-import";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "**/.next/**",
      "**/dist/**",
      "**/.turbo/**",
      "**/node_modules/**",
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...reactPlugin.configs.flat.recommended,
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@next/next": nextPlugin,
      "@tanstack/query": tanstackQueryPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
      import: importPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      ...tanstackQueryPlugin.configs.recommended.rules,
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Rules from old compat config
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/jsx-props-no-spreading": "off",
      "react/require-default-props": "off",
      "react/function-component-definition": [
        "error",
        {
          namedComponents: ["arrow-function", "function-declaration"],
          unnamedComponents: "function-expression",
        },
      ],
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
            "builtin", // Node.js 내장 모듈
            "external", // npm 패키지
            "internal", // 절대 경로 alias (@/components, ...)
            //"type", // 타입 import (import type)
            ["parent", "sibling"], // 상대 경로
            "index",
            "unknown",
          ],
          pathGroups: [
            //{ pattern: "react", group: "builtin", position: "before" },
            //{ pattern: "next/*", group: "builtin", position: "before" },
            // react, next 관련 모듈을 external 그룹보다 위로 올립니다.
            {
              pattern: "{react,react-dom/**,react-router-dom}",
              group: "external",
              position: "before",
            },
            { pattern: "next/**", group: "external", position: "before" },
            // @/로 시작하는 내부 모듈 경로를 internal 그룹으로 지정합니다.
            { pattern: "@/**", group: "internal" },
            { pattern: "@repo/**", group: "internal" },
          ],
          //pathGroupsExcludedImportTypes: [],
          pathGroupsExcludedImportTypes: ["react", "next/**"],
          //alphabetize: { order: "asc" },
          // 알파벳 순으로 정렬하고, 대소문자를 구분하지 않습니다.
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "no-plusplus": "off",
    },
    settings: {
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          // 모노레포의 각 프로젝트(apps/*, packages/*)에 있는 tsconfig.json 파일을
          // eslint-plugin-import가 인식하도록 경로를 설정합니다.
          // 이를 통해 @/ 및 @repo/ 같은 경로 별칭(alias)을 올바르게 해석할 수 있습니다.
          project: ["apps/*/tsconfig.json", "packages/*/tsconfig.json"],
        },
      },
    },
  },
  eslintPluginPrettier,
);
